
//DEPS:utils:LATEST
/** lib code */

function dump_in_rtelog (session:any,event:any,localParams:any): any {
    let log : any = session.log;

    log.error("DropByDispatcher_Session: {}, ",session);
    log.error("DropByDispatcher_Event: {}, ",event);


    //set pretty tracing info. This shall be in the first library after main
    let now : Date = new Date();
    let logDate : string = formatDate(now);
    let logTime : string = formatTime(now);
    try {
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
    } catch (e) {
        log.error("get_checkHF:Error adding trace details: {}",e);
    }
}
