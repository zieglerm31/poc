function bcsmAnswer(session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";

    //Store oAnswer event
    session.s_BSCM_Answer = event;

    //Get timestamp of last received event
    session.s_CamelEventTimeStamp = parseInt(event.starttime/1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);

    return ret;
}

function applyChargingReport(session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";


    //Store ApplyChargingReport event
    session.s_ACR = event;
    //CCR consumed units reported AVP 430
    session.s_ACR_duration = parseInt(session.s_ACR.event.camel.charging.usedUnits[0].amount/1000)


    //Get timestamp of last received event
    session.s_CamelEventTimeStamp = parseInt(event.starttime/1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);

    return ret;
}

function bcsmDisconnect(session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";

    //Store ApplyChargingReport event
    session.s_BSCM_Disconnect = event;
    //CCR consumed units reported AVP 430
    session.s_Event_duration = parseInt(session.s_BSCM_Disconnect.event.camel.charging.usedUnits[0].amount/1000);

    switch (session.s_BSCM_Disconnect.event.callStart.cause) {
        case "NETWORK_ABORT": {
            session.s_CallRelCause = 41;
            break;
        }
        case "BUSY": {
            session.s_CallRelCause = 17;
            break;
        }
        case "DISCONNECTED": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NO_ANSWER": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NOT_REACHABLE": {
            session.s_CallRelCause = 16;
            break;
        }
        default: {
            session.s_CallRelCause = 5;
            break;
        }
    }

    if (session.s_BSCM_Disconnect.event.camel.cs.rawReleaseCallCause) {

        session.s_s_CauseLocation = session.s_BSCM_Disconnect.event.camel.cs.rawReleaseCallCause.substr(1,1);

    } else {

        session.s_s_CauseLocation = "0";
    }


    //Get timestamp of last received event
    session.s_CamelEventTimeStamp = parseInt(event.starttime/1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);

    return ret;
}
function bcsmBusy(session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";


    //Store ApplyChargingReport event
    session.s_BSCM_Busy = event;
    //CCR consumed units reported AVP 430
    session.s_Event_duration = parseInt(session.s_BSCM_Busy.event.camel.charging.usedUnits[0].amount/1000);

    switch (session.s_BSCM_Busy.event.callStart.cause) {
        case "NETWORK_ABORT": {
            session.s_CallRelCause = 41;
            break;
        }
        case "BUSY": {
            session.s_CallRelCause = 17;
            break;
        }
        case "DISCONNECTED": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NO_ANSWER": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NOT_REACHABLE": {
            session.s_CallRelCause = 16;
            break;
        }
        default: {
            session.s_CallRelCause = 5;
            break;
        }
    }

    if (session.s_BSCM_Busy.event.camel.cs.rawReleaseCallCause) {

        session.s_s_CauseLocation = session.s_BSCM_Busy.event.camel.cs.rawReleaseCallCause.substr(1,1);

    } else {

        session.s_s_CauseLocation = "0";
    }


    //Get timestamp of last received event
    session.s_CamelEventTimeStamp = parseInt(event.starttime/1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);

    return ret;
}

function anyBCSMEvent (session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";


    //Store ApplyChargingReport event
    session.s_anyBCSM_event = event;
    //CCR consumed units reported AVP 430
    session.s_Event_duration = parseInt(session.s_anyBCSM_event.event.camel.charging.usedUnits[0].amount/1000);

    switch (session.s_anyBCSM_event.event.callStart.cause) {
        case "NETWORK_ABORT": {
            session.s_CallRelCause = 41;
            break;
        }
        case "BUSY": {
            session.s_CallRelCause = 17;
            break;
        }
        case "DISCONNECTED": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NO_ANSWER": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NOT_REACHABLE": {
            session.s_CallRelCause = 16;
            break;
        }
        default: {
            session.s_CallRelCause = 5;
            break;
        }
    }

    if (session.s_anyBCSM_event.event.camel.cs.rawReleaseCallCause) {

        session.s_s_CauseLocation = session.s_anyBCSM_event.event.camel.cs.rawReleaseCallCause.substr(1,1);

    } else {

        session.s_s_CauseLocation = "0";
    }

    //Get timestamp of last received event
    session.s_CamelEventTimeStamp = parseInt(event.starttime/1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);

    return ret;
}

function callEnd(session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";


    //Store ApplyChargingReport event
    session.s_callEndEvent = event;
    
    //CCR consumed units reported AVP 430
    try {
        session.s_Event_duration = parseInt(session.s_callEndEvent.event.camel.charging.usedUnits[0].amount/1000);
    }
    catch (e) {
        session.s_Event_duration = parseInt(0);
    }
    
    //CCR consumed units reported AVP 861
    switch (session.s_callEndEvent.event.callEnd.cause) {
        case "NETWORK_ABORT": {
            session.s_CallRelCause = 41;
            break;
        }
        case "BUSY": {
            session.s_CallRelCause = 17;
            break;
        }
        case "DISCONNECTED": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NO_ANSWER": {
            session.s_CallRelCause = 16;
            break;
        }
        case "NOT_REACHABLE": {
            session.s_CallRelCause = 16;
            break;
        }
        default: {
            session.s_CallRelCause = 5;
            break;
        }
    }

    if (session.s_callEndEvent.event.camel.cs.rawReleaseCallCause) {

        session.s_s_CauseLocation = session.s_callEndEvent.event.camel.cs.rawReleaseCallCause.substr(1,1);

    } else {

        session.s_s_CauseLocation = "0";
    }

    if (session.s_CCA["diameter"]["keys"]["Result-Code"][0].value == 4010){
        session.s_maxdur = 1;
    }

    //Get timestamp of last received event
    session.s_CamelEventTimeStamp = parseInt(event.starttime/1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);

    return ret;
}

function callInfoEvent(session:any,event:any,localParams:any): any {

    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";


    //Store callInfoEvent (CAP callStopTime) event
    session.s_callInfoPoll = event;
    //CCR consumed units reported AVP 430
    session.s_callStopTime = parseInt(session.s_callInfoPoll.event.camel.callInfo.callStopTime/1000);

    return ret;
}