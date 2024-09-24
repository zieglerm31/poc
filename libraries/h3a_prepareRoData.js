"use strict";
function h3a_prepareRoData(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "Success";
    session.s_UnixTimeStamp = parseInt((new Date()).getTime() / 1000);
    session.s_CallAttemptUnix = parseInt(session.s_callAttemptTime / 1000);
    var l_chargingIdentifier = session.s_callReferenceNumber + "FEE" + session.s_callAttemptTime;
    if (l_chargingIdentifier.length % 2 == 0) {
        session.s_chargingIdentifier = l_chargingIdentifier;
    }
    else {
        session.s_chargingIdentifier = l_chargingIdentifier + "F";
    }
    session.s_Calling_tel_uri = "tel:+" + session.s_CallingPartyNrNorm.user;
    if (session.s_CC_prefix == session.s_homeCountryCode) {
        session.s_Roam_Type = 0;
        if (session.s_CalledPartyNrNorm.parameters["network-context"].match(/^.*\.(4|1)\.\d$/)) {
            if (session.s_IDP.event.callStart.contact.user.match(/^0(?!0)/)) {
                session.s_Called_tel_uri = "tel:+" + session.s_homeCountryCode + session.s_IDP.event.callStart.contact.user;
            }
            else {
                session.s_Called_tel_uri = "tel:+" + session.s_CalledPartyNrNorm.user;
            }
        }
        else {
            if (session.s_CalledPartyNrNorm.user.match(/^1|^3|^5|^7|^8/)) {
                session.s_Called_tel_uri = "tel:+" + session.s_homeCountryCode + session.s_CalledPartyNrNorm.user;
            }
            else {
                session.s_Called_tel_uri = "tel:" + session.s_CalledPartyNrNorm.user;
            }
        }
    }
    else {
        session.s_Roam_Type = 2;
        if (session.s_IDP.event.callStart.contact.user.match(/^0(?!0)/)) {
            session.s_Called_tel_uri = "tel:" + session.s_IDP.event.callStart.contact.user;
        }
        else if (session.s_CalledPartyNrNorm.parameters["network-context"].match(/^.*\.(4|1)\.\d$/)) {
            session.s_Called_tel_uri = "tel:+" + session.s_CalledPartyNrNorm.user;
        }
        else {
            session.s_Called_tel_uri = "tel:" + session.s_CalledPartyNrNorm.user;
        }
    }
    switch (session.s_IDP.event.camel.common.mediaType) {
        case "AUDIO": {
            session.s_CCR_Media_Id = 0;
            break;
        }
        case "VIDEO": {
            session.s_CCR_Media_Id = 1;
            break;
        }
        case "FAX": {
            session.s_CCR_Media_Id = 2;
            break;
        }
        default: {
            session.s_CCR_Media_Id = 0;
            break;
        }
    }
    try {
        if (session.s_IDP.event.camel.redirectReason == "FORWARDED_UNCONDITIONAL") {
            session.s_CC_Service_Identity = 101;
        }
        else {
            session.s_CC_Service_Identity = null;
        }
    }
    catch (e) {
        session.s_CC_Service_Identity = null;
    }
    return ret;
}
