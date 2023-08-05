# -*- coding: utf-8 -*-
#
# Copyright (c) 2015, Alcatel-Lucent Inc
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#     * Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in the
#       documentation and/or other materials provided with the distribution.
#     * Neither the name of the copyright holder nor the names of its contributors
#       may be used to endorse or promote products derived from this software without
#       specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


from .nuvsp import NUVSP
from .nul2domain import NUL2Domain
from .nuautodiscoveredgateway import NUAutoDiscoveredGateway
from .nuport import NUPort
from .nuuplinkrd import NUUplinkRD
from .nudscpforwardingclassmapping import NUDSCPForwardingClassMapping
from .nuvcentercluster import NUVCenterCluster
from .nulicense import NULicense
from .nuqos import NUQOS
from .nuingressacltemplate import NUIngressACLTemplate
from .nuexternalappservice import NUExternalAppService
from .nubgppeer import NUBGPPeer
from .nugroup import NUGroup
from .nuapplicationservice import NUApplicationService
from .nuhostinterface import NUHostInterface
from .nulocation import NULocation
from .nuvcenterdatacenter import NUVCenterDataCenter
from .nuendpoint import NUEndPoint
from .nuvcentervrsconfig import NUVCenterVRSConfig
from .nuegressqospolicy import NUEgressQOSPolicy
from .nuenterprisepermission import NUEnterprisePermission
from .nusystemconfig import NUSystemConfig
from .nurestuser import NURESTUser
from .nustatscollectorinfo import NUStatsCollectorInfo
from .nuinfrastructureconfig import NUInfrastructureConfig
from .nubridgeinterface import NUBridgeInterface
from .nuratelimiter import NURateLimiter
from .nueventlog import NUEventLog
from .nukeyservermonitorseed import NUKeyServerMonitorSeed
from .nuaddressrange import NUAddressRange
from .numonitoringport import NUMonitoringPort
from .nuvlan import NUVLAN
from .nuenterprise import NUEnterprise
from .nuredirectiontargettemplate import NURedirectionTargetTemplate
from .nupatnatpool import NUPATNATPool
from .nuvsd import NUVSD
from .nuvpnconnection import NUVPNConnection
from .nuapp import NUApp
from .nuflowforwardingpolicy import NUFlowForwardingPolicy
from .nuinfrastructurevscprofile import NUInfrastructureVscProfile
from .nuvcenter import NUVCenter
from .nutca import NUTCA
from .nuvcenterhypervisor import NUVCenterHypervisor
from .nukeyservermonitorencryptedsek import NUKeyServerMonitorEncryptedSEK
from .nuporttemplate import NUPortTemplate
from .nuvrs import NUVRS
from .numulticastrange import NUMultiCastRange
from .nustatistics import NUStatistics
from .nunsport import NUNSPort
from .nunsportstaticconfiguration import NUNSPortStaticConfiguration
from .nucloudmgmtsystem import NUCloudMgmtSystem
from .nudomaintemplate import NUDomainTemplate
from .nuvirtualip import NUVirtualIP
from .nuvminterface import NUVMInterface
from .nuinfrastructureportprofile import NUInfrastructurePortProfile
from .nukeyservermonitor import NUKeyServerMonitor
from .nupermittedaction import NUPermittedAction
from .numetadatatag import NUMetadataTag
from .nuingressadvfwdentrytemplate import NUIngressAdvFwdEntryTemplate
from .nuzone import NUZone
from .nuegressacltemplate import NUEgressACLTemplate
from .nul2domaintemplate import NUL2DomainTemplate
from .nutier import NUTier
from .nuingressaclentrytemplate import NUIngressACLEntryTemplate
from .nugatewaytemplate import NUGatewayTemplate
from .nubootstrap import NUBootstrap
from .nusiteinfo import NUSiteInfo
from .nuredirectiontarget import NURedirectionTarget
from .nuenterpriseprofile import NUEnterpriseProfile
from .nucertificate import NUCertificate
from .nupolicygroup import NUPolicyGroup
from .nukeyservermonitorsek import NUKeyServerMonitorSEK
from .nuhsc import NUHSC
from .nuvm import NUVM
from .numulticastchannelmap import NUMultiCastChannelMap
from .nuvcentereamconfig import NUVCenterEAMConfig
from .nuvport import NUVPort
from .numulticastlist import NUMultiCastList
from .nunsgatewaytemplate import NUNSGatewayTemplate
from .nuaggregatemetadata import NUAggregateMetadata
from .numirrordestination import NUMirrorDestination
from .nuwanservice import NUWANService
from .nupolicydecision import NUPolicyDecision
from .nuexternalservice import NUExternalService
from .nuzonetemplate import NUZoneTemplate
from .nunatmapentry import NUNATMapEntry
from .nustaticroute import NUStaticRoute
from .nuvlantemplate import NUVLANTemplate
from .nuredundancygroup import NURedundancyGroup
from .nuglobalmetadata import NUGlobalMetadata
from .nuvmresync import NUVMResync
from .nudscpforwardingclasstable import NUDSCPForwardingClassTable
from .nuingressexternalservicetemplate import NUIngressExternalServiceTemplate
from .nuenterprisenetwork import NUEnterpriseNetwork
from .nuvportmirror import NUVPortMirror
from .nualarm import NUAlarm
from .nukeyservermonitorencryptedseed import NUKeyServerMonitorEncryptedSeed
from .nuinfrastructuregatewayprofile import NUInfrastructureGatewayProfile
from .nusharednetworkresource import NUSharedNetworkResource
from .nugroupkeyencryptionprofile import NUGroupKeyEncryptionProfile
from .nupublicnetworkmacro import NUPublicNetworkMacro
from .nunsporttemplate import NUNSPortTemplate
from .nupolicygrouptemplate import NUPolicyGroupTemplate
from .numultinicvport import NUMultiNICVPort
from .nuflowsecuritypolicy import NUFlowSecurityPolicy
from .nuvcentervrsaddressrange import NUVCenterVRSAddressRange
from .nuflow import NUFlow
from .nusubnettemplate import NUSubnetTemplate
from .nuredundantport import NURedundantPort
from .numetadata import NUMetadata
from .nuuser import NUUser
from .nuvsc import NUVSC
from .nuegressaclentrytemplate import NUEgressACLEntryTemplate
from .nunetworklayout import NUNetworkLayout
from .nuvsdcomponent import NUVSDComponent
from .nusubnet import NUSubnet
from .nuingressadvfwdtemplate import NUIngressAdvFwdTemplate
from .nufloatingip import NUFloatingIp
from .nunetworkmacrogroup import NUNetworkMacroGroup
from .nuipreservation import NUIPReservation
from .nuingressexternalservicetemplateentry import NUIngressExternalServiceTemplateEntry
from .nugateway import NUGateway
from .nunsgateway import NUNSGateway
from .nustatisticspolicy import NUStatisticsPolicy
from .nujob import NUJob
from .nudhcpoption import NUDHCPOption
from .nubootstrapactivation import NUBootstrapActivation
from .nunsredundantgwgrp import NUNSRedundantGWGrp
from .nuldapconfiguration import NULDAPConfiguration
from .nudomain import NUDomain

