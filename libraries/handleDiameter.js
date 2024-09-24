"use strict";
function validateCCA(session, event, localParams) {
    var ret;
    var log = session.log;
    ret = ret || {};
    ret.resultCode = "Success";
    session.s_CCA = event;
    if (session.s_CCA.diameter.keys["Result-Code"][0].value == 2001) {
        for (var _i = 0, _a = session.s_CCA.diameter.avps; _i < _a.length; _i++) {
            var eachElement = _a[_i];
            if (eachElement != null || eachElement != undefined || eachElement != "" || eachElement != " ") {
                switch (eachElement.name) {
                    case "CC-Request-Number": {
                        session.s_CC_Request_Number_A = eachElement;
                        if (session.s_CC_Request_Number_A.value == 0) {
                            session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;
                        }
                        else {
                            if (session.s_CC_Request_Number_A.value == session.s_CC_Request_Number_A_plus_1) {
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;
                            }
                            else {
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A_plus_1.value + 1;
                                return ret.resultCode = "DiameterError." + "Wrong_CCA_Req_Number_received";
                            }
                        }
                        break;
                    }
                    case "Multiple-Services-Credit-Control": {
                        session.s_Multiple_Services_Credit_Control_A = eachElement;
                        session.s_CC_Time_sec_A = session.s_Multiple_Services_Credit_Control_A.value[0].value[0].value;
                        break;
                    }
                    case "CC-Request-Type": {
                        session.s_CC_Request_Type_A = eachElement;
                        break;
                    }
                }
            }
        }
        return ret.resultCode = "DiameterSuccess." + session.s_CCA.diameter.keys["Result-Code"][0].value;
    }
    else {
        for (var _b = 0, _c = session.s_CCA.diameter.avps; _b < _c.length; _b++) {
            var eachElement = _c[_b];
            if (eachElement != null || eachElement != undefined || eachElement != "" || eachElement != " ") {
                switch (eachElement.name) {
                    case "CC-Request-Number": {
                        session.s_CC_Request_Number_A = eachElement;
                        if (session.s_CC_Request_Number_A.value == 0) {
                            session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;
                        }
                        else {
                            if (session.s_CC_Request_Number_A.value == session.s_CC_Request_Number_A_plus_1) {
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;
                            }
                            else {
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A_plus_1.value + 1;
                                return ret.resultCode = "DiameterError." + "Wrong_CCA_Req_Number_received";
                            }
                        }
                        break;
                    }
                    case "CC-Request-Type": {
                        session.s_CC_Request_Type_A = eachElement;
                        break;
                    }
                }
            }
        }
        return ret.resultCode = "DiameterError." + session.s_CCA.diameter.keys["Result-Code"][0].value;
    }
}
