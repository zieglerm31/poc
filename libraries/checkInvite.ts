
//DEPS:utils:LATEST
function get_checkHF(session:any,event:any,localParams:any): any {
    //Define default result code & logging
    let ret: ResultCode;
    ret = ret || {};
    ret.resultCode="success";
    let log : any = session.log;


    try {


        //add prettytrace directly into the first function
        //this sets the parameters that show up at the trace gui
        let now : Date = new Date();
        let logDate : string = formatDate(now);
        let logTime : string = formatTime(now);
        try {
                if (session["fsm-trace-level"] > 0) {
                    //only increase trace if enabled by Start handler (random or list based)
                    if (event["event-additional-info"]!=null) {
                        session["trace-skey"] = event["event-additional-info"]["tracingid"];
                        session["trace-type"] = logDate+"-"+ logTime+"_"+event["event-additional-info"]["tracingmsg"];
                    } else  {
                        session["trace-type"] = logDate+"-"+ logTime+"_MissingStagingInfo";
                    }
                    if (session["trace-type"] == "random") {
                        //this is a random trace - set the value from default 1 to 2. not possible to get it from UIR as this is later in the flow. maybe could change in later but not considered yet
                        //"fsm-trace-level" field in the session to either 0 (basic), 1 (intermediate) or 2 (high);
                        session["fsm-trace-level"] = 2;
                    } else {
                        session["fsm-trace-level"] = 2;
                    }
                }
        } catch (e) {
            log.error("get_checkHF:Error adding trace details: {}",e);
        }

        //Store incoming initial SIP Invite from network (used for send Invites & responses)
        session.s_InitialInvite = event;
        //Get the capabilities of UA from initial Invite from Network for later use and manipulation
        session.s_IncCapabilities = session.s_InitialInvite.SIP.capabilities;

        //Get the Request URI in tel format which contains Context-ID (Last 7 digits) created by Camel IRS part e.g.: 43660066986232
        //Prefix: 4366006 
        //Context ID: 6986232
        session.s_RequestURI = session.s_InitialInvite.SIP["R-URI"];
        session.s_ContextID = session.s_RequestURI.address.uri.number;
        
     if(session.s_InitialInvite.SIP["P-Asserted-Identity"] != null) {

        if (session.s_InitialInvite.SIP["P-Asserted-Identity"][0].address.uri.number != null) {

            session.s_pai = session.s_InitialInvite.SIP["P-Asserted-Identity"][0].address.uri.number;

        } else {

         if (session.s_InitialInvite.SIP["P-Asserted-Identity"][0].address.uri.user != null) {

          session.s_pai = session.s_InitialInvite.SIP["P-Asserted-Identity"][0].address.uri.user;  

         }    
        }
     }
        
    if(session.s_InitialInvite.SIP["From"] != null) {

        if (session.s_InitialInvite.SIP["From"].address.uri.number != null) {

            session.s_from = session.s_InitialInvite.SIP["From"].address.uri.number;

        } else {

         if (session.s_InitialInvite.SIP["From"].address.uri.user != null) {

          session.s_from = session.s_InitialInvite.SIP["From"].address.uri.user;  

         }    
       }
    }

    if(session.s_InitialInvite.SIP["Privacy"] != null) {

        if (session.s_InitialInvite.SIP["Privacy"].value != null) {

            session.s_privacy = session.s_InitialInvite.SIP["Privacy"].value;

        } 
    }
    return ret;

    } catch (e) {

        return "Error";

    }
}