__all__ = ["NUVSP", "NUL2Domain", "NUAutoDiscoveredGateway", "NUPort", "NUUplinkRD", "NUDSCPForwardingClassMapping", "NUVCenterCluster", "NULicense", "NUQOS", "NUIngressACLTemplate", "NUExternalAppService", "NUBGPPeer", "NUGroup", "NUApplicationService", "NUHostInterface", "NULocation", "NUVCenterDataCenter", "NUEndPoint", "NUVCenterVRSConfig", "NUEgressQOSPolicy", "NUEnterprisePermission", "NUSystemConfig", "NURESTUser", "NUStatsCollectorInfo", "NUInfrastructureConfig", "NUBridgeInterface", "NURateLimiter", "NUEventLog", "NUKeyServerMonitorSeed", "NUAddressRange", "NUMonitoringPort", "NUVLAN", "NUEnterprise", "NURedirectionTargetTemplate", "NUPATNATPool", "NUVSD", "NUVPNConnection", "NUApp", "NUFlowForwardingPolicy", "NUInfrastructureVscProfile", "NUVCenter", "NUTCA", "NUVCenterHypervisor", "NUKeyServerMonitorEncryptedSEK", "NUPortTemplate", "NUVRS", "NUMultiCastRange", "NUStatistics", "NUNSPort", "NUNSPortStaticConfiguration", "NUCloudMgmtSystem", "NUDomainTemplate", "NUVirtualIP", "NUVMInterface", "NUInfrastructurePortProfile", "NUKeyServerMonitor", "NUPermittedAction", "NUMetadataTag", "NUIngressAdvFwdEntryTemplate", "NUZone", "NUEgressACLTemplate", "NUL2DomainTemplate", "NUTier", "NUIngressACLEntryTemplate", "NUGatewayTemplate", "NUBootstrap", "NUSiteInfo", "NURedirectionTarget", "NUEnterpriseProfile", "NUCertificate", "NUPolicyGroup", "NUKeyServerMonitorSEK", "NUHSC", "NUVM", "NUMultiCastChannelMap", "NUVCenterEAMConfig", "NUVPort", "NUMultiCastList", "NUNSGatewayTemplate", "NUAggregateMetadata", "NUMirrorDestination", "NUWANService", "NUPolicyDecision", "NUExternalService", "NUZoneTemplate", "NUNATMapEntry", "NUStaticRoute", "NUVLANTemplate", "NURedundancyGroup", "NUGlobalMetadata", "NUVMResync", "NUDSCPForwardingClassTable", "NUIngressExternalServiceTemplate", "NUEnterpriseNetwork", "NUVPortMirror", "NUAlarm", "NUKeyServerMonitorEncryptedSeed", "NUInfrastructureGatewayProfile", "NUSharedNetworkResource", "NUGroupKeyEncryptionProfile", "NUPublicNetworkMacro", "NUNSPortTemplate", "NUPolicyGroupTemplate", "NUMultiNICVPort", "NUFlowSecurityPolicy", "NUVCenterVRSAddressRange", "NUFlow", "NUSubnetTemplate", "NURedundantPort", "NUMetadata", "NUUser", "NUVSC", "NUEgressACLEntryTemplate", "NUNetworkLayout", "NUVSDComponent", "NUSubnet", "NUIngressAdvFwdTemplate", "NUFloatingIp", "NUNetworkMacroGroup", "NUIPReservation", "NUIngressExternalServiceTemplateEntry", "NUGateway", "NUNSGateway", "NUStatisticsPolicy", "NUJob", "NUDHCPOption", "NUBootstrapActivation", "NUNSRedundantGWGrp", "NULDAPConfiguration", "NUDomain"]