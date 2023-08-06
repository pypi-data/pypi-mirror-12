# -*- coding: utf-8 -*-

"""
client.client
~~~~~~~~~~~~~~~~~~~~~

This module implements client connection with openNMS servers

"""


from log import logger
from urls import urls
from templates import templates
from exceptions import OpenNMSClientConnectError, MoreThanOneNodeReturnedError, MoreThanOneIpInterfaceReturnedError, \
    NodeDoesNotExistError, ServiceDoesNotExistError

import requests
from bs4 import BeautifulSoup as bs


class Client(object):
    def __init__(self, url, user, password, debug=False):
        """
        Initialize client and create a session
        :param url:
        :param user:
        :param password:
        :param debug:
        :return:
        """
        self.url = url
        self.url_rest = "{}/rest".format(self.url)
        self.user = user
        self.password = password
        self.services = {}

        if debug:  # save full log to file
            self.logger = logger(save=True)
        else:  # NullHandler
            self.logger = logger()

        self.__login__(url, user, password)

    def __login__(self, url, user, password):
        """ Login """
        self.session = requests.Session()
        self.response = self.__request__(self.url)

        if self.response.status_code != 200:
            raise OpenNMSClientConnectError(reason="Can not connect to: {}".format(self.url))
        else:
            self.logger.debug("Successfully logged in")

    def __request__(self, url, method="GET", data=None, headers={"Accept": "application/json"}):
        """
        Internal requests method with all the requirements to return json
        :param url:
        :type url: str
        :param method: http method
        :type method: str
        :param data: payload
        :type data: dict
        :param headers: headers to attach to the request
        :type headers: dict
        :return:

        """
        self.logger.debug("Requesting URL: {} {} (h:{}) (d:{})".format(method, url, headers, data))
        if method == "POST":
            self.response = self.session.post(url, data=data,
                                             auth=(self.user, self.password) if self.user else None,
                                             headers=headers,
                                             verify=True)
        else:
            self.response = self.session.get(url, data=data,
                                                 auth=(self.user, self.password) if self.user else None,
                                                 headers=headers,
                                                 verify=True)
        self.logger.debug("Request completed. {}".format(self.response))
        return self.response

    def get_nodes(self, limit=10):
        """
        Return a list of nodes using REST interface
        :param limit: amount of nodes
        :type limit: int
        :return: dict -- dictionary of nodes
        """
        url = "{0}/{1}/?&limit={2}".format(self.url_rest, urls['nodes'], limit)
        response = self.__request__(url).json()
        return response.get('node', {})

    def get_node(self, hostname):
        """
        Return node details using REST interface
        :param hostname: hostname string to get the node
        :type hostname: str
        :return: dict -- node details
        :raises: MoreThanOneNodeReturnedError, NodeDoesNotExistError
        """
        url = "{0}/{1}/?comparator=ilike&label={2}%25&limit=0".format(self.url_rest, urls['nodes'], hostname)
        response = self.__request__(url).json()
        if response.get('totalCount', 0) > 1:
            raise MoreThanOneNodeReturnedError(reason="More than one node was returned with hostname: {}".format(hostname))
        elif response.get('totalCount', 0) == 0:
            raise NodeDoesNotExistError(
                reason="Node with name {} does not exist ".format(hostname)
            )
        else:
            return response.get('node', {})[0]

    def get_ipinterfaces(self, hostname, node_id=0, principal=False):
        """
        Returns a list of interfaces give a hostname/node_id
        :param hostname: Hostname of the host to get interfaces from
        :param node_id: #TODO (optional) node_id so no query for get_node() will be needed
        :param principal: return a single interface, the primary
        :return:
        """
        node = self.get_node(hostname)
        # /nodes/{id}/ipinterfaces
        url = "{0}/{1}/{2}/{3}".format(self.url_rest, urls['nodes'], node.get('id'), urls['ipinterfaces'])
        response = self.__request__(url).json()
        if principal:
            if response.get('totalCount', 0) > 1:
                raise MoreThanOneIpInterfaceReturnedError(
                    reason="More than one ip interface was returned for hostname: {} (principal={})".format(hostname, principal)
                )
            else:
                # TODO: check that 'snmpPrimary': 'P'
                return response.get('ipInterface', {})[0]
        else:
            return response.get('ipInterface', {})

    def get_ipinterface_principal(self, hostname, node_id=0):
        """
        Returns node principal interface
        :param hostname:
        :param node_id:
        :return:
        """
        return self.get_ipinterfaces(hostname, node_id, principal=True)

    def get_services(self):
        """
        Return a list of services using WEB interface
        :param limit: amount of services
        :return: dictionary of services { 'name': id, ... }
        """
        # TODO: this should be collected using REST API but it's not available as version 1.6
        url = "{}/{}".format(self.url, urls['services'])
        response = self.__request__(url)
        html = bs(response.content, "html.parser")

        for item in html.find_all('option'):
            if item.parent.get('id') == "byservice_service":
                self.services[item.text] = int(item.get('value'))

        return self.services

    def set_service(self, hostname, service_name):
        """
        Add a service to a hostname
        :param hostname:
        :param service_name:
        :return:
        """
        node = self.get_node(hostname)
        ip_interface = self.get_ipinterface_principal(hostname)
        # get all the services
        self.get_services()
        if self.services.get(service_name, None):
            data = templates['services'].substitute(id=self.services[service_name], name=service_name)
            # /opennms/rest/nodes/<node_id>/ipinterfaces/<interface>/services
            url = "{0}/{1}/{2}/{3}/{4}/services".format(self.url_rest, urls['nodes'], node['id'], urls['ipinterfaces'], ip_interface['ipAddress'])
            response = self.__request__(url, method="POST", data=data, headers={"Content-Type": "application/xml"})
            return response

        else:
            raise ServiceDoesNotExistError(
                reason="Service with name {} does not exist ".format(service_name)
            )


    def disconnect(self):
        """close session."""
        return self.session.close()

    def __str__(self):
        return "{} ({}) {}".format(self.url, self.user, self.response)


