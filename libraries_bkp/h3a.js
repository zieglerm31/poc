function createH3TepNotifyEvent(session, event, localParams) {
    var log = session.log;
    var l_H3TepNotify;
    if (localParams.sessionID.split("*deli*")[1] == session["profile.site_ID"]) {
        l_H3TepNotify = {
            "event-type": "h3tep.notify",
            "event-name": "h3tep.notify",
            "session": localParams.sessionID.split("*deli*")[0],
            "rawRedirectInfo": session.s_IDP.event.camel.cs.rawRedirectionInformation,
            "queue": localParams.queue
        };
    }
    else {
        l_H3TepNotify = {
            "event-type": "h3tep.notify",
            "event-name": "h3tep.notify",
            "session": localParams.sessionID.split("*deli*")[0],
            "rawRedirectInfo": session.s_IDP.event.camel.cs.rawRedirectionInformation,
            "queue": "queue-db-rem/" + localParams.queue
        };
    }
    //log.debug("H3TEP_Notification:{}",JSON.stringify(l_H3TepNotify));
    return l_H3TepNotify;
}
function checkVBSF(session, event, localParams) {
    var log = session.log;
    session.s_VPN = "False";
    session.s_Smart = "False";
    session.s_VvpnId = "null";
    session.s_VvpnRo = "null";
    try {
        // Check if vbsf parameter exist
        if (session.s_ServiceVOICEObj.vbsf) {
            // Check if vbsf is an Array (List)
            if (session.s_ServiceVOICEObj.vbsf instanceof java.util.List) {
                //Iterate through Array and check value of vbsf Array
                for (var _i = 0, _a = session.s_ServiceVOICEObj.vbsf; _i < _a.length; _i++) {
                    var eachElement = _a[_i];
                    //  Check if eachElement has an value (vbsf Array)
                    if (eachElement) {
                        //Validate value of the vbsf Array
                        switch (eachElement) {
                            case "VPN": {
                                session.s_VPN = "True";
                                session.s_VvpnId = session.s_ServiceVOICEObj.vvpnid;
                                session.s_VvpnRo = session.s_ServiceVOICEObj.vvpnro;
                                break;
                            }
                            case "SMARTSIM": {
                                session.s_Smart = "True";
                                break;
                            }
                        }
                    }
                }
                // vbsf is not an Arrray (List)
            }
            else {
                if (session.s_ServiceVOICEObj.vbsf == "SMARTSIM") {
                    session.s_Smart = "True";
                }
                else if (session.s_ServiceVOICEObj.vbsf == "VPN") {
                    session.s_VPN = "True";
                    session.s_VvpnId = session.s_ServiceVOICEObj.vvpnid;
                }
                else {
                    session.s_VPN = "False";
                    session.s_Smart = "False";
                }
            }
        }
    }
    catch (e) {
        session.s_VPN = "False";
        session.s_Smart = "False";
    }
    try {
        // Check if passn exist parameter exist
        if (session.s_PassnAccess) {
            session.s_SSAccessCard = "False";
            // Check if passn is an Array (List)
            if (session.s_PassnAccess instanceof java.util.List) {
                //Iterate through Array and check value of vbsf Array
                for (var _b = 0, _c = session.s_PassnAccess; _b < _c.length; _b++) {
                    var eachElement = _c[_b];
                    //  Check if eachElement has an value (passn Array)
                    if (eachElement) {
                        //Validate value of the vbsf Array
                        switch (eachElement) {
                            case session.s_CallingPartyNrNorm.user: {
                                session.s_SSAccessCard = "True";
                                break;
                            }
                        }
                    }
                }
                // passn is not an Arrray (List)
            }
            else {
                if (session.s_CallingPartyNrNorm.user == session.s_PassnAccess) {
                    session.s_SSAccessCard = "True";
                }
                else {
                    session.s_SSAccessCard = "False";
                }
            }
        }
        else {
            session.s_SSAccessCard = "False";
        }
    }
    catch (e) {
        session.s_SSAccessCard = "False";
    }
}
function checkvbarzone(session, event, localParams) {
    var log = session.log;
    session.s_barrcall = "false";
    try {
        // Check if vbsf parameter exist
        if (session.s_ServiceVOICEObj.vbarzone) {
            // Check if vbsf is an Array (List)
            if (session.s_ServiceVOICEObj.vbarzone instanceof java.util.List) {
                //Iterate through Array and check value of vbsf Array
                for (var _i = 0, _a = session.s_ServiceVOICEObj.vbarzone; _i < _a.length; _i++) {
                    var eachElement = _a[_i];
                    if (session.s_barrzone != null) {
                        //  Check if eachElement has an value (vbsf Array)
                        if (eachElement == session.s_barrzone) {
                            session.s_barrcall = "true";
                        }
                    }
                }
            }
        }
        else {
            session.s_barrcall = "false";
        }
    }
    catch (e) {
        session.s_barrcall = "false";
        ;
    }
}
function manipulateCalledPartyNr(session, event, localParams) {
    var log = session.log;
    var l_ReplaceValue = session.s_MSCRoamingResp.body[0].intprefix;
    try {
        session.s_CalledPartyNrNorm.user = session.s_IDP.event.callStart.contact.user.replace(l_ReplaceValue, "");
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.1.1";
    }
    catch (e) {
        session.s_CalledPartyNrNorm.user = session.s_IDP.event.callStart.contact.user.replace(l_ReplaceValue, "");
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.1.1";
    }
}
function manipulateCalledPartyNrVolte(session, event, localParams) {
    var log = session.log;
    var l_ReplaceValue = "00";
    try {
        session.s_CalledPartyNrNorm.user = session.s_IDP.event.callStart.contact.user.replace(l_ReplaceValue, "");
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.1.1";
    }
    catch (e) {
        session.s_CalledPartyNrNorm.user = session.s_IDP.event.callStart.contact.user.replace(l_ReplaceValue, "");
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.1.1";
    }
}
function manipulateCalledPartyNrNatVolte(session, event, localParams) {
    var log = session.log;
    var l_ReplaceValue = "0";
    try {
        session.s_CalledPartyNrNorm.user = "43" + session.s_IDP.event.callStart.contact.user.replace(l_ReplaceValue, "");
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.1.1";
    }
    catch (e) {
        session.s_CalledPartyNrNorm.user = "43" + session.s_IDP.event.callStart.contact.user.replace(l_ReplaceValue, "");
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.1.1";
    }
}
function manipulateCalledPartyNrSubVolte(session, event, localParams) {
    var log = session.log;
    try {
        session.s_CalledPartyNrNorm.user = session.s_IDP.event.callStart.contact.user;
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.0.1";
    }
    catch (e) {
        session.s_CalledPartyNrNorm.user = session.s_IDP.event.callStart.contact.user;
        session.s_CalledPartyNrNorm.parameters["network-context"] = "TS24008.0.1";
    }
}
function setrerouPrefix(session, event, localParams) {
    var log = session.log;
    if ((session.s_CallingPartyNrNorm.user != null) && (session.s_CallingPartyNrNorm.user === "436607987969")) {
        session.s_ReRoutingPrefix = "436600699321";
    }
}
