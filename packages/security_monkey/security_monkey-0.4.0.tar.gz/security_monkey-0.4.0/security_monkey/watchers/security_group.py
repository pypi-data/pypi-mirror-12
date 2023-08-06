#     Copyright 2014 Netflix, Inc.
#
#     Licensed under the Apache License, Version 2.0 (the "License");
#     you may not use this file except in compliance with the License.
#     You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#     Unless required by applicable law or agreed to in writing, software
#     distributed under the License is distributed on an "AS IS" BASIS,
#     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#     See the License for the specific language governing permissions and
#     limitations under the License.
"""
.. module: security_monkey.watchers.security_group
    :platform: Unix

.. version:: $$VERSION$$
.. moduleauthor:: Patrick Kelley <pkelley@netflix.com> @monkeysecurity

"""

from security_monkey.watcher import Watcher
from security_monkey.watcher import ChangeItem
from security_monkey.constants import TROUBLE_REGIONS
from security_monkey.exceptions import BotoConnectionIssue
from security_monkey import app


class SecurityGroup(Watcher):
    index = 'securitygroup'
    i_am_singular = 'Security Group'
    i_am_plural = 'Security Groups'

    def __init__(self, accounts=None, debug=False):
        super(SecurityGroup, self).__init__(accounts=accounts, debug=debug)
        # TODO: grab those from DB
        self.instance_detail = app.config.get("SECURITYGROUP_INSTANCE_DETAIL", 'FULL')
        self.honor_ephemerals = True
        self.ephemeral_paths = ["assigned_to"]

    def get_detail_level(self):
        """ Return details level: 'NONE' / 'SUMMARY' / 'FULL' """
        if self.instance_detail:
            return self.instance_detail
        else:
            return 'NONE'

    def slurp(self):
        """
        :returns: item_list - list of Security Groups.
        :returns: exception_map - A dict where the keys are a tuple containing the
            location of the exception and the value is the actual exception

        """
        self.prep_for_slurp()

        item_list = []
        exception_map = {}
        from security_monkey.common.sts_connect import connect
        for account in self.accounts:
            try:
                ec2 = connect(account, 'ec2')
                regions = ec2.get_all_regions()
            except Exception as e:  # EC2ResponseError
                # Some Accounts don't subscribe to EC2 and will throw an exception here.
                exc = BotoConnectionIssue(str(e), self.index, account, None)
                self.slurp_exception((self.index, account), exc, exception_map)
                continue

            for region in regions:
                app.logger.debug("Checking {}/{}/{}".format(self.index, account, region.name))

                try:
                    rec2 = connect(account, 'ec2', region=region)
                    # Retrieve security groups here
                    sgs = self.wrap_aws_rate_limited_call(
                        rec2.get_all_security_groups
                    )

                    if self.get_detail_level() != 'NONE':
                        # We fetch tags here to later correlate instances
                        tags = self.wrap_aws_rate_limited_call(
                            rec2.get_all_tags
                        )
                        # Retrieve all instances
                        instances = self.wrap_aws_rate_limited_call(
                            rec2.get_only_instances
                        )
                        app.logger.info("Number of instances found in region {}: {}".format(region.name, len(instances)))
                except Exception as e:
                    if region.name not in TROUBLE_REGIONS:
                        exc = BotoConnectionIssue(str(e), self.index, account, region.name)
                        self.slurp_exception((self.index, account, region.name), exc, exception_map)
                    continue

                app.logger.debug("Found {} {}".format(len(sgs), self.i_am_plural))

                if self.get_detail_level() != 'NONE':
                    app.logger.info("Creating mapping of sg_id's to instances")
                    # map sgid => instance
                    sg_instances = {}
                    for instance in instances:
                        for group in instance.groups:
                            if group.id not in sg_instances:
                                sg_instances[group.id] = [instance]
                            else:
                                sg_instances[group.id].append(instance)

                    app.logger.info("Creating mapping of instance_id's to tags")
                    # map instanceid => tags
                    instance_tags = {}
                    for tag in tags:
                        if tag.res_id not in instance_tags:
                            instance_tags[tag.res_id] = [tag]
                        else:
                            instance_tags[tag.res_id].append(tag)
                    app.logger.info("Done creating mappings")


                for sg in sgs:

                    if self.check_ignore_list(sg.name):
                        continue

                    item_config = {
                        "id": sg.id,
                        "name": sg.name,
                        "description": sg.description,
                        "vpc_id": sg.vpc_id,
                        "owner_id": sg.owner_id,
                        "region": sg.region.name,
                        "rules": [],
                        "assigned_to": None
                    }

                    for rule in sg.rules:
                        for grant in rule.grants:
                            rule_config = {
                                "ip_protocol": rule.ip_protocol,
                                "rule_type": "ingress",
                                "from_port": rule.from_port,
                                "to_port": rule.to_port,
                                "cidr_ip": grant.cidr_ip,
                                "group_id": grant.group_id,
                                "name": grant.name,
                                "owner_id": grant.owner_id
                            }
                            item_config['rules'].append(rule_config)

                    for rule in sg.rules_egress:
                        for grant in rule.grants:
                            rule_config = {
                                "ip_protocol": rule.ip_protocol,
                                "rule_type": "egress",
                                "from_port": rule.from_port,
                                "to_port": rule.to_port,
                                "cidr_ip": grant.cidr_ip,
                                "group_id": grant.group_id,
                                "name": grant.name,
                                "owner_id": grant.owner_id
                            }
                            item_config['rules'].append(rule_config)
                    item_config['rules'] = sorted(item_config['rules'])

                    if self.get_detail_level() == 'SUMMARY':
                        if sg.id in sg_instances:
                            item_config["assigned_to"] = "{} instances".format(len(sg_instances[sg.id]))
                        else:
                            item_config["assigned_to"] = "0 instances"

                    elif self.get_detail_level() == 'FULL':
                        assigned_to = []
                        if sg.id in sg_instances:
                            for instance in sg_instances[sg.id]:
                                if instance.id in instance_tags:
                                    tagdict = {tag.name: tag.value for tag in instance_tags[instance.id]}
                                    tagdict["instance_id"] = instance.id
                                else:
                                    tagdict = {"instance_id": instance.id}
                                assigned_to.append(tagdict)
                        item_config["assigned_to"] = assigned_to

                    # Issue 40: Security Groups can have a name collision between EC2 and
                    # VPC or between different VPCs within a given region.
                    if sg.vpc_id:
                        sg_name = "{0} ({1} in {2})".format(sg.name, sg.id, sg.vpc_id)
                    else:
                        sg_name = "{0} ({1})".format(sg.name, sg.id)

                    item = SecurityGroupItem(region=region.name, account=account, name=sg_name, config=item_config)
                    item_list.append(item)

        return item_list, exception_map


class SecurityGroupItem(ChangeItem):
    def __init__(self, region=None, account=None, name=None, config={}):
        super(SecurityGroupItem, self).__init__(
            index=SecurityGroup.index,
            region=region,
            account=account,
            name=name,
            new_config=config)
