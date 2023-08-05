from __future__ import unicode_literals

import uuid
from jinja2 import Template

from moto.core import BaseBackend
from moto.core.utils import get_random_hex


class HealthCheck(object):
    def __init__(self, health_check_id, health_check_args):
        self.id = health_check_id
        self.ip_address = health_check_args.get("ip_address")
        self.port = health_check_args.get("port", 80)
        self._type = health_check_args.get("type")
        self.resource_path = health_check_args.get("resource_path")
        self.fqdn = health_check_args.get("fqdn")
        self.search_string = health_check_args.get("search_string")
        self.request_interval = health_check_args.get("request_interval", 30)
        self.failure_threshold = health_check_args.get("failure_threshold", 3)

    @property
    def physical_resource_id(self):
        return self.id

    @classmethod
    def create_from_cloudformation_json(cls, resource_name, cloudformation_json, region_name):
        properties = cloudformation_json['Properties']['HealthCheckConfig']
        health_check_args = {
            "ip_address": properties.get('IPAddress'),
            "port": properties.get('Port'),
            "type": properties['Type'],
            "resource_path": properties.get('ResourcePath'),
            "fqdn": properties.get('FullyQualifiedDomainName'),
            "search_string": properties.get('SearchString'),
            "request_interval": properties.get('RequestInterval'),
            "failure_threshold": properties.get('FailureThreshold'),
        }
        health_check = route53_backend.create_health_check(health_check_args)
        return health_check

    def to_xml(self):
        template = Template("""<HealthCheck>
            <Id>{{ health_check.id }}</Id>
            <CallerReference>example.com 192.0.2.17</CallerReference>
            <HealthCheckConfig>
                <IPAddress>{{ health_check.ip_address }}</IPAddress>
                <Port>{{ health_check.port }}</Port>
                <Type>{{ health_check._type }}</Type>
                <ResourcePath>{{ health_check.resource_path }}</ResourcePath>
                <FullyQualifiedDomainName>{{ health_check.fqdn }}</FullyQualifiedDomainName>
                <RequestInterval>{{ health_check.request_interval }}</RequestInterval>
                <FailureThreshold>{{ health_check.failure_threshold }}</FailureThreshold>
                {% if health_check.search_string %}
                    <SearchString>{{ health_check.search_string }}</SearchString>
                {% endif %}
            </HealthCheckConfig>
            <HealthCheckVersion>1</HealthCheckVersion>
        </HealthCheck>""")
        return template.render(health_check=self)


class RecordSet(object):
    def __init__(self, kwargs):
        self.name = kwargs.get('Name')
        self._type = kwargs.get('Type')
        self.ttl = kwargs.get('TTL')
        self.records = kwargs.get('ResourceRecords', [])
        self.set_identifier = kwargs.get('SetIdentifier')
        self.weight = kwargs.get('Weight')
        self.region = kwargs.get('Region')
        self.health_check = kwargs.get('HealthCheckId')

    @classmethod
    def create_from_cloudformation_json(cls, resource_name, cloudformation_json, region_name):
        properties = cloudformation_json['Properties']

        zone_name = properties["HostedZoneName"]
        hosted_zone = route53_backend.get_hosted_zone_by_name(zone_name)
        record_set = hosted_zone.add_rrset(properties)
        return record_set

    def to_xml(self):
        template = Template("""<ResourceRecordSet>
                <Name>{{ record_set.name }}</Name>
                <Type>{{ record_set._type }}</Type>
                {% if record_set.set_identifier %}
                    <SetIdentifier>{{ record_set.set_identifier }}</SetIdentifier>
                {% endif %}
                {% if record_set.weight %}
                    <Weight>{{ record_set.weight }}</Weight>
                {% endif %}
                {% if record_set.region %}
                    <Region>{{ record_set.region }}</Region>
                {% endif %}
                <TTL>{{ record_set.ttl }}</TTL>
                <ResourceRecords>
                    {% for record in record_set.records %}
                    <ResourceRecord>
                        <Value>{{ record }}</Value>
                    </ResourceRecord>
                    {% endfor %}
                </ResourceRecords>
                {% if record_set.health_check %}
                    <HealthCheckId>{{ record_set.health_check }}</HealthCheckId>
                {% endif %}
            </ResourceRecordSet>""")
        return template.render(record_set=self)


class FakeZone(object):

    def __init__(self, name, id_, comment=None):
        self.name = name
        self.id = id_
        self.comment = comment
        self.rrsets = []

    def add_rrset(self, record_set):
        record_set = RecordSet(record_set)
        self.rrsets.append(record_set)
        return record_set

    def delete_rrset_by_name(self, name):
        self.rrsets = [record_set for record_set in self.rrsets if record_set.name != name]

    def delete_rrset_by_id(self, set_identifier):
        self.rrsets = [record_set for record_set in self.rrsets if record_set.set_identifier != set_identifier]

    def get_record_sets(self, type_filter, name_filter):
        record_sets = list(self.rrsets)  # Copy the list
        if type_filter:
            record_sets = [record_set for record_set in record_sets if record_set._type == type_filter]
        if name_filter:
            record_sets = [record_set for record_set in record_sets if record_set.name == name_filter]

        return record_sets

    @property
    def physical_resource_id(self):
        return self.name

    @classmethod
    def create_from_cloudformation_json(cls, resource_name, cloudformation_json, region_name):
        properties = cloudformation_json['Properties']
        name = properties["Name"]

        hosted_zone = route53_backend.create_hosted_zone(name)
        return hosted_zone


class RecordSetGroup(object):
    def __init__(self, hosted_zone_id, record_sets):
        self.hosted_zone_id = hosted_zone_id
        self.record_sets = record_sets

    @property
    def physical_resource_id(self):
        return "arn:aws:route53:::hostedzone/{0}".format(self.hosted_zone_id)

    @classmethod
    def create_from_cloudformation_json(cls, resource_name, cloudformation_json, region_name):
        properties = cloudformation_json['Properties']

        zone_name = properties["HostedZoneName"]
        hosted_zone = route53_backend.get_hosted_zone_by_name(zone_name)
        record_sets = properties["RecordSets"]
        for record_set in record_sets:
            hosted_zone.add_rrset(record_set)

        record_set_group = RecordSetGroup(hosted_zone.id, record_sets)
        return record_set_group


class Route53Backend(BaseBackend):

    def __init__(self):
        self.zones = {}
        self.health_checks = {}

    def create_hosted_zone(self, name, comment=None):
        new_id = get_random_hex()
        new_zone = FakeZone(name, new_id, comment=comment)
        self.zones[new_id] = new_zone
        return new_zone

    def get_all_hosted_zones(self):
        return self.zones.values()

    def get_hosted_zone(self, id_):
        return self.zones.get(id_)

    def get_hosted_zone_by_name(self, name):
        for zone in self.get_all_hosted_zones():
            if zone.name == name:
                return zone

    def delete_hosted_zone(self, id_):
        zone = self.zones.get(id_)
        if zone:
            del self.zones[id_]
            return zone

    def create_health_check(self, health_check_args):
        health_check_id = str(uuid.uuid4())
        health_check = HealthCheck(health_check_id, health_check_args)
        self.health_checks[health_check_id] = health_check
        return health_check

    def get_health_checks(self):
        return self.health_checks.values()

    def delete_health_check(self, health_check_id):
        return self.health_checks.pop(health_check_id, None)

route53_backend = Route53Backend()
