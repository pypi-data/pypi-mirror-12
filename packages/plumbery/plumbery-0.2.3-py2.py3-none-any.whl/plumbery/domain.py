# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import logging
import time
from uuid import uuid4

try:
    from lxml import etree as ET
except ImportError:
    from xml.etree import ElementTree as ET

from libcloud.common.dimensiondata import DimensionDataFirewallRule
from libcloud.common.dimensiondata import DimensionDataFirewallAddress
from libcloud.common.dimensiondata import DimensionDataNatRule
from libcloud.utils.xml import fixxpath, findtext, findall
from libcloud.common.dimensiondata import TYPES_URN

from exceptions import PlumberyException

__all__ = ['PlumberyDomain']


class PlumberyDomain:
    """
    Cloud automation for a network domain

    :param facility: the underlying physical facility
    :type facility: :class:`plumbery.PlumberFacility`

    A network domain is similar to a virtual data center. It is a secured
    container for multiple nodes.

    Example::

        from plumbery.domain import PlumberyDomain
        domain = PlumberyDomain(facility)
        domain.build(blueprint)

    In this example a domain is initialised at the given facility, and then
    it is asked to create the pipes and the plumbery mentioned in the
    provided blueprint. This is covering solely the network and the security,
    not the nodes themselves.

    Attributes:
        facility (PlumberyFacility):
            a handle to the physical facility where network domains
            are implemented

    """

    # the physical data center
    facility = None

    def __init__(self, facility=None):
        """Put network domains in context"""

        # handle to parent parameters and functions
        self.facility = facility
        self.region = facility.region
        self.plumbery = facility.plumbery
        self.network = None
        self.domain = None

        self._cache_network_domains = []
        self._cache_vlans = []
        self._cache_firewall_rules = []

        self._network_domains_already_built =[]
        self._vlans_already_built =[]

    def build(self, blueprint):
        """
        Creates a network domain if needed.

        :param blueprint: the various attributes of the target fittings
        :type blueprint: ``dict``

        :returns: ``bool``
            - True if the network has been created or is already there,
            False otherwise
        :raises: :class:`plumbery.PlumberyException` if some unrecoverable error occurs

        This function is looking at all fittings in the blueprint except the
        nodes. This is including:

        * the network domain itself
        * one or multiple Ethernet networks

        In safe mode, the function will stop on any missing component since
        it is not in a position to add fittings, and return ``False``.
        If all components already exist then the funciton will return ``True``.

        """

        if 'domain' not in blueprint or type(blueprint['domain']) is not dict:
            raise PlumberyException(
                "Error: no network domain has been defined " \
                     "for the blueprint '{}'!".format(blueprint['target']))

        domainName = blueprint['domain']['name']

        if 'ethernet' not in blueprint or type(blueprint['ethernet']) is not dict:
            raise PlumberyException(
                "Error: no ethernet network has been defined " \
                        "for the blueprint '{}'!".format(blueprint['target']))

        if 'subnet' not in blueprint['ethernet']:
            raise PlumberyException("Error: no IPv4 subnet " \
                "(e.g., '10.0.34.0') as been defined for the blueprint '{}'!"
                                                .format(blueprint['target']))

        networkName = blueprint['ethernet']['name']

        if len(self._cache_network_domains) < 1:
            logging.info("Fetching the list of existing network domains")
            self._cache_network_domains = self.region.ex_list_network_domains(
                                        location=self.facility.location)
            logging.info("- {} network domains".format(len(self._cache_network_domains)))

        self.domain = None
        for self.domain in self._cache_network_domains:
            if self.domain.name == domainName:
                if not domainName in self._network_domains_already_built:
                    logging.info("Network domain '{}' already exists"
                                                        .format(domainName))
                self._network_domains_already_built.append(domainName)
                break

        if self.domain is None or self.domain.name != domainName:

            if self.plumbery.safeMode:
                logging.info("Would have created network domain '{}' " \
                                    "if not in safe mode".format(domainName))
                logging.info("Would have created Ethernet network '{}' " \
                                    "if not in safe mode".format(networkName))
                self._build_accept(blueprint, None, None)
                return False

            else:
                logging.info("Creating network domain '{}'".format(domainName))

                # the description attribute is a smart way to tag resources
                description = '#plumbery'
                if 'description' in blueprint['domain']:
                    description = blueprint['domain']['description']+' #plumbery'

                # level of service
                service = 'ESSENTIALS'
                if 'service' in blueprint['domain']:
                    service = blueprint['domain']['service']

                while True:
                    try:
                        self.domain = self.region.ex_create_network_domain(
                            location=self.facility.location,
                            name=domainName,
                            service_plan=service,
                            description=description)
                        logging.info("- in progress")

                        self._cache_network_domains.append(self.domain)

                    except Exception as feedback:

                        if 'RESOURCE_BUSY' in str(feedback):
                            time.sleep(10)
                            continue

                        elif 'OPERATION_NOT_SUPPORTED' in str(feedback):
                            logging.info("- operation not supported")
                            return False

                        elif 'RESOURCE_LOCKED' in str(feedback):
                            logging.info("- not now - locked")
                            return False

                        else:
                            raise PlumberyException(
                            "Error: unable to create network domain '{0}' {1}!"
                                            .format(domainName, feedback))

                    break

        if len(self._cache_vlans) < 1:
            logging.info("Fetching the list of existing Ethernet networks")
            self._cache_vlans = self.region.ex_list_vlans(
                                        location=self.facility.location)
            logging.info("- {} Ethernet networks".format(len(self._cache_vlans)))

        self.network = None
        for self.network in self._cache_vlans:
            if self.network.name == networkName:
                if not networkName in self._vlans_already_built:
                    logging.info("Ethernet network '{}' already exists"
                                                        .format(networkName))
                self._vlans_already_built.append(networkName)
                break

        if self.network is None or self.network.name != networkName:

            if self.plumbery.safeMode:
                logging.info("Would have created Ethernet network '{}' " \
                                    "if not in safe mode".format(networkName))
                self._build_accept(blueprint, self.domain, None)
                return False

            else:
                logging.info("Creating Ethernet network '{}'"
                                                        .format(networkName))

                # the description attribute is a smart way to tag resources
                description = '#plumbery'
                if 'description' in blueprint['ethernet']:
                    description = blueprint['ethernet']['description']+' #plumbery'

                while True:
                    try:
                        self.network = self.region.ex_create_vlan(
                            network_domain=self.domain,
                            name=networkName,
                            private_ipv4_base_address=blueprint['ethernet']['subnet'],
                            description=description)
                        logging.info("- in progress")

                        self._cache_vlans.append(self.network)

                    except Exception as feedback:

                        if 'RESOURCE_BUSY' in str(feedback):
                            time.sleep(10)
                            continue

                        elif 'NAME_NOT_UNIQUE' in str(feedback):
                            logging.info("- network already exists")

                        elif 'RESOURCE_LOCKED' in str(feedback):
                            logging.info("- not now - locked")
                            return False

                        else:
                            raise PlumberyException("Error: unable to create " \
                                            "Ethernet network '{0}' {1}!"
                                                .format(networkName, feedback))

                    break

        if not self._build_accept(blueprint, self.domain, self.network):
            return False

        return True

    def _build_accept(self, blueprint, domain, network):
        """
        Changes firewall settings to accept incoming traffic

        Example in the fittings plan::

          - web:
              domain: *vdc1
              ethernet: &prod
                name: gigafox.production
                subnet: 10.1.2.0
                accept:
                  - gigafox.control
                  - dd-eu::EU6::other.network.there
                description: '#eu'

        In this example, the firewall is configured to that any ip traffic
        from the Ethernet network ``gigafox.control`` can reach the Ethernet
        network ``gigafox.production``. By default, one rule is created for
        IPv4 and another rule is created for IPv6.

        """

        if 'accept' not in blueprint['ethernet']:
            return True

        if network is None:
            return True

        destination = self.get_ethernet(network.name)
        if not destination:
            return True

        destinationIPv4 = DimensionDataFirewallAddress(
                    any_ip=False,
                    ip_address=destination.private_ipv4_range_address,
                    ip_prefix_size=destination.private_ipv4_range_size,
                    port_begin=None,
                    port_end=None)

        destinationIPv6 = DimensionDataFirewallAddress(
                    any_ip=False,
                    ip_address=destination.ipv6_range_address,
                    ip_prefix_size=destination.ipv6_range_size,
                    port_begin=None,
                    port_end=None)

        for item in blueprint['ethernet']['accept']:

            if isinstance(item, dict):
                label = item.keys()[0]
                parameters = item[label]
            else:
                label = str(item)
                parameters = {}

            source = self.get_ethernet(label.split('::'))
            if not source:
                logging.info("Source network '{}' is unknown".format(label))
                continue

            ruleIPv4Name = self.get_firewall_rule_name(
                                        source.name, destination.name, 'IP')

            shouldCreateRuleIPv4 = True
            if source.location.name != destination.location.name:
                shouldCreateRuleIPv4 = False
            elif source.network_domain.name != destination.network_domain.name:
                shouldCreateRuleIPv4 = False

            ruleIPv6Name = self.get_firewall_rule_name(
                                        source.name, destination.name, 'IPv6')

            shouldCreateRuleIPv6 = True

            if len(self._cache_firewall_rules) < 1:
                self._cache_firewall_rules = self.region.ex_list_firewall_rules(
                                            domain)

            for rule in self._cache_firewall_rules:

                if shouldCreateRuleIPv4 and rule.name == ruleIPv4Name:
                    logging.info("Firewall rule '{}' already exists"
                                                            .format(rule.name))
                    shouldCreateRuleIPv4 = False
                    continue

                if shouldCreateRuleIPv6 and rule.name == ruleIPv6Name:
                    logging.info("Firewall rule '{}' already exists"
                                                            .format(rule.name))
                    shouldCreateRuleIPv6 = False
                    continue

            if shouldCreateRuleIPv4:

                logging.info("Creating firewall rule '{}'"
                                                   .format(ruleIPv4Name))

                sourceIPv4 = DimensionDataFirewallAddress(
                                any_ip=False,
                                ip_address=source.private_ipv4_range_address,
                                ip_prefix_size=source.private_ipv4_range_size,
                                port_begin=None,
                                port_end=None)

                ruleIPv4 = DimensionDataFirewallRule(
                                id=uuid4(),
                                action= 'ACCEPT_DECISIVELY',
                                name=ruleIPv4Name,
                                location=destination.location,
                                network_domain=destination.network_domain,
                                status='NORMAL',
                                ip_version='IPV4',
                                protocol='IP',
                                enabled='true',
                                source=sourceIPv4,
                                destination=destinationIPv4)

                self._ex_create_firewall_rule(
                                network_domain=destination.network_domain,
                                rule=ruleIPv4,
                                position='LAST')

                logging.info("- in progress")

            if shouldCreateRuleIPv6:

                logging.info("Creating firewall rule '{}'"
                                                   .format(ruleIPv6Name))

                sourceIPv6 = DimensionDataFirewallAddress(
                                any_ip=False,
                                ip_address=source.ipv6_range_address,
                                ip_prefix_size=source.ipv6_range_size,
                                port_begin=None,
                                port_end=None)

                ruleIPv6 = DimensionDataFirewallRule(
                                id=uuid4(),
                                action= 'ACCEPT_DECISIVELY',
                                name=ruleIPv6Name,
                                location=destination.location,
                                network_domain=destination.network_domain,
                                status='NORMAL',
                                ip_version='IPV6',
                                protocol='IP',
                                enabled='true',
                                source=sourceIPv6,
                                destination=destinationIPv6)

                self._ex_create_firewall_rule(
                                network_domain=destination.network_domain,
                                rule=ruleIPv6,
                                position='LAST')

                logging.info("- in progress")

        return True

    def _ex_create_firewall_rule(self, network_domain, rule, position):
        create_node = ET.Element('createFirewallRule', {'xmlns': TYPES_URN})
        ET.SubElement(create_node, "networkDomainId").text = network_domain.id
        ET.SubElement(create_node, "name").text = rule.name
        ET.SubElement(create_node, "action").text = rule.action
        ET.SubElement(create_node, "ipVersion").text = rule.ip_version
        ET.SubElement(create_node, "protocol").text = rule.protocol
        # Setup source port rule
        source = ET.SubElement(create_node, "source")
        source_ip = ET.SubElement(source, 'ip')
        if rule.source.any_ip:
            source_ip.set('address', 'ANY')
        else:
            source_ip.set('address', rule.source.ip_address)
            source_ip.set('prefixSize', rule.source.ip_prefix_size)
            if rule.source.port_begin is not None:
                source_port = ET.SubElement(source, 'port')
                source_port.set('begin', rule.source.port_begin)
            if rule.source.port_end is not None:
                source_port.set('end', rule.source.port_end)
        # Setup destination port rule
        dest = ET.SubElement(create_node, "destination")
        dest_ip = ET.SubElement(dest, 'ip')
        if rule.destination.any_ip:
            dest_ip.set('address', 'ANY')
        else:
            dest_ip.set('address', rule.destination.ip_address)
            dest_ip.set('prefixSize', rule.destination.ip_prefix_size)
            if rule.destination.port_begin is not None:
                dest_port = ET.SubElement(dest, 'port')
                dest_port.set('begin', rule.destination.port_begin)
            if rule.destination.port_end is not None:
                dest_port.set('end', rule.destination.port_end)
        ET.SubElement(create_node, "enabled").text = 'true'
        placement = ET.SubElement(create_node, "placement")
        placement.set('position', position)

        response = self.region.connection.request_with_orgId_api_2(
            'network/createFirewallRule',
            method='POST',
            data=ET.tostring(create_node)).object

        rule_id = None
        for info in findall(response, 'info', TYPES_URN):
            if info.get('name') == 'firewallRuleId':
                rule_id = info.get('value')
        rule.id = rule_id
        return rule

    def _destroy_accept(self, blueprint, domain, network):
        """
        Destroys firewall rules

        """

        if 'accept' not in blueprint['ethernet']:
            return True

        if network is None:
            return True

        destination = self.get_ethernet(network.name)
        if not destination:
            return True

        for item in blueprint['ethernet']['accept']:

            if isinstance(item, dict):
                label = item.keys()[0]
                parameters = item[label]
            else:
                label = str(item)
                parameters = {}

            source = self.get_ethernet(label.split('::'))
            if not source:
                logging.info("Source network '{}' is unknown".format(label))
                continue

            ruleIPv4Name = self.get_firewall_rule_name(
                                        source.name, destination.name, 'IP')

            ruleIPv6Name = self.get_firewall_rule_name(
                                        source.name, destination.name, 'IPv6')

            if len(self._cache_firewall_rules) < 1:
                self._cache_firewall_rules = self.region.ex_list_firewall_rules(
                                            domain)

            for rule in self._cache_firewall_rules:

                if rule.name == ruleIPv4Name or rule.name == ruleIPv6Name:
                    logging.info("Destroying firewall rule '{}'"
                                                            .format(rule.name))
                    self.region._ex_delete_firewall_rule(rule)

                    logging.info("- in progress")

        return True

    def destroy_blueprint(self, blueprint):
        """
        Destroys a domain attached to a blueprint

        :param blueprint: the various attributes of the target fittings
        :type blueprint: ``dict``

        :returns: ``bool``

        :raises: :class:`.PlumberyException`

        """

        if 'domain' not in blueprint or type(blueprint['domain']) is not dict:
            raise PlumberyException(
                "Error: no network domain has been defined " \
                     "for the blueprint '{}'!".format(blueprint['target']))

        if len(self._cache_network_domains) < 1:
            self._cache_network_domains = self.region.ex_list_network_domains(
                                        location=self.facility.location)

        domainName = blueprint['domain']['name']
        domain = None
        for domain in self._cache_network_domains:
            if domain.name == domainName:
                break

        if domain is None or domain.name != domainName:
            logging.info("Destroying network domain '{}'".format(domainName))
            logging.info("- not found")
            return False

        if 'ethernet' not in blueprint or type(blueprint['ethernet']) is not dict:
            raise PlumberyException(
                "Error: no ethernet network has been defined " \
                        "for the blueprint '{}'!".format(blueprint['target']))

        if len(self._cache_vlans) < 1:
            self._cache_vlans = self.region.ex_list_vlans(
                                        location=self.facility.location)

        networkName = blueprint['ethernet']['name']
        network = None
        for network in self._cache_vlans:
            if network.name == networkName:
                break

        if network is not None and network.name == networkName:

            if self.plumbery.safeMode:
                logging.info("Would have destroyed Ethernet network '{}' "
                                "if not in safe mode".format(networkName))
                logging.info("Would have destroyed network domain '{}' "
                                "if not in safe mode".format(domainName))
                return False

            logging.info("Destroying Ethernet network '{}'".format(networkName))

            count = 5
            while count > 0:
                try:
                    self.region.ex_delete_vlan(vlan=network)
                    logging.info("- in progress")

                except Exception as feedback:

                    if 'RESOURCE_BUSY' in str(feedback):
                        time.sleep(10)
                        continue

                    elif 'RESOURCE_NOT_FOUND' in str(feedback):
                        logging.info("- not found")

                    elif 'HAS_DEPENDENCY' in str(feedback):
                        count -= 1
                        if count > 0:
                            time.sleep(20)
                            continue
                        logging.info("- not now - stuff on it")
                        return False

                    elif 'RESOURCE_LOCKED' in str(feedback):
                        logging.info("- not now - locked")
                        logging.info(feedback)
                        return False

                    else:
                        raise PlumberyException("Error: unable to destroy " \
                                    "Ethernet network '{0}' {1}!"
                                            .format(networkName, feedback))

                break

        else:
            logging.info("Destroying Ethernet network '{}'".format(networkName))
            logging.info("- not found")

        if self.plumbery.safeMode:
            logging.info("Would have destroyed network domain '{}' "
                            "if not in safe mode".format(domainName))
            return False

        logging.info("Destroying network domain '{}'".format(domainName))

        self._destroy_accept(blueprint, domain, network)

        count = 5
        while count > 0:
            try:
                self.region.ex_delete_network_domain(network_domain=domain)
                logging.info("- in progress")

            except Exception as feedback:

                if 'RESOURCE_BUSY' in str(feedback):
                    time.sleep(10)
                    continue

                elif 'RESOURCE_NOT_FOUND' in str(feedback):
                    logging.info("- not found")

                elif 'HAS_DEPENDENCY' in str(feedback):
                    count -= 1
                    if count > 0:
                        time.sleep(20)
                        continue
                    logging.info("- not now - stuff on it")
                    return False

                elif 'RESOURCE_LOCKED' in str(feedback):
                    logging.info("- not now - locked")
                    return False

                raise PlumberyException(
                    "Error: unable to destroy network domain '{0}' {1}!"
                                    .format(domainName, feedback))

            break

        return True

    def get_domain(self, blueprint):
        """
        Retrieves a domain attached to a blueprint

        :param blueprint: the various attributes of the target fittings
        :type blueprint: ``dict``

        :returns: :class:`.PlumberyDomain` or None

        :raises: :class:`.PlumberyException`

        """
        target = PlumberyDomain(self.facility)

        if 'domain' not in blueprint or type(blueprint['domain']) is not dict:
            raise PlumberyException(
                "Error: no network domain has been defined " \
                     "for the blueprint '{}'!".format(blueprint['target']))

        if len(self._cache_network_domains) < 1:
            self._cache_network_domains = self.region.ex_list_network_domains(
                                        location=self.facility.location)

        domainName = blueprint['domain']['name']
        target.domain = None
        for target.domain in self._cache_network_domains:
            if target.domain.name == domainName:
                break

        if target.domain is None or target.domain.name != domainName:
            logging.info("Warning: network domain '{}' is unknown"
                            .format(domainName))
            return None

        if 'ethernet' not in blueprint or type(blueprint['ethernet']) is not dict:
            raise PlumberyException(
                "Error: no ethernet network has been defined " \
                        "for the blueprint '{}'!".format(blueprint['target']))

        if len(self._cache_vlans) < 1:
            self._cache_vlans = self.region.ex_list_vlans(
                                        location=self.facility.location)

        networkName = blueprint['ethernet']['name']
        target.network = None
        for target.network in self._cache_vlans:
            if target.network.name == networkName:
                break

        if target.network is None or target.network.name != networkName:
            logging.info("Warning: Ethernet network '{}' is unknown"
                            .format(networkName))
            return None

        return target

    def get_ethernet(self, path):
        """
        Retrieves an Ethernet network by name

        :param label: the name of the target Ethernet network
        :type label: ``str``

        :returns: :class:`VLAN` or None

        :raises: :class:`.PlumberyException`

        This function searches firstly at the current facility. If the
        name is a complete path to a remote network, then plumbery looks
        there. If a different region is provided, then authentication is done
        against the related endpoint.

        For example if ``MyNetwork`` has been defined in a data centre in
        Europe::

            >>>domains.get_ethernet('MyNetwork')
            >>>domains.get_ethernet(['EU6', 'MyNetwork'])
            >>>domains.get_ethernet(['dd-eu', 'EU6', 'MyNetwork'])
        """

        if isinstance(path, str):
            path = [path]

        if len(path) == 1:

            if len(self._cache_vlans) < 1:
                self._cache_vlans = self.region.ex_list_vlans(
                                            location=self.facility.location)

            for network in self._cache_vlans:
                if network.name == path[0]:
                    self._update_ipv6(self.region.connection, network)
                    return network

        elif len(path) == 2:

            remoteLocation = self.region.ex_get_location_by_id(path[0])

            vlans = self.region.ex_list_vlans(location=remoteLocation)
            for network in vlans:
                if network.name == path[1]:
                    self._update_ipv6(self.region.connection, network)
                    return network

        elif len(path) == 3:

            offshore = self.plumbery.provider(
                self.plumbery.get_user_name(),
                self.plumbery.get_user_password(),
                region=path[0])

            remoteLocation = offshore.ex_get_location_by_id(path[1])

            vlans = offshore.ex_list_vlans(location=remoteLocation)
            for network in vlans:
                if network.name == path[2]:
                    self._update_ipv6(offshore.connection, network)
                    return network

        return None

    def get_firewall_rule_name(self, source, destination, protocol):
        """
        Provides a name for a firewall rule

        :param source: name of the source network
        :type source: ``str``

        :param destination: name of the destination network
        :type destination: ``str``

        :param protocol: the protocol that will flow
        :type protocol: ``str``

        Use this function to ensure consistent naming across firewall rules.

        Example::

            >>>source='gigafox.control'
            >>>destination='gigafox.production'
            >>>protocol='IP'
            >>>domain.get_firewall_rule_name(source, destination, protocol)
            'plumbery.FlowIPFromGigafoxControlToGigafoxProduction'

        """

        source = ''.join(e for e in source.title() if e.isalnum())
        destination = ''.join(e for e in destination.title() if e.isalnum())

        return "plumbery.Flow{}From{}To{}".format(protocol, source, destination)

    def _update_ipv6(self, connection, network):
        """
        Retrieves the ipv6 addresses for this network

        This is a hack. Code here should really go to the Libcloud driver in
        libcloud.compute.drivers.dimensiondata.py _to_vlan()

        """

        try:
            element = connection.request_with_orgId_api_2(
                'network/vlan/%s' % network.id).object

            ip_range = element.find(fixxpath('ipv6Range', TYPES_URN))

            network.ipv6_range_address=ip_range.get('address')
            network.ipv6_range_size=ip_range.get('prefixSize')

        except:
            pass


