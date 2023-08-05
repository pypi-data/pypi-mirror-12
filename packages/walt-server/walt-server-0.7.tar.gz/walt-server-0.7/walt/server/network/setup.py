#!/usr/bin/env python
# coding=utf-8
import time, snimpy, sys
from walt.server import snmp, status, network
from walt.server.network.tools import lldp_update
from waltvlanconf import configure_main_switch_if_needed
from walt.common.tools import do

MSG_WAITING_COMPANION_SERVICES = 'Waiting for companion services to be ready...'
MSG_DETECTING_MAIN_SWITCH = 'Detecting the main switch...'
MSG_AUTO_CONFIGURING_MAIN_SWITCH = 'Auto-configuring the main switch...'
MSG_ERROR_RESET_THE_SWITCH_REBOOT = '''\
Could not communicate with the main switch. Try to reset it to factory settings.
The server will reboot and retry this bootup procedure in a few seconds.
'''

EXPLAIN_NETWORK=u'''\
The following network setup is required:

┌───────────────┐
│main switch    │   port 1: internet access
│1 2 3 4 5 6 7 8│   port 2: (this) walt server
└┼─┼─┼─┼─┼─┼─┼─┼┘   ports 3 and more: walt network (walt nodes, cascaded switches)
 │ │
 │ └ walt server
 └ internet

If this is not the case already, please connect the main switch as described in order to continue.
Note that it may take a few minutes to detect the main switch even if it is connected.
'''

def main_switch_conf_callback(local_ip, switch_ip, ui):
    ui.task_running()
    configured = configure_main_switch_if_needed(
                        snmp.Proxy(str(switch_ip), vlan=True))
    return configured

def setup_needed(ui):
    # check if an ip was already assigned, which 
    # shows that setup was already done
    ui.task_start(MSG_WAITING_COMPANION_SERVICES)
    server_ip = str(network.tools.get_server_ip())
    res = None
    while True:
        try:
            snmp_local = snmp.Proxy('localhost', lldp=True)
            if server_ip in snmp_local.lldp.get_local_ips():
                res = False    # setup already done
            else:
                res = True     # setup needed
        except snimpy.snmp.SNMPNoSuchObject:
            ui.task_running()
            time.sleep(1)
        else:
            break
    ui.task_done()
    return res

def setup(ui):
    ui.task_start(MSG_DETECTING_MAIN_SWITCH, explain=EXPLAIN_NETWORK)
    # retrieve info about the main switch by
    # using the local lldp & snmp daemons
    snmp_local = snmp.Proxy('localhost', lldp=True)
    while len(snmp_local.lldp.get_neighbors()) == 0:
        ui.task_running()
        lldp_update()
        time.sleep(1)
    ui.task_done()
    main_switch_info = snmp_local.lldp.get_neighbors().values()[0]
    print 'main switch:', main_switch_info
    # assign a temporary ip in order to communicate
    # with the main switch, and, if not done yet, set up
    # its vlan configuration
    ui.task_start(MSG_AUTO_CONFIGURING_MAIN_SWITCH)
    ui.task_running()
    switch_ip = network.tools.ip(main_switch_info['ip'])
    reached, configured = network.tools.assign_temp_ip_to_reach_neighbor(
                                switch_ip,
                                main_switch_conf_callback,
                                ui)
    if reached:
        ui.task_done()
    else:
        ui.task_failed(MSG_ERROR_RESET_THE_SWITCH_REBOOT)
        time.sleep(10)
        do('reboot')
        time.sleep(10)
        sys.exit()
    # set up the server ip on eth0 (walt testbed network)
    # start the dhcp client on eth0.169 only (walt-out vlan)
    network.tools.set_server_ip()
    network.tools.dhcp_start(['eth0.169'])
    return True     # ok

