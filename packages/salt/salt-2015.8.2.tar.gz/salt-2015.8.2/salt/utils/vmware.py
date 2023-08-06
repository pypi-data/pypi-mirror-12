# -*- coding: utf-8 -*-
'''
Connection library for VMWare

.. versionadded:: 2015.8.2

This is a base library used by a number of VMWare services such as VMWare
ESX, ESXi, and vCenter servers.

:depends: pyVmomi Python Module
'''

# Import Python Libs
from __future__ import absolute_import
import atexit
import logging

# Import Salt Libs
from salt.exceptions import SaltSystemExit


# Import Third Party Libs
try:
    from pyVim.connect import SmartConnect, Disconnect
    from pyVmomi import vim, vmodl
    HAS_PYVMOMI = True
except ImportError:
    HAS_PYVMOMI = False

# Get Logging Started
log = logging.getLogger(__name__)


def __virtual__():
    '''
    Only load if PyVmomi is installed.
    '''
    if HAS_PYVMOMI:
        return True
    else:
        return False, 'Missing dependency: The salt.utils.vmware module requires pyVmomi.'


def get_service_instance(host, username, password, protocol=None, port=None):
    '''
    Authenticate with a vCenter server or ESX/ESXi host and return the service instance object.

    host
        The location of the vCenter server or ESX/ESXi host.

    username
        The username used to login to the vCenter server or ESX/ESXi host.

    password
        The password used to login to the vCenter server or ESX/ESXi host.

    protocol
        Optionally set to alternate protocol if the vCenter server or ESX/ESXi host is not
        using the default protocol. Default protocol is ``https``.

    port
        Optionally set to alternate port if the vCenter server or ESX/ESXi host is not
        using the default port. Default port is ``443``.
    '''
    if protocol is None:
        protocol = 'https'
    if port is None:
        port = 443

    try:
        service_instance = SmartConnect(
            host=host,
            user=username,
            pwd=password,
            protocol=protocol,
            port=port
        )
    except Exception as exc:
        default_msg = 'Could not connect to host \'{0}\'. ' \
                      'Please check the debug log for more information.'.format(host)
        if isinstance(exc, vim.fault.HostConnectFault) and '[SSL: CERTIFICATE_VERIFY_FAILED]' in exc.msg:
            try:
                import ssl
                default_context = ssl._create_default_https_context
                ssl._create_default_https_context = ssl._create_unverified_context
                service_instance = SmartConnect(
                    host=host,
                    user=username,
                    pwd=password,
                    protocol=protocol,
                    port=port
                )
                ssl._create_default_https_context = default_context
            except Exception as exc:
                err_msg = exc.msg if hasattr(exc, 'msg') else default_msg
                log.debug(exc)
                raise SaltSystemExit(err_msg)
        else:
            err_msg = exc.msg if hasattr(exc, 'msg') else default_msg
            log.debug(exc)
            raise SaltSystemExit(err_msg)

    atexit.register(Disconnect, service_instance)

    return service_instance


def get_inventory(service_instance):
    '''
    Return the inventory of a Service Instance Object.

    service_instance
        The Service Instance Object for which to obtain inventory.
    '''
    return service_instance.RetrieveContent()


def get_content(service_instance, obj_type, property_list=None):
    '''
    Returns the content of the specified type of object for a Service Instance.

    For more information, please see:
    http://pubs.vmware.com/vsphere-50/index.jsp?topic=%2Fcom.vmware.wssdk.pg.doc_50%2FPG_Ch5_PropertyCollector.7.6.html

    service_instance
        The Service Instance from which to obtain content.

    obj_type
        The type of content to obtain.

    property_list
        An optional list of object properties to used to return even more filtered content results.
    '''
    # Create an object view
    obj_view = service_instance.content.viewManager.CreateContainerView(
        service_instance.content.rootFolder, [obj_type], True)

    # Create traversal spec to determine the path for collection
    traversal_spec = vmodl.query.PropertyCollector.TraversalSpec(
        name='traverseEntities',
        path='view',
        skip=False,
        type=vim.view.ContainerView
    )

    # Create property spec to determine properties to be retrieved
    property_spec = vmodl.query.PropertyCollector.PropertySpec(
        type=obj_type,
        all=True if not property_list else False,
        pathSet=property_list
    )

    # Create object spec to navigate content
    obj_spec = vmodl.query.PropertyCollector.ObjectSpec(
        obj=obj_view,
        skip=True,
        selectSet=[traversal_spec]
    )

    # Create a filter spec and specify object, property spec in it
    filter_spec = vmodl.query.PropertyCollector.FilterSpec(
        objectSet=[obj_spec],
        propSet=[property_spec],
        reportMissingObjectsInResults=False
    )

    # Retrieve the contents
    content = service_instance.content.propertyCollector.RetrieveContents([filter_spec])

    # Destroy the object view
    obj_view.Destroy()

    return content


