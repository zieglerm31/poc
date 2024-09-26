
function validateLDAP_Subsc_resp(session: any, event: any, localParams: any): any {    /* --- Validate & stores LDAP Subscriber response --- */

    // Define default log and ret  
    let log: any = session.log;
    let ret: Responses.ResultCode = { resultCode: "Success" };

    /* enter here your code */

    // Store Subscriber LDAP response into session
    session.s_SubscriberLDAPResp = event; //whole response

    //Store the whole body
    if (session.s_SubscriberLDAPResp.body) {

        session.s_SubscriberLDAPRespBody = session.s_SubscriberLDAPResp.body; // only body, includes query data

        // Validate Arrays of the ldap response body
        for (let eachElement of session.s_SubscriberLDAPRespBody) {
            if (eachElement != null || eachElement != undefined || eachElement != "" || eachElement != " ") {
                switch (eachElement.objectClass[0]) {
                    case "PublicID": {
                        //Store for standard subscriber
                        session.s_SubPublicIDObj = eachElement;
                        break;
                    }
                    case "ServiceVOICE": {
                        //Store for all subscribers, there are 2 ServiceVOIVEobject arrays (parent & child)
                        //if the length of the dn is 6 it is the child and that is needed, if it is 5 it would be parent
                        if (eachElement.dn.split(",").length == 6) {
                            session.s_ServiceVOICEObj = eachElement;
                        }
                        break;
                    }
                    case "SmartSimService": {
                        //Store for SmartSim logic
                        session.s_SmartSimObj = eachElement;
                        session.s_SmartSimCheck = "True";
                        session.s_PssmnMain = session.s_SmartSimObj.pssmn;
                        session.s_PassnAccess = session.s_SmartSimObj.passn;
                        break;
                    }
                    case "SplitBillService": {
                        //Store for SplitBill logic
                        session.s_SplitBillObj = eachElement;
                        session.s_SplitBillCheck = "True";
                        break;
                    }
                    /*
                    default: { 
                        return ret.resultCode = "Subscriber_LDAP_issue";
                        break;              
                    }*/
                }
            }
        }

        //Determine homeCountryCode of subscriber
        //Get visd profile name of subscribe
        let l_vsid: string = session.s_ServiceVOICEObj.vsid;
        if (l_vsid) {

            if (session.ocs_Profiles[l_vsid]["homeCC"]) {

                session.s_homeCountryCode = session.ocs_Profiles[l_vsid]["homeCC"];
                session.s_prefixToConnect = session.ocs_Profiles[l_vsid]["Prefix"];

            } else {

                // If does not exist use default value 43    
                session.s_homeCountryCode = 43;
            }
            // Use default profile    
        } else {

            if (session.ocs_Profiles["default"]["homeCC"]) {

                session.s_homeCountryCode = session.ocs_Profiles[l_vsid]["homeCC"];

            } else {

                // If does not exist use default value 43    
                session.s_homeCountryCode = 43;
            }
        }
        //Fierina: read prefix from profile
        if (session.s_ServiceVOICEObj.vsid != null) {

            session.s_prefixToConnect = session.ocs_Profiles[l_vsid]["Prefix"]
        }
        return ret.resultCode = "Success";

    } else {

        return ret.resultCode = "Subscriber_LDAP_issue";

    }
}

function validate_MSCRoaming_resp(session: any, event: any, localParams: any): any {
    /* --- Validate & stores LDAP MSCRoaming response --- */

    // Define default log and ret  
    let log: any = session.log;
    let ret: Responses.ResultCode = { resultCode: "Success" };

    /* enter here your code */

    // Store MSCRoaming LDAP response into session
    session.s_MSCRoamingResp = event; //whole response

    //Store the whole body
    try {
        if (session.s_MSCRoamingResp.body) {

            session.s_MSCRoamingRespBody = session.s_MSCRoamingResp.body; // only body, includes query data
            session.s_Norm_prefix = session.s_MSCRoamingRespBody[0].CountryCode;
            session.s_ReRoutingPrefix = session.s_MSCRoamingRespBody[0].reroutingprefix;
            session.s_volteRule1 = session.s_MSCRoamingRespBody[0].volterule1;
            session.s_volteRule2 = session.s_MSCRoamingRespBody[0].volterule2;



            return ret.resultCode = "Success";

        } else {

            return ret.resultCode = "MSCRoaming_LDAP_issue";

        }
    } catch (e) {

        return ret.resultCode = "MSCRoaming_LDAP_issue";

    }
}

function validate_SingleDB_resp(session: any, event: any, localParams: any): any {
    /* --- Validate & stores LDAP MSCRoaming response --- */

    // Define default log and ret  
    let log: any = session.log;
    let ret: Responses.ResultCode = { resultCode: "Success" };

    /* enter here your code */

    // Store SingleDB LDAP response into session
    session.s_SingleDBresp = event; //whole response

    //Store the whole body
    try {
        if (session.s_SingleDBresp.body) {

            session.s_SingleDBrespBody = session.s_SingleDBresp.body; // only body, includes query data

            if ((session.s_SingleDBrespBody[0] != null) && (session.s_SingleDBrespBody[0].sdbBarringZone != null)) {

                session.s_barrzone = session.s_SingleDBrespBody[0].sdbBarringZone;

            }

            if ((session.s_SingleDBrespBody[0] != null) && (session.s_SingleDBrespBody[0].sdbBlockInRoaming != null)) {

                session.s_blockint = session.s_SingleDBrespBody[0].sdbBlockInRoaming;

            }
            if ((session.s_SingleDBrespBody[0] != null) && (session.s_SingleDBrespBody[0].sdbFps != null)) {

                session.s_sdbfps = session.s_SingleDBrespBody[0].sdbFps;

            }

            return ret.resultCode = "Success";

        } else {

            return ret.resultCode = "SingleDB_LDAP_issue";

        }
    } catch (e) {

        return ret.resultCode = "SingleDB_LDAP_issue";

    }
}
