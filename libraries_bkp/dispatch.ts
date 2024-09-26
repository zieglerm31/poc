
/* define here the dispatch logic */
/// --- SIT, PROD --- ///

//this is called by overload
//and important if GUI testing is used as this will the use the fsm-flowname the est is sent
//this is triggered if the timestamp in event is > the configured rte event-max-acceptable-delay-ms||300ms
//overload_dispatch not used in v5 anymore
function overload_dispatch (event : any ) : string {
    return "ocadminv5:h3irs:dropevent";
    
    let namespace:string = "ocadmin"; 
    namespace = dispatch(event);
    return namespace; 
}

// Main dispatch logic
function dispatch(event) {

    var namespace = "ocadminv5";


    // add v5 overloadhandling - dropping event based on overloadedLateEvent/overloadedQueueList
    try {
        if (event["header"]!=null) {            
            //any overload event is present
            //    "header": {
            //      "overloadedLateEvent": 513206009,
            //      "overloadedQueueList": [
            //        "queue-db/h3irs_CdrGW_ingress"
            //      ]
            //    }

            //disable overloadedLateEvent as it is always there for injected events 
            //if (event["header"]["overloadedLateEvent"]!=null) {
            //    //ingress event is late
            //    return "ocadmin:h3irs:dropevent";
            //}
            if (event["header"]["overloadedQueueList"]!=null) {
                //any egress queue is above LLEN limit max-pending-messages-per-queue (default = -1)
                //"queue-db/h3irs_CdrGW_ingress"
                if ( !(event["header"]["overloadedQueueList"][0].match(/^monitor/))) {
                    //if it doesnt start with monitor then it is likely any real-time traffic queue .. but monitor queue must not cause a drop event
                    return namespace + ":h3irs:dropevent";
                }                
            }            
        }
    } catch (e) {       

    }

    //used for staging namespace - MUST NOT BE CHANGED
    try {        
        //tracing middleware may return an object called "event-tracing". This will have higher priority as the tracing in the StartHandler. This object is disabled by middleware staging
        //tracing middleware may return an key in root valed "event-label-match" and if TRUE then matched in the staging list -> move to staging namespace
        //tracing middleware may return an object called "event-additional-info". This has parameters such as tracingid (id= eg msisdn without + to trace) and tracingmsg (message type). Additionally a parameter is added if a list match give true/false
        if (event["event-label-match"]!=null && event["event-label-match"]==true) {            
            namespace="stagingv5";
        }
    } catch (e) {

    }
    //used for staging namespace - MUST NOT BE CHANGED
    
    // the dispatcherresult is used to have a statistcs in the flow about the dispatcher result code
    // the dispatcherresult is added by staging and can be modified here BUT only if the event is captured by STATING == initial event
    // if not initial event then the event-additional-info object is not present and the modify will fail below causing an dispatcher exceptoin and potential loop of messages
    //dispatcherresult == namespace_dispatcherresult_namespace:project:flow

    //event-name=read-session-queue, event-type=fake
    if (event["event-type"] ==="fake")  {
        
        // do NOT enable the below as this somehow fails for fake events
        //if (event["event-additional-info"]["dispatcherresult"] != null) { 
        //    event["event-additional-info"]["dispatcherresult"] = namespace + "_fakeevent" + namespace + ":h3irsdrop";
        //}
        // do NOT enable the above as this somehow fails for fake events
        return namespace + ":h3irs:drop";
    }


    // Dispatch h3irs SIP Invites & h3irs SIP Options - do a few checks before
    try {
        if (event.SIP) {
            try {
                // OPTIONS
                if ( event.SIP.message.method[0].match(/^OPTIONS$/) && event.SIP["R-URI"].address.uri.user != null) {
                    if (event.SIP["R-URI"].address.uri.user.match(/^h3irs_/)) {                
                        if (event["event-additional-info"]?.["dispatcherresult"] != null) { 
                            event["event-additional-info"]["dispatcherresult"] = namespace + "_sipoption" + namespace + ":h3irs:h3irs_InternationalRoamingService_main";
                        }
                        return namespace + ":h3irs:h3irs_InternationalRoamingService_main";
                    }
                }
            } catch (e) {
                if (event["event-additional-info"]?.["dispatcherresult"] != null) { 
                    event["event-additional-info"]["dispatcherresult"]= namespace + "_exceptionoption" + namespace + ":h3irs:drop";
                }
                return namespace + ":h3irs:drop";
            }
            try {
                // INVITE has as well a irs route
                if (event["SIP"]["Route"][0]["address"]["uri"]["host"].match(/^irs/)) {            
                    if (event["event-additional-info"] != null) { 
                        event["event-additional-info"]["dispatcherresult"]= namespace + "_irs" + namespace + ":h3irs:h3irs_InternationalRoamingService_main"; 
                    }
                    return namespace + ":h3irs:h3irs_InternationalRoamingService_main";
                }
            } catch (e) {
                if (event["event-additional-info"] != null) { 
                    event["event-additional-info"]["dispatcherresult"]= namespace + "_exceptionroutehf" + namespace + ":h3irs:h3irs_InternationalRoamingService_main";
                }
                return namespace + ":h3irs:drop";
            }
        }
    } catch (e) {
        if (event["event-additional-info"] != null) { 
            event["event-additional-info"]["dispatcherresult"]= namespace + "_exceptionsip" + namespace + ":h3irs:h3irs_InternationalRoamingService_main";
        }
        return namespace + ":h3irs:drop";        
    }

    try {
        if ( event["event"]["camel"] ) {
            try {
                //camel
                if (event["event-additional-info"] != null) { 
                        event["event-additional-info"]["dispatcherresult"]= namespace + "_irs" + namespace + ":h3irs:h3irs_InternationalRoamingService_main"; 
                    }
                    return namespace + ":h3irs:h3irs_InternationalRoamingService_main";
            } catch (e) {
                if (event["event-additional-info"] != null) { 
                    event["event-additional-info"]["dispatcherresult"]= namespace + "_exceptionroutecamel" + namespace + ":h3irs:h3irs_InternationalRoamingService_main";
                }
                return namespace + ":h3irs:drop";
            }
        }
    } catch (e) {
        if (event["event-additional-info"] != null) { 
            event["event-additional-info"]["dispatcherresult"]= namespace + "_exceptionscap" + namespace + ":h3irs:h3irs_InternationalRoamingService_main";
        }
        return namespace + ":h3irs:drop";        
    }        

    // Default
    if (event["event-additional-info"] != null) { 
        event["event-additional-info"]["dispatcherresult"]= namespace + "_default" + namespace + ":h3irs:drop";
    }
    return namespace + ":h3irs:drop";
}