def get_mor_by_property(service_instance, object_type, property_value, property_name='name'):
    '''
    Returns the first managed object reference having the specified property value.

    service_instance
        The Service Instance from which to obtain managed object references.

    object_type
        The type of content for which to obtain managed object references.

    property_value
        The name of the property for which to obtain the managed object reference.

    property_name
        An object property used to return the specified object reference results. Defaults to ``name``.
    '''
    # Get list of all managed object references with specified property
    object_list = get_mors_with_properties(service_instance, object_type, property_list=[property_name])

    for obj in object_list:
        if obj[property_name] == property_value:
            return obj['object']

    return None


def get_mors_with_properties(service_instance, object_type, property_list=None):
    '''
    Returns a list containing properties and managed object references for the managed object.

    service_instance
        The Service Instance from which to obtain managed object references.

    object_type
        The type of content for which to obtain managed object references.

    property_list
        An optional list of object properties used to return even more filtered managed object reference results.
    '''
    # Get all the content
    content = get_content(service_instance, object_type, property_list=property_list)

    object_list = []
    for obj in content:
        properties = {}
        for prop in obj.propSet:
            properties[prop.name] = prop.val
            properties['object'] = obj.obj
        object_list.append(properties)

    return object_list


def get_network_adapter_type(adapter_type):
    '''
    Return the network adapter type.

    adpater_type
        The adapter type from which to obtain the network adapter type.
    '''
    if adapter_type == "vmxnet":
        return vim.vm.device.VirtualVmxnet()
    elif adapter_type == "vmxnet2":
        return vim.vm.device.VirtualVmxnet2()
    elif adapter_type == "vmxnet3":
        return vim.vm.device.VirtualVmxnet3()
    elif adapter_type == "e1000":
        return vim.vm.device.VirtualE1000()
    elif adapter_type == "e1000e":
        return vim.vm.device.VirtualE1000e()


def list_objects(service_instance, vim_object, properties=None):
    '''
    Returns a simple list of objects from a given service instance.

    service_instance
        The Service Instance for which to obtain a list of objects.

    object_type
        The type of content for which to obtain information.

    property_list
        An optional list of object properties used to return reference results.
        If not provided, defaults to ``name``.
    '''
    if properties is None:
        properties = ['name']

    items = []
    item_list = get_mors_with_properties(service_instance, vim_object, properties)
    for item in item_list:
        items.append(item['name'])
    return items


def list_datacenters(service_instance):
    '''
    Returns a list of datacenters associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain datacenters.
    '''
    return list_objects(service_instance, vim.Datacenter)


def list_clusters(service_instance):
    '''
    Returns a list of clusters associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain clusters.
    '''
    return list_objects(service_instance, vim.ClusterComputeResource)


def list_datastore_clusters(service_instance):
    '''
    Returns a list of datastore clusters associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain datastore clusters.
    '''
    return list_objects(service_instance, vim.StoragePod)


def list_datastores(service_instance):
    '''
    Returns a list of datastores associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain datastores.
    '''
    return list_objects(service_instance, vim.Datastore)


def list_hosts(service_instance):
    '''
    Returns a list of hosts associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain hosts.
    '''
    return list_objects(service_instance, vim.HostSystem)


def list_resourcepools(service_instance):
    '''
    Returns a list of resource pools associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain resource pools.
    '''
    return list_objects(service_instance, vim.ResourcePool)


def list_networks(service_instance):
    '''
    Returns a list of networks associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain networks.
    '''
    return list_objects(service_instance, vim.Network)


def list_vms(service_instance):
    '''
    Returns a list of VMs associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain VMs.
    '''
    return list_objects(service_instance, vim.VirtualMachine)


def list_folders(service_instance):
    '''
    Returns a list of folders associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain folders.
    '''
    return list_objects(service_instance, vim.Folder)


def list_dvs(service_instance):
    '''
    Returns a list of distributed virtual switches associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain distributed virtual switches.
    '''
    return list_objects(service_instance, vim.DistributedVirtualSwitch)


def list_vapps(service_instance):
    '''
    Returns a list of vApps associated with a given service instance.

    service_instance
        The Service Instance Object from which to obtain vApps.
    '''
    return list_objects(service_instance, vim.VirtualApp)
