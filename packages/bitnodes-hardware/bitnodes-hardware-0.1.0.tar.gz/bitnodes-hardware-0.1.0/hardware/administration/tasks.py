#
# Copyright (c) Addy Yeow Chin Heng <ayeowch@gmail.com>
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#
import logging
import os
import platform
import pytz
import requests
import shutil
import subprocess
from celery.signals import celeryd_init
from datetime import datetime
from psutil import boot_time, disk_partitions, disk_usage, virtual_memory

from django.conf import settings
from django.contrib.sites.models import Site
from django.core import management
from django.core.cache import cache
from django.core.exceptions import ObjectDoesNotExist
from hardware.api.tasks import exchange_rate_task
from hardware.celery import app

logger = logging.getLogger(__name__)


@app.task
def bandwidth_task():
    site = Site.objects.get(id=settings.SITE_ID)
    try:
        bandwidth = site.bandwidth
    except ObjectDoesNotExist:
        return
    command = [
        '/bin/bash', os.path.join(settings.BASE_DIR, 'bandwidth_control.sh'),
        '-i', settings.NETWORK_INTERFACE,
        '-p', str(settings.BITCOIN_PORT),
        '-u', str(bandwidth.max_uplink),
    ]
    logger.debug('command: %s', command)
    if not settings.DEBUG:
        subprocess.call(command)


@app.task
def start_stop_bitcoind_task(command):
    if not settings.DEBUG:
        program = '{}-bitcoind'.format(settings.SUPERVISOR['NAME'])
        logger.debug('supervisor %s %s', command, program)
        management.call_command('supervisor', command, program)


@app.task
def shutdown_task(method):
    # Stop bitcoind gracefully to avoid SIGKILL from shutdown command
    start_stop_bitcoind_task('stop')
    command = [
        '/usr/bin/sudo',
        '/sbin/shutdown',
        method,
        'now',
    ]
    if method == '-h':
        command.append('You may safely unplug the power cord, when only the red LED remains on.')
    logger.debug('command: %s', command)
    if not settings.DEBUG:
        subprocess.call(command)


@app.task
def system_info_task():
    """
    Enumerates and caches processor, memory and storage information.
    """
    processor = None
    system = platform.system()
    if system == 'Linux':
        with open('/proc/cpuinfo') as cpuinfo:
            for line in cpuinfo:
                line = line.strip()
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    if key in ('model name', 'Processor'):
                        processor = value.strip()
    elif system == 'Darwin':
        processor = subprocess.check_output(
            ['/usr/sbin/sysctl', '-n', 'machdep.cpu.brand_string']).strip()
    else:
        processor = platform.processor()

    # Physical devices only
    partitions = {}
    for partition in disk_partitions():
        partitions[partition.mountpoint] = disk_usage(partition.mountpoint)

    boot_datetime = datetime.utcfromtimestamp(boot_time()).replace(tzinfo=pytz.UTC)

    system_info = {
        'boot_datetime': boot_datetime,
        'processor': processor,
        'memory': virtual_memory().total,
        'storage': partitions,
    }
    logger.debug('system_info: %s', system_info)
    cache.set('system_info', system_info, 3600)


@app.task
def register_node_task(bitcoin_address):
    """
    Enrolls the node in the Bitnodes Incentive Program if it is accepting
    incoming connections: https://bitnodes.21.co/nodes/incentive/.

    Node must be activated separately by owner from:
    https://bitnodes.21.co/nodes/<ADDRESS>-<PORT>/
    """
    node_status = cache.get('node_status')
    if node_status is None:
        return
    wan_address = node_status.get('wan_address', '')
    port = node_status.get('port', '')
    connections = node_status.get('connections', '')
    if wan_address and port and connections and int(connections) > 8:
        url = 'https://bitnodes.21.co/api/v1/nodes/{}-{}/'.format(wan_address, port)
        headers = {
            'user-agent': settings.USER_AGENT,
            'accept': 'application/json',
        }
        data = {
            'bitcoin_address': bitcoin_address,
            'url': 'http://{}:{}'.format(wan_address, settings.NGINX_PUBLIC_PORT),
        }
        try:
            response = requests.post(url, headers=headers, data=data, verify=False,
                                     timeout=settings.HTTP_TIMEOUT)
        except requests.exceptions.RequestException as err:
            logger.debug(err)
        else:
            logger.debug(response.json())


@app.task
def update_bitcoind_task():
    if settings.BITCOIN_SRC is None:
        return

    tagfile = os.path.join(settings.BASE_DIR, ".current_bitcoind")
    if not os.path.isfile(tagfile):
        logger.debug('%s does not exist, skip update', tagfile)
        return
    current = open(tagfile, 'r').read().strip()
    latest = current

    url = 'https://bitnodes.21.co/api/v1/bitcoind/getversion/'
    headers = {
        'user-agent': settings.USER_AGENT,
        'accept': 'application/json',
    }
    try:
        response = requests.get(url, headers=headers, verify=False, timeout=settings.HTTP_TIMEOUT)
    except requests.exceptions.RequestException as err:
        logger.debug(err)
    else:
        if response.status_code == 200:
            latest = response.json().get('version').strip()
    logger.debug('current: %s, latest: %s', current, latest)
    if latest == current:
        return

    start_stop_bitcoind_task('stop')
    command = [
        '/bin/bash', os.path.join(settings.BASE_DIR, 'build_bitcoind.sh'),
        '-s', settings.BITCOIN_SRC,
        '-t', latest,
    ]
    logger.debug('command: %s', command)
    return_code = subprocess.call(command)
    if return_code == 0:
        new_bitcoind = os.path.join(settings.BITCOIN_SRC, 'src', 'bitcoind')
        if os.path.isfile(new_bitcoind):
            shutil.copy2(new_bitcoind, settings.BITCOIND)
            open(tagfile, 'w').write(latest)
    else:
        logger.debug('%s failed with return code %d', command, return_code)
    start_stop_bitcoind_task('start')


@celeryd_init.connect
def startup_task(sender=None, conf=None, **kwargs):
    cache.clear()
    bandwidth_task()
    system_info_task()
    exchange_rate_task()
