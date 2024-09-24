"use strict";
function bcsmAnswer(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_BSCM_Answer = event;
    session.s_CamelEventTimeStamp = parseInt(event.starttime / 1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    return ret;
}
function applyChargingReport(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_ACR = event;
    session.s_ACR_duration = parseInt(session.s_ACR.event.camel.charging.usedUnits[0].amount / 1000);
    session.s_CamelEventTimeStamp = parseInt(event.starttime / 1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    return ret;
}
function bcsmDisconnect(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_BSCM_Disconnect = event;
    session.s_Event_duration = parseInt(session.s_BSCM_Disconnect.event.camel.charging.usedUnits[0].amount / 1000);
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
        session.s_s_CauseLocation = session.s_BSCM_Disconnect.event.camel.cs.rawReleaseCallCause.substr(1, 1);
    }
    else {
        session.s_s_CauseLocation = "0";
    }
    session.s_CamelEventTimeStamp = parseInt(event.starttime / 1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    return ret;
}
function bcsmBusy(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_BSCM_Busy = event;
    session.s_Event_duration = parseInt(session.s_BSCM_Busy.event.camel.charging.usedUnits[0].amount / 1000);
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
        session.s_s_CauseLocation = session.s_BSCM_Busy.event.camel.cs.rawReleaseCallCause.substr(1, 1);
    }
    else {
        session.s_s_CauseLocation = "0";
    }
    session.s_CamelEventTimeStamp = parseInt(event.starttime / 1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    return ret;
}
function anyBCSMEvent(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_anyBCSM_event = event;
    session.s_Event_duration = parseInt(session.s_anyBCSM_event.event.camel.charging.usedUnits[0].amount / 1000);
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
        session.s_s_CauseLocation = session.s_anyBCSM_event.event.camel.cs.rawReleaseCallCause.substr(1, 1);
    }
    else {
        session.s_s_CauseLocation = "0";
    }
    session.s_CamelEventTimeStamp = parseInt(event.starttime / 1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    return ret;
}
function callEnd(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_callEndEvent = event;
    try {
        session.s_Event_duration = parseInt(session.s_callEndEvent.event.camel.charging.usedUnits[0].amount / 1000);
    }
    catch (e) {
        session.s_Event_duration = parseInt(0);
    }
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
        session.s_s_CauseLocation = session.s_callEndEvent.event.camel.cs.rawReleaseCallCause.substr(1, 1);
    }
    else {
        session.s_s_CauseLocation = "0";
    }
    if (session.s_CCA["diameter"]["keys"]["Result-Code"][0].value == 4010) {
        session.s_maxdur = 1;
    }
    session.s_CamelEventTimeStamp = parseInt(event.starttime / 1000);
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    return ret;
}
function callInfoEvent(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    session.s_callInfoPoll = event;
    session.s_callStopTime = parseInt(session.s_callInfoPoll.event.camel.callInfo.callStopTime / 1000);
    return ret;
}
