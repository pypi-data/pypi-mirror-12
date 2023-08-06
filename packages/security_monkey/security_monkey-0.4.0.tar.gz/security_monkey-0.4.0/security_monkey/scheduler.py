"""
.. module: security_monkey.scheduler
    :platform: Unix
    :synopsis: Runs watchers, auditors, or reports on demand or on a schedule

.. version:: $$VERSION$$
.. moduleauthor:: Patrick Kelley <pkelley@netflix.com> @monkeysecurity

"""

from apscheduler.threadpool import ThreadPool
from apscheduler.scheduler import Scheduler

from security_monkey.datastore import Account
from security_monkey.monitors import all_monitors, get_monitor
from security_monkey.reporter import Reporter

from security_monkey import app, db, handler, jirasync

import traceback
import logging
from datetime import datetime, timedelta


def __prep_accounts__(accounts):
    if accounts == 'all':
        accounts = Account.query.filter(Account.third_party==False).filter(Account.active==True).all()
        accounts = [account.name for account in accounts]
        return accounts
    else:
        return accounts.split(',')


def __prep_monitor_names__(monitor_names):
    if monitor_names == 'all':
        return [monitor.index for monitor in all_monitors()]
    else:
        return monitor_names.split(',')


def run_change_reporter(accounts, interval=None):
    """ Runs Reporter """
    accounts = __prep_accounts__(accounts)
    reporter = Reporter(accounts=accounts, alert_accounts=accounts, debug=True)
    for account in accounts:
        reporter.run(account, interval)


def find_changes(accounts, monitor_names, debug=True):
    monitor_names = __prep_monitor_names__(monitor_names)
    for monitor_name in monitor_names:
        monitor = get_monitor(monitor_name)
        _find_changes(accounts, monitor, debug)


def audit_changes(accounts, monitor_names, send_report, debug=True):
    monitor_names = __prep_monitor_names__(monitor_names)
    accounts = __prep_accounts__(accounts)
    auditors = []
    for monitor_name in monitor_names:
        monitor = get_monitor(monitor_name)
        if monitor.has_auditor():
            auditors.append(monitor.auditor_class(accounts=accounts, debug=True))
    if auditors:
        _audit_changes(accounts, auditors, send_report, debug)


def _find_changes(accounts, monitor, debug=True):
    """ Runs a watcher and auditor on changed items """
    accounts = __prep_accounts__(accounts)
    cw = monitor.watcher_class(accounts=accounts, debug=True)
    (items, exception_map) = cw.slurp()
    cw.find_changes(current=items, exception_map=exception_map)

    # Audit these changed items
    if monitor.has_auditor():
        items_to_audit = [item for item in cw.created_items + cw.changed_items]

        au = monitor.auditor_class(accounts=accounts, debug=True)
        au.audit_these_objects(items_to_audit)
        au.save_issues()

    cw.save()
    db.session.close()


def _audit_changes(accounts, auditors, send_report, debug=True):
    """ Runs auditors on all items """
    for au in auditors:
        au.audit_all_objects()
        au.save_issues()
        if send_report:
            report = au.create_report()
            au.email_report(report)

        if jirasync:
            app.logger.info('Syncing {} issues on {} with Jira'.format(au.index, accounts))
            jirasync.sync_issues(accounts, au.index)


pool = ThreadPool(
    core_threads=app.config.get('CORE_THREADS', 25),
    max_threads=app.config.get('MAX_THREADS', 30),
    keepalive=0
)
scheduler = Scheduler(
    standalone=True,
    threadpool=pool,
    coalesce=True,
    misfire_grace_time=30
)


def setup_scheduler():
    """Sets up the APScheduler"""
    log = logging.getLogger('apscheduler')
    log.setLevel(app.config.get('LOG_LEVEL'))
    log.addHandler(handler)

    try:
        accounts = Account.query.filter(Account.third_party==False).filter(Account.active==True).all()
        accounts = [account.name for account in accounts]
        for account in accounts:
            print "Scheduler adding account {}".format(account)
            rep = Reporter(accounts=[account])
            for period in rep.get_intervals(account):
                scheduler.add_interval_job(
                    run_change_reporter,
                    minutes=period,
                    start_date=datetime.now()+timedelta(seconds=2),
                    args=[account, period]
                )
            auditors = [a for (_, a) in rep.get_watchauditors(account) if a]
            if auditors:
                scheduler.add_cron_job(_audit_changes, hour=10, day_of_week="mon-fri", args=[account, auditors, True])

    except Exception as e:
        app.logger.warn("Scheduler Exception: {}".format(e))
        app.logger.warn(traceback.format_exc())
