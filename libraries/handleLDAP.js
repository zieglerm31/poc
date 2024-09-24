"use strict";
;
function validateLDAP_Subsc_resp(session, event, localParams) {
    var log = session.log;
    var ret = { resultCode: "Success" };
    session.s_SubscriberLDAPResp = event;
    if (session.s_SubscriberLDAPResp.body) {
        session.s_SubscriberLDAPRespBody = session.s_SubscriberLDAPResp.body;
        for (var _i = 0, _a = session.s_SubscriberLDAPRespBody; _i < _a.length; _i++) {
            var eachElement = _a[_i];
            if (eachElement != null || eachElement != undefined || eachElement != "" || eachElement != " ") {
                switch (eachElement.objectClass[0]) {
                    case "PublicID": {
                        session.s_SubPublicIDObj = eachElement;
                        break;
                    }
                    case "ServiceVOICE": {
                        if (eachElement.dn.split(",").length == 6) {
                            session.s_ServiceVOICEObj = eachElement;
                        }
                        break;
                    }
                    case "SmartSimService": {
                        session.s_SmartSimObj = eachElement;
                        session.s_SmartSimCheck = "True";
                        session.s_PssmnMain = session.s_SmartSimObj.pssmn;
                        session.s_PassnAccess = session.s_SmartSimObj.passn;
                        break;
                    }
                    case "SplitBillService": {
                        session.s_SplitBillObj = eachElement;
                        session.s_SplitBillCheck = "True";
                        break;
                    }
                }
            }
        }
        var l_vsid = session.s_ServiceVOICEObj.vsid;
        if (l_vsid) {
            if (session.ocs_Profiles[l_vsid]["homeCC"]) {
                session.s_homeCountryCode = session.ocs_Profiles[l_vsid]["homeCC"];
                session.s_prefixToConnect = session.ocs_Profiles[l_vsid]["Prefix"];
            }
            else {
                session.s_homeCountryCode = 43;
            }
        }
        else {
            if (session.ocs_Profiles["default"]["homeCC"]) {
                session.s_homeCountryCode = session.ocs_Profiles[l_vsid]["homeCC"];
            }
            else {
                session.s_homeCountryCode = 43;
            }
        }
        if (session.s_ServiceVOICEObj.vsid != null) {
            session.s_prefixToConnect = session.ocs_Profiles[l_vsid]["Prefix"];
        }
        return ret.resultCode = "Success";
    }
    else {
        return ret.resultCode = "Subscriber_LDAP_issue";
    }
}
function validate_MSCRoaming_resp(session, event, localParams) {
    var log = session.log;
    var ret = { resultCode: "Success" };
    session.s_MSCRoamingResp = event;
    try {
        if (session.s_MSCRoamingResp.body) {
            session.s_MSCRoamingRespBody = session.s_MSCRoamingResp.body;
            session.s_Norm_prefix = session.s_MSCRoamingRespBody[0].CountryCode;
            session.s_ReRoutingPrefix = session.s_MSCRoamingRespBody[0].reroutingprefix;
            session.s_volteRule1 = session.s_MSCRoamingRespBody[0].volterule1;
            session.s_volteRule2 = session.s_MSCRoamingRespBody[0].volterule2;
            return ret.resultCode = "Success";
        }
        else {
            return ret.resultCode = "MSCRoaming_LDAP_issue";
        }
    }
    catch (e) {
        return ret.resultCode = "MSCRoaming_LDAP_issue";
    }
}
function validate_SingleDB_resp(session, event, localParams) {
    var log = session.log;
    var ret = { resultCode: "Success" };
    session.s_SingleDBresp = event;
    try {
        if (session.s_SingleDBresp.body) {
            session.s_SingleDBrespBody = session.s_SingleDBresp.body;
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
        }
        else {
            return ret.resultCode = "SingleDB_LDAP_issue";
        }
    }
    catch (e) {
        return ret.resultCode = "SingleDB_LDAP_issue";
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxDQUFDO0FBQUEsU0FBUyx1QkFBdUIsQ0FBQyxPQUFZLEVBQUUsS0FBVSxFQUFFLFdBQWdCO0lBR3hFLElBQUksR0FBRyxHQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDM0IsSUFBSSxHQUFHLEdBQXlCLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBSzFELE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFHckMsSUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFO1FBRW5DLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1FBR3JFLEtBQXdCLFVBQWdDLEVBQWhDLEtBQUEsT0FBTyxDQUFDLHdCQUF3QixFQUFoQyxjQUFnQyxFQUFoQyxJQUFnQyxFQUFFO1lBQXJELElBQUksV0FBVyxTQUFBO1lBQ2hCLElBQUksV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxJQUFJLFdBQVcsSUFBSSxFQUFFLElBQUksV0FBVyxJQUFJLEdBQUcsRUFBRTtnQkFDNUYsUUFBUSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNoQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO3dCQUViLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7d0JBQ3ZDLE1BQU07cUJBQ1Q7b0JBQ0QsS0FBSyxjQUFjLENBQUMsQ0FBQzt3QkFHakIsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFOzRCQUN2QyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO3lCQUMzQzt3QkFDRCxNQUFNO3FCQUNUO29CQUNELEtBQUssaUJBQWlCLENBQUMsQ0FBQzt3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Q0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUUzRixPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7YUFFM0Q7WUFFRCxPQUFPLEdBQUcsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1NBRXJDO2FBQU07WUFFSCxPQUFPLEdBQUcsQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUM7U0FFakQ7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBRVIsT0FBTyxHQUFHLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDO0tBRWpEO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vTUFJTkJMT0NLXG47ZnVuY3Rpb24gdmFsaWRhdGVMREFQX1N1YnNjX3Jlc3Aoc2Vzc2lvbjogYW55LCBldmVudDogYW55LCBsb2NhbFBhcmFtczogYW55KTogYW55IHsgICAgLyogLS0tIFZhbGlkYXRlICYgc3RvcmVzIExEQVAgU3Vic2NyaWJlciByZXNwb25zZSAtLS0gKi9cblxuICAgIC8vIERlZmluZSBkZWZhdWx0IGxvZyBhbmQgcmV0ICBcbiAgICBsZXQgbG9nOiBhbnkgPSBzZXNzaW9uLmxvZztcbiAgICBsZXQgcmV0OiBSZXNwb25zZXMuUmVzdWx0Q29kZSA9IHsgcmVzdWx0Q29kZTogXCJTdWNjZXNzXCIgfTtcblxuICAgIC8qIGVudGVyIGhlcmUgeW91ciBjb2RlICovXG5cbiAgICAvLyBTdG9yZSBTdWJzY3JpYmVyIExEQVAgcmVzcG9uc2UgaW50byBzZXNzaW9uXG4gICAgc2Vzc2lvbi5zX1N1YnNjcmliZXJMREFQUmVzcCA9IGV2ZW50OyAvL3dob2xlIHJlc3BvbnNlXG5cbiAgICAvL1N0b3JlIHRoZSB3aG9sZSBib2R5XG4gICAgaWYgKHNlc3Npb24uc19TdWJzY3JpYmVyTERBUFJlc3AuYm9keSkge1xuXG4gICAgICAgIHNlc3Npb24uc19TdWJzY3JpYmVyTERBUFJlc3BCb2R5ID0gc2Vzc2lvbi5zX1N1YnNjcmliZXJMREFQUmVzcC5ib2R5OyAvLyBvbmx5IGJvZHksIGluY2x1ZGVzIHF1ZXJ5IGRhdGFcblxuICAgICAgICAvLyBWYWxpZGF0ZSBBcnJheXMgb2YgdGhlIGxkYXAgcmVzcG9uc2UgYm9keVxuICAgICAgICBmb3IgKGxldCBlYWNoRWxlbWVudCBvZiBzZXNzaW9uLnNfU3Vic2NyaWJlckxEQVBSZXNwQm9keSkge1xuICAgICAgICAgICAgaWYgKGVhY2hFbGVtZW50ICE9IG51bGwgfHwgZWFjaEVsZW1lbnQgIT0gdW5kZWZpbmVkIHx8IGVhY2hFbGVtZW50ICE9IFwiXCIgfHwgZWFjaEVsZW1lbnQgIT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGVhY2hFbGVtZW50Lm9iamVjdENsYXNzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQdWJsaWNJRFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIGZvciBzdGFuZGFyZCBzdWJzY3JpYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnNfU3ViUHVibGljSURPYmogPSBlYWNoRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTZXJ2aWNlVk9JQ0VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TdG9yZSBmb3IgYWxsIHN1YnNjcmliZXJzLCB0aGVyZSBhcmUgMiBTZXJ2aWNlVk9JVkVvYmplY3QgYXJyYXlzIChwYXJlbnQgJiBjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIGxlbmd0aCBvZiB0aGUgZG4gaXMgNiBpdCBpcyB0aGUgY2hpbGQgYW5kIHRoYXQgaXMgbmVlZGVkLCBpZiBpdCBpcyA1IGl0IHdvdWxkIGJlIHBhcmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVhY2hFbGVtZW50LmRuLnNwbGl0KFwiLFwiKS5sZW5ndGggPT0gNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uc19TZXJ2aWNlVk9JQ0VPYmogPSBlYWNoRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTbWFydFNpbVNlcnZpY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9TdG9yZSBmb3IgU21hcnRTaW0gbG9naWNcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uc19TbWFydFNpbU9iaiA9IGVhY2hFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5zX1NtYXJ0U2ltQ2hlY2sgPSBcIlRydWVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uc19Qc3Ntbk1haW4gPSBzZXNzaW9uLnNfU21hcnRTaW1PYmoucHNzbW47XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnNfUGFzc25BY2Nlc3MgPSBzZXNzaW9uLnNfU21hcnRTaW1PYmoucGFzc247XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiU3BsaXRCaWxsU2VydmljZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1N0b3JlIGZvciBTcGxpdEJpbGwgbG9naWNcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uc19TcGxpdEJpbGxPYmogPSBlYWNoRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uc19TcGxpdEJpbGxDaGVjayA9IFwiVHJ1ZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQucmVzdWx0Q29kZSA9IFwiU3Vic2NyaWJlcl9MREFQX2lzc3VlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0RldGVybWluZSBob21lQ291bnRyeUNvZGUgb2Ygc3Vic2NyaWJlclxuICAgICAgICAvL0dldCB2aXNkIHByb2ZpbGUgbmFtZSBvZiBzdWJzY3JpYmVcbiAgICAgICAgbGV0IGxfdnNpZDogc3RyaW5nID0gc2Vzc2lvbi5zX1NlcnZpY2VWT0lDRU9iai52c2lkO1xuICAgICAgICBpZiAobF92c2lkKSB7XG5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLm9jc19Qcm9maWxlc1tsX3ZzaWRdW1wiaG9tZUNDXCJdKSB7XG5cbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNfaG9tZUNvdW50cnlDb2RlID0gc2Vzc2lvbi5vY3NfUHJvZmlsZXNbbF92c2lkXVtcImhvbWVDQ1wiXTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNfcHJlZml4VG9Db25uZWN0ID0gc2Vzc2lvbi5vY3NfUHJvZmlsZXNbbF92c2lkXVtcIlByZWZpeFwiXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIElmIGRvZXMgbm90IGV4aXN0IHVzZSBkZWZhdWx0IHZhbHVlIDQzICAgIFxuICAgICAgICAgICAgICAgIHNlc3Npb24uc19ob21lQ291bnRyeUNvZGUgPSA0MztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVzZSBkZWZhdWx0IHByb2ZpbGUgICAgXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uLm9jc19Qcm9maWxlc1tcImRlZmF1bHRcIl1bXCJob21lQ0NcIl0pIHtcblxuICAgICAgICAgICAgICAgIHNlc3Npb24uc19ob21lQ291bnRyeUNvZGUgPSBzZXNzaW9uLm9jc19Qcm9maWxlc1tsX3ZzaWRdW1wiaG9tZUNDXCJdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgZG9lcyBub3QgZXhpc3QgdXNlIGRlZmF1bHQgdmFsdWUgNDMgICAgXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5zX2hvbWVDb3VudHJ5Q29kZSA9IDQzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vRmllcmluYTogcmVhZCBwcmVmaXggZnJvbSBwcm9maWxlXG4gICAgICAgIGlmIChzZXNzaW9uLnNfU2VydmljZVZPSUNFT2JqLnZzaWQgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICBzZXNzaW9uLnNfcHJlZml4VG9Db25uZWN0ID0gc2Vzc2lvbi5vY3NfUHJvZmlsZXNbbF92c2lkXVtcIlByZWZpeFwiXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQucmVzdWx0Q29kZSA9IFwiU3VjY2Vzc1wiO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gcmV0LnJlc3VsdENvZGUgPSBcIlN1YnNjcmliZXJfTERBUF9pc3N1ZVwiO1xuXG4gICAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZV9NU0NSb2FtaW5nX3Jlc3Aoc2Vzc2lvbjogYW55LCBldmVudDogYW55LCBsb2NhbFBhcmFtczogYW55KTogYW55IHtcbiAgICAvKiAtLS0gVmFsaWRhdGUgJiBzdG9yZXMgTERBUCBNU0NSb2FtaW5nIHJlc3BvbnNlIC0tLSAqL1xuXG4gICAgLy8gRGVmaW5lIGRlZmF1bHQgbG9nIGFuZCByZXQgIFxuICAgIGxldCBsb2c6IGFueSA9IHNlc3Npb24ubG9nO1xuICAgIGxldCByZXQ6IFJlc3BvbnNlcy5SZXN1bHRDb2RlID0geyByZXN1bHRDb2RlOiBcIlN1Y2Nlc3NcIiB9O1xuXG4gICAgLyogZW50ZXIgaGVyZSB5b3VyIGNvZGUgKi9cblxuICAgIC8vIFN0b3JlIE1TQ1JvYW1pbmcgTERBUCByZXNwb25zZSBpbnRvIHNlc3Npb25cbiAgICBzZXNzaW9uLnNfTVNDUm9hbWluZ1Jlc3AgPSBldmVudDsgLy93aG9sZSByZXNwb25zZVxuXG4gICAgLy9TdG9yZSB0aGUgd2hvbGUgYm9keVxuICAgIHRyeSB7XG4gICAgICAgIGlmIChzZXNzaW9uLnNfTVNDUm9hbWluZ1Jlc3AuYm9keSkge1xuXG4gICAgICAgICAgICBzZXNzaW9uLnNfTVNDUm9hbWluZ1Jlc3BCb2R5ID0gc2Vzc2lvbi5zX01TQ1JvYW1pbmdSZXNwLmJvZHk7IC8vIG9ubHkgYm9keSwgaW5jbHVkZXMgcXVlcnkgZGF0YVxuICAgICAgICAgICAgc2Vzc2lvbi5zX05vcm1fcHJlZml4ID0gc2Vzc2lvbi5zX01TQ1JvYW1pbmdSZXNwQm9keVswXS5Db3VudHJ5Q29kZTtcbiAgICAgICAgICAgIHNlc3Npb24uc19SZVJvdXRpbmdQcmVmaXggPSBzZXNzaW9uLnNfTVNDUm9hbWluZ1Jlc3BCb2R5WzBdLnJlcm91dGluZ3ByZWZpeDtcbiAgICAgICAgICAgIHNlc3Npb24uc192b2x0ZVJ1bGUxID0gc2Vzc2lvbi5zX01TQ1JvYW1pbmdSZXNwQm9keVswXS52b2x0ZXJ1bGUxO1xuICAgICAgICAgICAgc2Vzc2lvbi5zX3ZvbHRlUnVsZTIgPSBzZXNzaW9uLnNfTVNDUm9hbWluZ1Jlc3BCb2R5WzBdLnZvbHRlcnVsZTI7XG5cblxuXG4gICAgICAgICAgICByZXR1cm4gcmV0LnJlc3VsdENvZGUgPSBcIlN1Y2Nlc3NcIjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gcmV0LnJlc3VsdENvZGUgPSBcIk1TQ1JvYW1pbmdfTERBUF9pc3N1ZVwiO1xuXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIHJldC5yZXN1bHRDb2RlID0gXCJNU0NSb2FtaW5nX0xEQVBfaXNzdWVcIjtcblxuICAgIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVfU2luZ2xlREJfcmVzcChzZXNzaW9uOiBhbnksIGV2ZW50OiBhbnksIGxvY2FsUGFyYW1zOiBhbnkpOiBhbnkge1xuICAgIC8qIC0tLSBWYWxpZGF0ZSAmIHN0b3JlcyBMREFQIE1TQ1JvYW1pbmcgcmVzcG9uc2UgLS0tICovXG5cbiAgICAvLyBEZWZpbmUgZGVmYXVsdCBsb2cgYW5kIHJldCAgXG4gICAgbGV0IGxvZzogYW55ID0gc2Vzc2lvbi5sb2c7XG4gICAgbGV0IHJldDogUmVzcG9uc2VzLlJlc3VsdENvZGUgPSB7IHJlc3VsdENvZGU6IFwiU3VjY2Vzc1wiIH07XG5cbiAgICAvKiBlbnRlciBoZXJlIHlvdXIgY29kZSAqL1xuXG4gICAgLy8gU3RvcmUgU2luZ2xlREIgTERBUCByZXNwb25zZSBpbnRvIHNlc3Npb25cbiAgICBzZXNzaW9uLnNfU2luZ2xlREJyZXNwID0gZXZlbnQ7IC8vd2hvbGUgcmVzcG9uc2VcblxuICAgIC8vU3RvcmUgdGhlIHdob2xlIGJvZHlcbiAgICB0cnkge1xuICAgICAgICBpZiAoc2Vzc2lvbi5zX1NpbmdsZURCcmVzcC5ib2R5KSB7XG5cbiAgICAgICAgICAgIHNlc3Npb24uc19TaW5nbGVEQnJlc3BCb2R5ID0gc2Vzc2lvbi5zX1NpbmdsZURCcmVzcC5ib2R5OyAvLyBvbmx5IGJvZHksIGluY2x1ZGVzIHF1ZXJ5IGRhdGFcblxuICAgICAgICAgICAgaWYgKChzZXNzaW9uLnNfU2luZ2xlREJyZXNwQm9keVswXSAhPSBudWxsKSAmJiAoc2Vzc2lvbi5zX1NpbmdsZURCcmVzcEJvZHlbMF0uc2RiQmFycmluZ1pvbmUgIT0gbnVsbCkpIHtcblxuICAgICAgICAgICAgICAgIHNlc3Npb24uc19iYXJyem9uZSA9IHNlc3Npb24uc19TaW5nbGVEQnJlc3BCb2R5WzBdLnNkYkJhcnJpbmdab25lO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgoc2Vzc2lvbi5zX1NpbmdsZURCcmVzcEJvZHlbMF0gIT0gbnVsbCkgJiYgKHNlc3Npb24uc19TaW5nbGVEQnJlc3BCb2R5WzBdLnNkYkJsb2NrSW5Sb2FtaW5nICE9IG51bGwpKSB7XG5cbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNfYmxvY2tpbnQgPSBzZXNzaW9uLnNfU2luZ2xlREJyZXNwQm9keVswXS5zZGJCbG9ja0luUm9hbWluZztcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChzZXNzaW9uLnNfU2luZ2xlREJyZXNwQm9keVswXSAhPSBudWxsKSAmJiAoc2Vzc2lvbi5zX1NpbmdsZURCcmVzcEJvZHlbMF0uc2RiRnBzICE9IG51bGwpKSB7XG5cbiAgICAgICAgICAgICAgICBzZXNzaW9uLnNfc2RiZnBzID0gc2Vzc2lvbi5zX1NpbmdsZURCcmVzcEJvZHlbMF0uc2RiRnBzO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXQucmVzdWx0Q29kZSA9IFwiU3VjY2Vzc1wiO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiByZXQucmVzdWx0Q29kZSA9IFwiU2luZ2xlREJfTERBUF9pc3N1ZVwiO1xuXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIHJldC5yZXN1bHRDb2RlID0gXCJTaW5nbGVEQl9MREFQX2lzc3VlXCI7XG5cbiAgICB9XG59XG4iXX0=