
//DEPS:utils:LATEST
/** lib code */

// This MUST not be changed as it is very performance sensitive - for every event
// STAGING library for SIP-INVITES. Extract the tracingid from a Initial SIP.Invite in the following order from Top Route Header
// PAI(user uri) -> PAI(number uri) -> From(user uri) -> Frpm(number uri)


/** 
 * import a type from java. This is NOT javascript (for performance reasons)
 */
var HashMap = Java.type("java.util.HashMap");

/**
 * @param event {any} event to analyze
 * @return {HashMap} 
 */
function trace_details(event:any) {
    var ret = new HashMap();

    //same as configured in the rte process to refresh
    //list is refreshed every seconds as in the rte process config
    let listName:string = "h3irs_staging";
    let traceFieldValue:string = event.name!==null? event.name:"na";
    let ttl:number = 10000;
    let tracetype:string = "stagingtype";
    let traceField:string = "stagingfield";
    //prefix or suffix or any
    let searchType:string = "suffix";
    let initialeventflag:boolean = false;


    try{
        //for every session initial event for this service
        //sip options are type occp from tas-sce-component
        if( event["event-type"]!==null && (event["event-type"]==="sip" || event["event-type"]==="occp")){                        
            if( event["event-name"]!==null && event["event-name"] === "sip.callStart.NONE") {                
                try {
                    //only for SIP initial events with the top-most route HF set to rsi*
                    //fetch MSISDN: PAI if present else From .. else exception. for staging only PAI if present else From                    
                    if (event["SIP"]?.["P-Asserted-Identity"]) {                                      
                        //PAI is not present - use From
                        if (event["SIP"]?.["P-Asserted-Identity"]?.["address"]?.["uri"]) {
                            //PAI                            
                            if (event["SIP"]?.["P-Asserted-Identity"]?.["address"]?.["uri"]?.["user"]) {
                                traceFieldValue=event["SIP"]["P-Asserted-Identity"]["address"]["uri"]["user"];
                                tracetype="IRSbyPAINumber";
                                // Use prefix instead of suffix (default) for staging
                                if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {

                                    listName = "h3irs_staging_prefix";
                                    searchType = "prefix";
                                    tracetype="IRSbyPAINumber_pre";
                                }
                                traceFieldValue=traceFieldValue.replace("\+","");                                
                                initialeventflag=true;                                    
                            } else {
                                traceFieldValue=event["SIP"]["P-Asserted-Identity"]["address"]["uri"]["number"];
                                tracetype="IRSbyPAIUser";
                                // Use prefix instead of suffix (default) for staging
                                if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {

                                    listName = "h3irs_staging_prefix";
                                    searchType = "prefix";
                                    tracetype="IRSbyPAIUser_pre";
                                }
                                traceFieldValue=traceFieldValue.replace("\+","");
                                initialeventflag=true;
                            }
                        } else {
                            //PAI not present. Try PAI with index [0]  
                            if (event["SIP"]?.["P-Asserted-Identity"]?.[0]?.["address"]?.["uri"]) {
                                //PAI[0] exists
                                if (event["SIP"]?.["P-Asserted-Identity"]?.[0]?.["address"]?.["uri"]?.["user"]) {
                                    //try PAI[0] number
                                    traceFieldValue=event["SIP"]["P-Asserted-Identity"][0]["address"]["uri"]["user"];
                                    tracetype="IRSbyPAINumber";
                                    // Use prefix instead of suffix (default) for staging
                                    if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {

                                        listName = "h3irs_staging_prefix";
                                        searchType = "prefix";
                                        tracetype="IRSbyPAINumber_pre";
                                    }
                                    traceFieldValue=traceFieldValue.replace("\+","");                                
                                    initialeventflag=true;                                    
                                } else {
                                    traceFieldValue=event["SIP"]["P-Asserted-Identity"][0]["address"]["uri"]["number"];
                                    tracetype="IRSbyPAIUser";
                                    // Use prefix instead of suffix (default) for staging
                                    if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {

                                        listName = "h3irs_staging_prefix";
                                        searchType = "prefix";
                                        tracetype="IRSbyPAIUser_pre";
                                    }
                                    traceFieldValue=traceFieldValue.replace("\+","");    
                                    initialeventflag=true;
                                }    
                            } else {
                                //error
                                    initialeventflag=true;
                                    tracetype="noPAInumber[0]";
                                    traceFieldValue="notset";
                            }
                            
                        }
                    } else {
                        if (event["SIP"]?.["From"]?.["address"]?.["uri"]?.["user"]) {
                            traceFieldValue=event["SIP"]["From"]["address"]["uri"]["user"];
                            tracetype="IRSbyFromUser";
                            // Use prefix instead of suffix (default) for staging
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {

                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype="IRSbyFromUser_pre";
                            }
                            traceFieldValue=traceFieldValue.replace("\+","");
                            initialeventflag=true;
                        } else {

                            traceFieldValue=event["SIP"]["From"]["address"]["uri"]["number"];
                            tracetype="IRSbyFromNumber";
                            // Use prefix instead of suffix (default) for staging
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {

                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype="IRSbyFromNumber_pre";
                            }
                            traceFieldValue=traceFieldValue.replace("\+","");
                            initialeventflag=true;
                        }
                    }
                } catch (e) {
                    initialeventflag=true;
                    tracetype="exceptionat.sip.callStart:"+e;
                    traceFieldValue="notset";
                }
            } 

            if( event["event-name"]!==null && event["event-name"] === "sip.sessionStart.OPTIONS") {     
                if (event["session"]!==null) {
                    traceFieldValue=event["session"];
                    traceFieldValue="sip.sessionStart.OPTIONS";
                    //traceFieldValue="1";
                } else {
                    traceFieldValue="nosessionfound";
                }
                tracetype="IRSbyOPTIONS";
                initialeventflag=true;
            }      
        }          

        if( event["event-type"]!==null && event["event-type"]==="camel"){                        
            if( event["event-name"]!==null && event["event-name"] === "callStart.NONE") {                
                try {
                    if (event["event"]?.["camel"]?.["eventTypeBCSM"]) {
                        if (event["event"]["camel"]["eventTypeBCSM"] == 2) {        
                            //MO call
                            if (event["event"]["callStart"]?.["leg"]?.["user"]) {
                               if (event["event"]["callStart"]["leg"]["user"]) {
                                    traceFieldValue=event["event"]["callStart"]["leg"]["user"]
                                    tracetype="IRSbyMOlegUser";
                                }
                            } else {
                                initialeventflag=true;
                                tracetype="noUserforMT";
                                traceFieldValue="notset";
                            }
                            // Use prefix instead of suffix (default) for staging
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype="IRSbyMOlegUser_pre";
                            }  
                        } else if (event["event"]["camel"]["eventTypeBCSM"] == 12) {        
                            //MO call
                            if (event["event"]["callStart"]?.["contact"]?.["user"]) {
                                if (event["event"]["callStart"]["contact"]["user"]) {
                                    traceFieldValue=event["event"]["callStart"]["contact"]["user"];
                                    tracetype="IRSbyMTlegUser";
                                }
                            } else {
                                initialeventflag=true;
                                tracetype="noUserforMT";
                                traceFieldValue="notset";
                            }
                            // Use prefix instead of suffix (default) for staging
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype="IRSbyMTlegUser_pre";
                            }
                        } else {
                            initialeventflag=true;
                            tracetype="noValideventTypeBCSM";
                            traceFieldValue="notset";
                        }
                        traceFieldValue=traceFieldValue.replace("\+","");                                
                        initialeventflag=true;                                    
                    } else {
                            initialeventflag=true;
                            tracetype="noCamelDetails";
                            traceFieldValue="notset";
                    }
                } catch (e) {
                    initialeventflag=true;
                    tracetype="exceptionat.camel.callStart:"+e;
                    traceFieldValue="notset";
                }
            }
        }
    } catch (e) {
        //not exception handling
        initialeventflag=true;
        tracetype="exception:"+e;
        traceFieldValue="notset";
    };

    //this is important for the performance. Only Initial events shall return a structure as this trigger the redis table lookup or not!
    //eg SIP OPTIONS are not in the above as well
    if (initialeventflag===true){       
        ret.put("value",traceFieldValue);
        ret.put("list",listName);
        ret.put("searchType",searchType);
        ret.put("traceTtl",ttl);
        ret.put("traceType",tracetype);
        ret.put("traceField",traceField);   

        //those values are copied to the - additional-info={tracingid=<value>}
        ret.put("tracingid",traceFieldValue);
        ret.put("tracinglist",listName);
        ret.put("tracingmsg",tracetype);
        ret.put("dispatcherresult","stagingset");

        //add tracing for PMSRN range - this is the B party and tracing in IRS is in general on A party. So not required
        //traceIndented boolean to add the "event-tracing" object to the event (and overrule the StartHandler tracing or not). default if not added is false (not add)
        try {
            if ( traceFieldValue.match(/^\436603038/ )) {
                ret.put("traceIndented",true);
            } else {
                ret.put("traceIndented",false);
            }
        } catch (e) {
                ret.put("traceIndented",false);
        }
        
        //middleware always add the root level key "event-label-match" (boolean) if the list was matched or not
        return ret;              
    } else {
        //return empty - means not an event that we want /remember that every event goes through this
        return ret;
    }
}
