
The legacy IRS functions on seese6 RTE (v2 RTE) and in ocadmin/staging namespace. 
    For this service still use the old SCE! https://172.23.11.25:9007/nexus-sce/index.html#/

The new IRS function is on seese3 RTE (v4 RTE) and in ocadminv5/stagingv5 namespace.  
    For this service use the new SCE! - https://172.23.11.2:9007/nexus-sce/index.html#/

All traffic is routed from the TAS instances to the old RTE (seese6 IRS). 
This RTE forwards the traffic based on policies to the new RTE. 
This can be controlled by scripts that rae placed in the h3irs project folder.

    show_CurrentRouting.sh          	                            Shows current routing config with description
    routeALLtoNEW_namespace-v5.sh                                   all traffic is forwarded from old RTE to new RTE (seese3 ocadminv5/stagingv5 namespace)
    routeALLtoOLD.sh                                                all traffic remains on the old RTE (seese6 ocadmin/staging namespace)
    routeListBasedPrefix-h3irs_routing-toNEW_staging.sh             Suffix based match in h3irs_routing list
                                                                    Based on camel prepared spel "#event[\"event\"][\"callStart\"][\"leg\"][\"user\"]"

Good luck!
