from gocept.net.configure.backy import configure, BackyConfig
import mock
import os
import socket
import subprocess


def test_backy_config(tmpdir, capsys, monkeypatch, directory):
    directory = directory()
    directory.list_virtual_machines.return_value = [
        {'name': 'test01',
         'parameters': {
             'backy_server': 'thishost',
             'backy_schedule': 'asdf'}},
        {'name': 'test02',
         'parameters': {
             'backy_server': 'anotherhost',
             'backy_schedule': 'asdf'}}]
    directory.deletions.return_value = {
        'node00': {'stages': []},
        'node01': {'stages': ['prepare']},
        'node02': {'stages': ['prepare', 'soft']},
        'node03': {'stages': ['prepare', 'soft', 'hard']},
        'node04': {'stages': ['prepare', 'soft', 'hard', 'purge']}}

    check_call = mock.Mock()
    monkeypatch.setattr(subprocess, 'check_call', check_call)

    os.environ['PUPPET_LOCATION'] = 'test'
    os.environ['CONSUL_ACL_TOKEN'] = 'theconsultoken'
    prefix = BackyConfig.prefix = str(tmpdir)
    BackyConfig.hostname = 'thishost'
    os.makedirs(prefix + '/etc')
    os.makedirs(prefix + '/srv/backy/node00')
    os.makedirs(prefix + '/srv/backy/node01')
    os.makedirs(prefix + '/srv/backy/node02')
    os.makedirs(prefix + '/srv/backy/node03')
    os.makedirs(prefix + '/srv/backy/node04')

    configure()

    assert check_call.call_args_list == [
        mock.call(['/etc/init.d/backy', 'restart'])]
    with open(prefix + '/etc/backy.conf') as c:
        assert c.read() == """\
# Managed by localconfig, don't edit
global: {base-dir: /srv/backy, worker-limit: 3}
jobs:
  test01:
    schedule: asdf
    source: {consul_acl_token: theconsultoken, type: flyingcircus, vm: test01}
schedules:
  default:
    daily: {interval: 1d, keep: 10}
    monthly: {interval: 30d, keep: 4}
    weekly: {interval: 7d, keep: 4}
  frequent:
    daily: {interval: 1d, keep: 10}
    hourly: {interval: 1h, keep: 25}
    monthly: {interval: 30d, keep: 4}
    weekly: {interval: 7d, keep: 4}
"""

    assert os.path.exists(prefix + '/srv/backy/node00')
    assert os.path.exists(prefix + '/srv/backy/node01')
    assert os.path.exists(prefix + '/srv/backy/node02')
    assert not os.path.exists(prefix + '/srv/backy/node03')
    assert not os.path.exists(prefix + '/srv/backy/node04')
