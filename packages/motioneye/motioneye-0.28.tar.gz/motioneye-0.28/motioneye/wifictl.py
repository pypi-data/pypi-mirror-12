
# Copyright (c) 2013 Calin Crisan
# This file is part of motionEye.
#
# motionEye is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>. 

import logging
import re
import settings

from config import additional_config, additional_section


WPA_SUPPLICANT_CONF = settings.WPA_SUPPLICANT_CONF  # @UndefinedVariable


def _get_wifi_settings():
    # will return the first configured network

    logging.debug('reading wifi settings from %s' % WPA_SUPPLICANT_CONF)
    
    try:
        conf_file = open(WPA_SUPPLICANT_CONF, 'r')
    
    except Exception as e:
        logging.error('could open wifi settings file %(path)s: %(msg)s' % {
                'path': WPA_SUPPLICANT_CONF, 'msg': unicode(e)})
        
        return {
            'wifiEnabled': False,
            'wifiNetworkName': '',
            'wifiNetworkKey': ''
        }
    
    lines = conf_file.readlines()
    conf_file.close()
    
    ssid = psk = ''
    in_section = False
    for line in lines:
        line = line.strip()
        if line.startswith('#'):
            continue
        
        if '{' in line:
            in_section = True
            
        elif '}' in line:
            in_section = False
            break
            
        elif in_section:
            m = re.search('ssid\s*=\s*"(.*?)"', line)
            if m:
                ssid = m.group(1)
    
            m = re.search('psk\s*=\s*"(.*?)"', line)
            if m:
                psk = m.group(1)

    if ssid:
        logging.debug('wifi is enabled (ssid = "%s")' % ssid)
    
        return {
            'wifiEnabled': True,
            'wifiNetworkName': ssid,
            'wifiNetworkKey': psk
        }

    else:
        logging.debug('wifi is disabled')

        return {
            'wifiEnabled': False,
            'wifiNetworkName': ssid,
            'wifiNetworkKey': psk
        }


def _set_wifi_settings(s):
    s.setdefault('wifiEnabled', False)
    s.setdefault('wifiNetworkName', '')
    s.setdefault('wifiNetworkKey', '')
    
    logging.debug('writing wifi settings to %s: enabled=%s, ssid="%s"' % (
            WPA_SUPPLICANT_CONF, s['wifiEnabled'], s['wifiNetworkName']))

    enabled = s['wifiEnabled']
    ssid = s['wifiNetworkName']
    psk = s['wifiNetworkKey']
    
    # will update the first configured network
    try:
        conf_file = open(WPA_SUPPLICANT_CONF, 'r')
    
    except Exception as e:
        logging.error('could open wifi settings file %(path)s: %(msg)s' % {
                'path': WPA_SUPPLICANT_CONF, 'msg': unicode(e)})

        return
    
    lines = conf_file.readlines()
    conf_file.close()
    
    in_section = False
    found_ssid = False
    found_psk = False
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith('#'):
            i += 1
            continue
        
        if '{' in line:
            in_section = True
            
        elif '}' in line:
            in_section = False
            if enabled and ssid and not found_ssid:
                lines.insert(i, '    ssid="' + ssid + '"\n')
            if enabled and psk and not found_psk:
                lines.insert(i, '    psk="' + psk + '"\n')
            
            found_psk = found_ssid = True
            
            break
            
        elif in_section:
            if enabled:
                if re.match('ssid\s*=\s*".*?"', line):
                    lines[i] = '    ssid="' + ssid + '"\n'
                    found_ssid = True
                
                elif re.match('psk\s*=\s*".*?"', line):
                    if psk:
                        lines[i] = '    psk="' + psk + '"\n'
                        found_psk = True
                
                    else:
                        lines.pop(i)
                        i -= 1
        
            else: # wifi disabled
                if re.match('ssid\s*=\s*".*?"', line) or re.match('psk\s*=\s*".*?"', line):
                    lines.pop(i)
                    i -= 1
        
        i += 1

    if enabled and not found_ssid:
        lines.append('network={\n')
        lines.append('    scan_ssid=1\n')
        lines.append('    ssid="' + ssid + '"\n')
        lines.append('    psk="' + psk + '"\n')
        lines.append('}\n\n')

    try:
        conf_file = open(WPA_SUPPLICANT_CONF, 'w')
    
    except Exception as e:
        logging.error('could open wifi settings file %(path)s: %(msg)s' % {
                'path': WPA_SUPPLICANT_CONF, 'msg': unicode(e)})

        return
    
    for line in lines:
        conf_file.write(line)

    conf_file.close()


@additional_section
def network():
    return {
        'label': 'Network',
        'description': 'configure the network connection',
        'advanced': True
    }


@additional_config
def wifiEnabled():
    if not WPA_SUPPLICANT_CONF:
        return

    return {
        'label': 'Wireless Network',
        'description': 'enable this if you want to connect to a wireless network',
        'type': 'bool',
        'section': 'network',
        'advanced': True,
        'reboot': True,
        'get': _get_wifi_settings,
        'set': _set_wifi_settings,
        'get_set_dict': True
    }


@additional_config
def wifiNetworkName():
    if not WPA_SUPPLICANT_CONF:
        return

    return {
        'label': 'Wireless Network Name',
        'description': 'the name (SSID) of your wireless network',
        'type': 'str',
        'section': 'network',
        'advanced': True,
        'required': True,
        'reboot': True,
        'depends': ['wifiEnabled'],
        'get': _get_wifi_settings,
        'set': _set_wifi_settings,
        'get_set_dict': True
    }


@additional_config
def wifiNetworkKey():
    if not WPA_SUPPLICANT_CONF:
        return

    return {
        'label': 'Wireless Network Key',
        'description': 'the key (PSK) required to connect to your wireless network',
        'type': 'pwd',
        'section': 'network',
        'advanced': True,
        'required': False,
        'reboot': True,
        'depends': ['wifiEnabled'],
        'get': _get_wifi_settings,
        'set': _set_wifi_settings,
        'get_set_dict': True
    }
