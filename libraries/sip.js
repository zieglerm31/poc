var Capabilities;
(function (Capabilities) {
    Capabilities["REL1XX"] = "REL1XX";
    Capabilities["FORKING"] = "FORKING";
    Capabilities["PRECONDITION"] = "PRECONDITION";
    Capabilities["PEM"] = "PEM";
    Capabilities["UPDATE"] = "UPDATE";
})(Capabilities || (Capabilities = {}));
var Annotype;
(function (Annotype) {
    Annotype["CONNECT"] = "CONNECT";
    Annotype["RINGING"] = "RING";
})(Annotype || (Annotype = {}));
var CallPollActionType;
(function (CallPollActionType) {
    CallPollActionType["Accept"] = "accept";
    CallPollActionType["Forward"] = "forward";
    CallPollActionType["Reject"] = "reject";
})(CallPollActionType || (CallPollActionType = {}));
var CallStartActionType;
(function (CallStartActionType) {
    CallStartActionType[CallStartActionType["Abort"] = 0] = "Abort";
    CallStartActionType[CallStartActionType["Forward"] = 1] = "Forward";
    CallStartActionType[CallStartActionType["RejectMrf"] = 2] = "RejectMrf";
})(CallStartActionType || (CallStartActionType = {}));
var MediaOperationActionType;
(function (MediaOperationActionType) {
    MediaOperationActionType["PerformMediaOperation"] = "performMediaOperation";
})(MediaOperationActionType || (MediaOperationActionType = {}));
var MediaOperationContentType;
(function (MediaOperationContentType) {
    MediaOperationContentType["MSML"] = "application/msml+xml";
})(MediaOperationContentType || (MediaOperationContentType = {}));
/* this is the entry point */
function setPreconditionForwadCall(session, event, localParams) {
    var ret;
    ret = ret || {};
    ret.resultCode = "success";
    var status2;
    var events;
    events = events || {};
    events.InfoPollEvent = "null";
    events.SuccessResponsePollEvent = "null";
    events.SIPRingingPollEvent = "null";
    events.RawContentPollEvent = "test/test";
    //Set headers for outgoing message
    var headerVars;
    headerVars = headerVars || {};
    headerVars.disableSendDefaultReason = "Disabled";
    headerVars.disableSendNoAnswerReason = "Disabled";
    //headerVars.newContact = session.contactList;
    //headerVars.privateServiceMode = "proxy";
    //headerVars.pani = session.s_CamelInfo.vlrAddress + ";CS";
    //headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=23210e6104070";
    try {
        // Add HF for SNF routing (ocsnfconf show policy), is deleted 
        headerVars.xVtasRoute = "irsRoute";
        // Add HF X-VTaS_IRS HF including callInformation
        headerVars.xVtasIRS = "irs;roampartnername=\"" + session.s_CamelInfo.RoamingNetwork + "\";roamccndc=" + session.s_CamelInfo.CCNDC + ";roammccmnc=" + session.s_CamelInfo.MCCMNC + ";reroutingnumber=" + session.s_RequestURI.address.uri.number;
        if (session.s_CamelInfo.cgID.match(/^cgid:/)) {
            headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=" + session.s_CamelInfo.cgID.replace("cgid:", "") + ";CS";
        }
        else {
            headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=" + session.s_CamelInfo.MCCMNC + ";CS";
        }
    }
    catch (e) {
        headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=" + session.s_CamelInfo.MCCMNC + ";CS";
    }
    //headerVars.psu = session.s_InitialInvite.SIP["P-Asserted-Identity"][0].value;
    headerVars.psu = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">";
    headerVars.newPai = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">";
    if (session.s_CamelInfo.Presentation == 0) {
        headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
    }
    else {
        headerVars.newFrom = "\"Anonymous\" <sip:anonymous@anonymous.invalid>;tag=" + session.s_InitialInvite.SIP["From"].tag;
    }
    if ((session.s_from.match(/^[a-zA-Z]/)) != null) {
        session.s_from = "anonymous";
    }
    if ((session.s_CamelInfo.Presentation == 0) && (session.s_pai != null) && (session.s_from != null) && (session.s_privacy != null)) {
        if ((session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_privacy === "none")) {
            headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
        }
        else {
            if ((session.s_privacy !== "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !== "anonymous")) {
                session.writecdr = 1;
                headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
            }
            else {
                if ((session.s_privacy === "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !== session.s_pai)) {
                    session.writecdr = 1;
                    headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
                }
                else {
                    if ((session.s_privacy !== "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from === "anonymous")) {
                        session.writecdr = 1;
                    }
                    else {
                        if ((session.s_pai != session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_privacy === "none")) {
                            headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
                            session.writecdr = 1;
                        }
                    }
                }
            }
        }
    }
    else {
        if ((session.s_CamelInfo.Presentation == 0) && (session.s_pai != null) && (session.s_from != null) && (session.s_privacy == null)) {
            if (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) {
                headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
            }
            else {
                if ((session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !== session.s_pai)) {
                    session.writecdr = 1;
                    headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
                }
                else {
                    if (session.s_pai != session.s_CamelInfo.callingPartyNorm.substr(1)) {
                        headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
                        session.writecdr = 1;
                    }
                }
            }
        }
        else {
            if ((session.s_CamelInfo.Presentation == 0) && (session.s_pai == null) && (session.s_from != null) && (session.s_privacy == null)) {
                headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
                session.writecdr = 1;
            }
        }
    }
    if ((session.s_CamelInfo.Presentation == 1) && (session.s_pai != null) && (session.s_from != null) && (session.s_privacy != null)) {
        if ((session.s_privacy !== "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from === "anonymous")) {
            headerVars.newFrom = "\"Anonymous\" <sip:anonymous@anonymous.invalid>;tag=" + session.s_InitialInvite.SIP["From"].tag;
        }
        else {
            if ((session.s_privacy === "none") && (session.s_pai != session.s_from) && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1))) {
                session.writecdr = 1;
            }
            else {
                if ((session.s_privacy !== "none") && (session.s_pai == session.s_from) && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !== "anonymous")) {
                    session.writecdr = 1;
                }
                else {
                    if ((session.s_pai != session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from === "anonymous")) {
                        headerVars.newFrom = "\"Anonymous\" <sip:anonymous@anonymous.invalid>;tag=" + session.s_InitialInvite.SIP["From"].tag;
                        session.writecdr = 1;
                    }
                }
            }
        }
    }
    var capabilities = session.inCapabilities;
    if (capabilities != null) {
        capabilities.push(Capabilities.PEM);
        capabilities.push(Capabilities.FORKING);
        session.outCapabilities = JSON.stringify(capabilities);
    }
    session.events = JSON.stringify(events);
    session.headerrulevar = JSON.stringify(headerVars);
    session.headerrulesselect = "SipServiceSpecificRulesSet";
    return ret;
}
function buildVTAS_HF(vtasServiceName, startSign, endSign, assignSign, seperatorSign, abbrevations) {
    // Build the VTAS HF for the service e.g.:
    //Example: 
    // X-VTAS-RSI: rsi;cdn=4312703774;uri=sip:+4312703774@id1522.imsnetwork.at;sdba=ActKey=FIX|GEO_OTHER|G20,app=sdbAction,dc=apd;a=1021;m=B
    // For details check chapter 2.2 of vTAS ICS Routing Services vRSI documentation
    var sessionValues = [];
    for (var _i = 6; _i < arguments.length; _i++) {
        sessionValues[_i - 6] = arguments[_i];
    }
    // Moved to function input abbrevations!
    //let l_Abbreviation : string[] = ["ANr","DNn","URI","SA","A","M"];
    // incrementer to access the right l_Abbreviation for the sessionValues
    var i = 0;
    var l_HF_Info = ";";
    // Length of sessionValues has to be equal length of l_Abbreviation otherwise inconsistency of VTAS_HF
    if (sessionValues.length == abbrevations.length) {
        for (var _a = 0, sessionValues_1 = sessionValues; _a < sessionValues_1.length; _a++) {
            var sessionElement = sessionValues_1[_a];
            l_HF_Info = l_HF_Info + startSign + abbrevations[i] + assignSign + "\"" + sessionElement + "\"" + endSign + seperatorSign;
            i++;
        }
        // Remove last seperator sign at the End of the HF
        return vtasServiceName + l_HF_Info.replace(/;$/, "");
    }
    else {
        return "Inconsistency between amount of abbrevations and sessionValues";
    }
}
