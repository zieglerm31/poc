"use strict";
function set_DestinationRoutingNr(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "success";
    var l_dialedNumber = session.s_IDP.event.callStart.contact.user;
    var l_dialdNetworkContext = session.s_IDP.event.callStart.contact.parameters["network-context"];
    var l_TON = l_dialdNetworkContext.split(".");
    var l_CallingPartyNrNorm = session.s_CallingPartyNrNorm.user;
    var l_mscAddress = session.s_mscAddress;
    if (session.s_homeCountryCode != session.s_CC_prefix) {
        return ret.resultCode = "CMI_Roaming";
    }
    session.s_sitRange = false;
    if ((l_CallingPartyNrNorm.match(/^393241200/)) || (l_CallingPartyNrNorm.match(/^393241300/))) {
        session.s_sitRange = true;
    }
    if (l_dialedNumber.match(/^(0(?!0)|1|3|4|5|7|8)/) && l_TON[1].match(/^(0|3)$/g)) {
        if (l_dialedNumber.match(/^456/)) {
            if (l_CallingPartyNrNorm.match(/^393241200/)) {
                session.s_DR_Nr = l_dialedNumber.replace(/^456/, "CC8890399");
            }
            else {
                session.s_DR_Nr = l_dialedNumber.replace(/^456/, "CC8890391");
            }
            return ret.resultCode = "PreAnnouncement";
        }
        else {
            if (l_dialedNumber === "3201010079") {
                if (session.s_sitRange === true) {
                    session.s_DR_Nr = "CC804393201010079";
                }
                else {
                    session.s_DR_Nr = "CC801393201010079";
                }
            }
            else {
                if (l_dialedNumber === "4010079") {
                    if (session.s_sitRange === true) {
                        session.s_DR_Nr = "CC803399079";
                    }
                    else {
                        session.s_DR_Nr = "CC803391079";
                    }
                }
                else {
                    session.s_DR_Nr = session.s_prefixToConnect + "39" + l_dialedNumber;
                }
            }
        }
    }
    else if (l_dialedNumber.match(/^00/) && l_TON[1].match(/^(0|3)$/g)) {
        if (l_dialedNumber.replace(/^00/, "") === "393201010079") {
            if (session.s_sitRange === true) {
                session.s_DR_Nr = "CC804393201010079";
            }
            else {
                session.s_DR_Nr = "CC801393201010079";
            }
        }
        else {
            session.s_DR_Nr = session.s_prefixToConnect + l_dialedNumber.replace(/^00/, "");
        }
    }
    else if (l_TON[1].match(/^(1|4)$/g)) {
        if (l_dialedNumber === "393201010079") {
            if (session.s_sitRange === true) {
                session.s_DR_Nr = "CC804393201010079";
            }
            else {
                session.s_DR_Nr = "CC801393201010079";
            }
        }
        else {
            session.s_DR_Nr = session.s_prefixToConnect + l_dialedNumber;
        }
    }
    if (session.s_CCRRoleOfNode == 2) {
        if (l_dialedNumber === "393201010087") {
            session.s_DR_Nr = "CC802" + l_dialedNumber;
        }
        else {
            session.s_DR_Nr = session.s_prefixToConnect + l_dialedNumber;
        }
    }
    return ret;
}
