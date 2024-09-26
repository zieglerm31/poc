
/** lib code */

function formatDate(date : Date) : string {
    let ret : string  = date.getFullYear().toString() + ("00" + (date.getMonth()+1).toString()).slice(-2) + ("00"+(date.getDate()).toString()).slice(-2);
    return ret;
}

function formatTime(date : Date) : string {
    let ret : string  = ("00"+date.getHours().toString()).slice(-2) + ("00"+date.getMinutes().toString()).slice(-2) + ("00"+date.getSeconds().toString()).slice(-2);
    return ret;
}


function sleepfunction(date : Date) : string {
    java.lang.Thread.sleep(999);

    return "success";
}

function prettytrace(session:any,event:any,localParams:any): any {
    let log : any = session.log;
    
    //set pretty tracing info. This shall be in the first library after main
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
}

function saveevent(session:any,event:any,localParams:any): any {
    session.s_savedevent = event;

    // as this is used for SIP.OPTIONS
    //set pretty tracing info. This shall be in the first library after main
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
}
