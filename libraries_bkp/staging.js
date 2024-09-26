"use strict";
function formatDate(date) {
    var ret = date.getFullYear().toString() + ("00" + (date.getMonth() + 1).toString()).slice(-2) + ("00" + (date.getDate()).toString()).slice(-2);
    return ret;
}
function formatTime(date) {
    var ret = ("00" + date.getHours().toString()).slice(-2) + ("00" + date.getMinutes().toString()).slice(-2) + ("00" + date.getSeconds().toString()).slice(-2);
    return ret;
}
function prettytrace(session, event, localParams) {
    var log = session.log;
    var now = new Date();
    var logDate = formatDate(now);
    var logTime = formatTime(now);
    try {
        if (session["fsm-trace-level"] > 0) {
            if (event["event-additional-info"] != null) {
                session["trace-skey"] = event["event-additional-info"]["tracingid"];
                session["trace-type"] = logDate + "-" + logTime + "_" + event["event-additional-info"]["tracingmsg"];
            }
            else {
                session["trace-type"] = logDate + "-" + logTime + "_MissingStagingInfo";
            }
            if (session["trace-type"] == "random") {
                session["fsm-trace-level"] = 2;
            }
            else {
                session["fsm-trace-level"] = 2;
            }
        }
    }
    catch (e) {
        log.error("get_checkHF:Error adding trace details: {}", e);
    }
}
function saveevent(session, event, localParams) {
    session.s_savedevent = event;
    var now = new Date();
    var logDate = formatDate(now);
    var logTime = formatTime(now);
    try {
        if (session["fsm-trace-level"] > 0) {
            if (event["event-additional-info"] != null) {
                session["trace-skey"] = event["event-additional-info"]["tracingid"];
                session["trace-type"] = logDate + "-" + logTime + "_" + event["event-additional-info"]["tracingmsg"];
            }
            else {
                session["trace-type"] = logDate + "-" + logTime + "_MissingStagingInfo";
            }
            if (session["trace-type"] == "random") {
                session["fsm-trace-level"] = 2;
            }
            else {
                session["fsm-trace-level"] = 2;
            }
        }
    }
    catch (e) {
        log.error("get_checkHF:Error adding trace details: {}", e);
    }
}
;
;
var HashMap = Java.type("java.util.HashMap");
function trace_details(event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    var ret = new HashMap();
    var listName = "h3irs_staging";
    var traceFieldValue = event.name !== null ? event.name : "na";
    var ttl = 10000;
    var tracetype = "stagingtype";
    var traceField = "stagingfield";
    var searchType = "suffix";
    var initialeventflag = false;
    try {
        if (event["event-type"] !== null && (event["event-type"] === "sip" || event["event-type"] === "occp")) {
            if (event["event-name"] !== null && event["event-name"] === "sip.callStart.NONE") {
                try {
                    if ((_a = event["SIP"]) === null || _a === void 0 ? void 0 : _a["P-Asserted-Identity"]) {
                        if ((_d = (_c = (_b = event["SIP"]) === null || _b === void 0 ? void 0 : _b["P-Asserted-Identity"]) === null || _c === void 0 ? void 0 : _c["address"]) === null || _d === void 0 ? void 0 : _d["uri"]) {
                            if ((_h = (_g = (_f = (_e = event["SIP"]) === null || _e === void 0 ? void 0 : _e["P-Asserted-Identity"]) === null || _f === void 0 ? void 0 : _f["address"]) === null || _g === void 0 ? void 0 : _g["uri"]) === null || _h === void 0 ? void 0 : _h["user"]) {
                                traceFieldValue = event["SIP"]["P-Asserted-Identity"]["address"]["uri"]["user"];
                                tracetype = "IRSbyPAINumber";
                                if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                    listName = "h3irs_staging_prefix";
                                    searchType = "prefix";
                                    tracetype = "IRSbyPAINumber_pre";
                                }
                                traceFieldValue = traceFieldValue.replace("\+", "");
                                initialeventflag = true;
                            }
                            else {
                                traceFieldValue = event["SIP"]["P-Asserted-Identity"]["address"]["uri"]["number"];
                                tracetype = "IRSbyPAIUser";
                                if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                    listName = "h3irs_staging_prefix";
                                    searchType = "prefix";
                                    tracetype = "IRSbyPAIUser_pre";
                                }
                                traceFieldValue = traceFieldValue.replace("\+", "");
                                initialeventflag = true;
                            }
                        }
                        else {
                            if ((_m = (_l = (_k = (_j = event["SIP"]) === null || _j === void 0 ? void 0 : _j["P-Asserted-Identity"]) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l["address"]) === null || _m === void 0 ? void 0 : _m["uri"]) {
                                if ((_s = (_r = (_q = (_p = (_o = event["SIP"]) === null || _o === void 0 ? void 0 : _o["P-Asserted-Identity"]) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q["address"]) === null || _r === void 0 ? void 0 : _r["uri"]) === null || _s === void 0 ? void 0 : _s["user"]) {
                                    traceFieldValue = event["SIP"]["P-Asserted-Identity"][0]["address"]["uri"]["user"];
                                    tracetype = "IRSbyPAINumber";
                                    if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                        listName = "h3irs_staging_prefix";
                                        searchType = "prefix";
                                        tracetype = "IRSbyPAINumber_pre";
                                    }
                                    traceFieldValue = traceFieldValue.replace("\+", "");
                                    initialeventflag = true;
                                }
                                else {
                                    traceFieldValue = event["SIP"]["P-Asserted-Identity"][0]["address"]["uri"]["number"];
                                    tracetype = "IRSbyPAIUser";
                                    if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                        listName = "h3irs_staging_prefix";
                                        searchType = "prefix";
                                        tracetype = "IRSbyPAIUser_pre";
                                    }
                                    traceFieldValue = traceFieldValue.replace("\+", "");
                                    initialeventflag = true;
                                }
                            }
                            else {
                                initialeventflag = true;
                                tracetype = "noPAInumber[0]";
                                traceFieldValue = "notset";
                            }
                        }
                    }
                    else {
                        if ((_w = (_v = (_u = (_t = event["SIP"]) === null || _t === void 0 ? void 0 : _t["From"]) === null || _u === void 0 ? void 0 : _u["address"]) === null || _v === void 0 ? void 0 : _v["uri"]) === null || _w === void 0 ? void 0 : _w["user"]) {
                            traceFieldValue = event["SIP"]["From"]["address"]["uri"]["user"];
                            tracetype = "IRSbyFromUser";
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype = "IRSbyFromUser_pre";
                            }
                            traceFieldValue = traceFieldValue.replace("\+", "");
                            initialeventflag = true;
                        }
                        else {
                            traceFieldValue = event["SIP"]["From"]["address"]["uri"]["number"];
                            tracetype = "IRSbyFromNumber";
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype = "IRSbyFromNumber_pre";
                            }
                            traceFieldValue = traceFieldValue.replace("\+", "");
                            initialeventflag = true;
                        }
                    }
                }
                catch (e) {
                    initialeventflag = true;
                    tracetype = "exceptionat.sip.callStart:" + e;
                    traceFieldValue = "notset";
                }
            }
            if (event["event-name"] !== null && event["event-name"] === "sip.sessionStart.OPTIONS") {
                if (event["session"] !== null) {
                    traceFieldValue = event["session"];
                    traceFieldValue = "sip.sessionStart.OPTIONS";
                }
                else {
                    traceFieldValue = "nosessionfound";
                }
                tracetype = "IRSbyOPTIONS";
                initialeventflag = true;
            }
        }
        if (event["event-type"] !== null && event["event-type"] === "camel") {
            if (event["event-name"] !== null && event["event-name"] === "callStart.NONE") {
                try {
                    if ((_y = (_x = event["event"]) === null || _x === void 0 ? void 0 : _x["camel"]) === null || _y === void 0 ? void 0 : _y["eventTypeBCSM"]) {
                        if (event["event"]["camel"]["eventTypeBCSM"] == 2) {
                            if ((_0 = (_z = event["event"]["callStart"]) === null || _z === void 0 ? void 0 : _z["leg"]) === null || _0 === void 0 ? void 0 : _0["user"]) {
                                if (event["event"]["callStart"]["leg"]["user"]) {
                                    traceFieldValue = event["event"]["callStart"]["leg"]["user"];
                                    tracetype = "IRSbyMOlegUser";
                                }
                            }
                            else {
                                initialeventflag = true;
                                tracetype = "noUserforMT";
                                traceFieldValue = "notset";
                            }
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype = "IRSbyMOlegUser_pre";
                            }
                        }
                        else if (event["event"]["camel"]["eventTypeBCSM"] == 12) {
                            if ((_2 = (_1 = event["event"]["callStart"]) === null || _1 === void 0 ? void 0 : _1["contact"]) === null || _2 === void 0 ? void 0 : _2["user"]) {
                                if (event["event"]["callStart"]["contact"]["user"]) {
                                    traceFieldValue = event["event"]["callStart"]["contact"]["user"];
                                    tracetype = "IRSbyMTlegUser";
                                }
                            }
                            else {
                                initialeventflag = true;
                                tracetype = "noUserforMT";
                                traceFieldValue = "notset";
                            }
                            if (traceFieldValue.match(/^\+213/) || traceFieldValue.match(/^\+98/) || traceFieldValue.match(/^\+120/)) {
                                listName = "h3irs_staging_prefix";
                                searchType = "prefix";
                                tracetype = "IRSbyMTlegUser_pre";
                            }
                        }
                        else {
                            initialeventflag = true;
                            tracetype = "noValideventTypeBCSM";
                            traceFieldValue = "notset";
                        }
                        traceFieldValue = traceFieldValue.replace("\+", "");
                        initialeventflag = true;
                    }
                    else {
                        initialeventflag = true;
                        tracetype = "noCamelDetails";
                        traceFieldValue = "notset";
                    }
                }
                catch (e) {
                    initialeventflag = true;
                    tracetype = "exceptionat.camel.callStart:" + e;
                    traceFieldValue = "notset";
                }
            }
        }
    }
    catch (e) {
        initialeventflag = true;
        tracetype = "exception:" + e;
        traceFieldValue = "notset";
    }
    ;
    if (initialeventflag === true) {
        ret.put("value", traceFieldValue);
        ret.put("list", listName);
        ret.put("searchType", searchType);
        ret.put("traceTtl", ttl);
        ret.put("traceType", tracetype);
        ret.put("traceField", traceField);
        ret.put("tracingid", traceFieldValue);
        ret.put("tracinglist", listName);
        ret.put("tracingmsg", tracetype);
        ret.put("dispatcherresult", "stagingset");
        try {
            if (traceFieldValue.match(/^\436603038/)) {
                ret.put("traceIndented", true);
            }
            else {
                ret.put("traceIndented", false);
            }
        }
        catch (e) {
            ret.put("traceIndented", false);
        }
        return ret;
    }
    else {
        return ret;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxTQUFTLFVBQVUsQ0FBQyxJQUFXO0lBQzNCLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNySixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxJQUFXO0lBQzNCLElBQUksR0FBRyxHQUFhLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hLLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUdELFNBQVMsV0FBVyxDQUFDLE9BQVcsRUFBQyxLQUFTLEVBQUMsV0FBZTtJQUN0RCxJQUFJLEdBQUcsR0FBUyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBRzVCLElBQUksR0FBRyxHQUFVLElBQUksSUFBSSxFQUFFLENBQUM7SUFDNUIsSUFBSSxPQUFPLEdBQVksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksT0FBTyxHQUFZLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxJQUFJO1FBQ0ksSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFFaEMsSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFBRSxJQUFJLEVBQUU7Z0JBQ3RDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEUsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sR0FBQyxHQUFHLEdBQUUsT0FBTyxHQUFDLEdBQUcsR0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRztpQkFBTztnQkFDSixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxHQUFDLEdBQUcsR0FBRSxPQUFPLEdBQUMscUJBQXFCLENBQUM7YUFDdEU7WUFDRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLEVBQUU7Z0JBR25DLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDSCxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEM7U0FDSjtLQUNSO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixHQUFHLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdEO0FBQ0wsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQVcsRUFBQyxLQUFTLEVBQUMsV0FBZTtJQUNwRCxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUk3QixJQUFJLEdBQUcsR0FBVSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzVCLElBQUksT0FBTyxHQUFZLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxJQUFJLE9BQU8sR0FBWSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsSUFBSTtRQUNJLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBRWhDLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLElBQUUsSUFBSSxFQUFFO2dCQUN0QyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLEdBQUMsR0FBRyxHQUFFLE9BQU8sR0FBQyxHQUFHLEdBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakc7aUJBQU87Z0JBQ0osT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sR0FBQyxHQUFHLEdBQUUsT0FBTyxHQUFDLHFCQUFxQixDQUFDO2FBQ3RFO1lBQ0QsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxFQUFFO2dCQUduQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7S0FDUjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsRUFBQyxDQUFDLENBQUMsQ0FBQztLQUM3RDtBQUNMLENBQUM7QUFFRCxDQUFDO0FBQ0QsQ0FBQztBQVVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQU03QyxTQUFTLGFBQWEsQ0FBQyxLQUFTOztJQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBSXhCLElBQUksUUFBUSxHQUFVLGVBQWUsQ0FBQztJQUN0QyxJQUFJLGVBQWUsR0FBVSxLQUFLLENBQUMsSUFBSSxLQUFHLElBQUksQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO0lBQ2hFLElBQUksR0FBRyxHQUFVLEtBQUssQ0FBQztJQUN2QixJQUFJLFNBQVMsR0FBVSxhQUFhLENBQUM7SUFDckMsSUFBSSxVQUFVLEdBQVUsY0FBYyxDQUFDO0lBRXZDLElBQUksVUFBVSxHQUFVLFFBQVEsQ0FBQztJQUNqQyxJQUFJLGdCQUFnQixHQUFXLEtBQUssQ0FBQztJQUdyQyxJQUFHO1FBR0MsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUcsTUFBTSxDQUFDLEVBQUM7WUFDNUYsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxvQkFBb0IsRUFBRTtnQkFDNUUsSUFBSTtvQkFHQSxJQUFJLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQywwQ0FBRyxxQkFBcUIsQ0FBQyxFQUFFO3dCQUV2QyxJQUFJLE1BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsMENBQUcscUJBQXFCLENBQUMsMENBQUcsU0FBUyxDQUFDLDBDQUFHLEtBQUssQ0FBQyxFQUFFOzRCQUU3RCxJQUFJLE1BQUEsTUFBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQywwQ0FBRyxxQkFBcUIsQ0FBQywwQ0FBRyxTQUFTLENBQUMsMENBQUcsS0FBSyxDQUFDLDBDQUFHLE1BQU0sQ0FBQyxFQUFFO2dDQUN2RSxlQUFlLEdBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzlFLFNBQVMsR0FBQyxnQkFBZ0IsQ0FBQztnQ0FFM0IsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQ0FFdEcsUUFBUSxHQUFHLHNCQUFzQixDQUFDO29DQUNsQyxVQUFVLEdBQUcsUUFBUSxDQUFDO29DQUN0QixTQUFTLEdBQUMsb0JBQW9CLENBQUM7aUNBQ2xDO2dDQUNELGVBQWUsR0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztnQ0FDakQsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDOzZCQUN6QjtpQ0FBTTtnQ0FDSCxlQUFlLEdBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ2hGLFNBQVMsR0FBQyxjQUFjLENBQUM7Z0NBRXpCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7b0NBRXRHLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztvQ0FDbEMsVUFBVSxHQUFHLFFBQVEsQ0FBQztvQ0FDdEIsU0FBUyxHQUFDLGtCQUFrQixDQUFDO2lDQUNoQztnQ0FDRCxlQUFlLEdBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQ2pELGdCQUFnQixHQUFDLElBQUksQ0FBQzs2QkFDekI7eUJBQ0o7NkJBQU07NEJBRUgsSUFBSSxNQUFBLE1BQUEsTUFBQSxNQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsMENBQUcscUJBQXFCLENBQUMsMENBQUcsQ0FBQyxDQUFDLDBDQUFHLFNBQVMsQ0FBQywwQ0FBRyxLQUFLLENBQUMsRUFBRTtnQ0FFbEUsSUFBSSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQywwQ0FBRyxxQkFBcUIsQ0FBQywwQ0FBRyxDQUFDLENBQUMsMENBQUcsU0FBUyxDQUFDLDBDQUFHLEtBQUssQ0FBQywwQ0FBRyxNQUFNLENBQUMsRUFBRTtvQ0FFNUUsZUFBZSxHQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUNqRixTQUFTLEdBQUMsZ0JBQWdCLENBQUM7b0NBRTNCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7d0NBRXRHLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQzt3Q0FDbEMsVUFBVSxHQUFHLFFBQVEsQ0FBQzt3Q0FDdEIsU0FBUyxHQUFDLG9CQUFvQixDQUFDO3FDQUNsQztvQ0FDRCxlQUFlLEdBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7b0NBQ2pELGdCQUFnQixHQUFDLElBQUksQ0FBQztpQ0FDekI7cUNBQU07b0NBQ0gsZUFBZSxHQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29DQUNuRixTQUFTLEdBQUMsY0FBYyxDQUFDO29DQUV6QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dDQUV0RyxRQUFRLEdBQUcsc0JBQXNCLENBQUM7d0NBQ2xDLFVBQVUsR0FBRyxRQUFRLENBQUM7d0NBQ3RCLFNBQVMsR0FBQyxrQkFBa0IsQ0FBQztxQ0FDaEM7b0NBQ0QsZUFBZSxHQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO29DQUNqRCxnQkFBZ0IsR0FBQyxJQUFJLENBQUM7aUNBQ3pCOzZCQUNKO2lDQUFNO2dDQUVDLGdCQUFnQixHQUFDLElBQUksQ0FBQztnQ0FDdEIsU0FBUyxHQUFDLGdCQUFnQixDQUFDO2dDQUMzQixlQUFlLEdBQUMsUUFBUSxDQUFDOzZCQUNoQzt5QkFFSjtxQkFDSjt5QkFBTTt3QkFDSCxJQUFJLE1BQUEsTUFBQSxNQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQywwQ0FBRyxNQUFNLENBQUMsMENBQUcsU0FBUyxDQUFDLDBDQUFHLEtBQUssQ0FBQywwQ0FBRyxNQUFNLENBQUMsRUFBRTs0QkFDeEQsZUFBZSxHQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDL0QsU0FBUyxHQUFDLGVBQWUsQ0FBQzs0QkFFMUIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQ0FFdEcsUUFBUSxHQUFHLHNCQUFzQixDQUFDO2dDQUNsQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2dDQUN0QixTQUFTLEdBQUMsbUJBQW1CLENBQUM7NkJBQ2pDOzRCQUNELGVBQWUsR0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQzs0QkFDakQsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDO3lCQUN6Qjs2QkFBTTs0QkFFSCxlQUFlLEdBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNqRSxTQUFTLEdBQUMsaUJBQWlCLENBQUM7NEJBRTVCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBRXRHLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztnQ0FDbEMsVUFBVSxHQUFHLFFBQVEsQ0FBQztnQ0FDdEIsU0FBUyxHQUFDLHFCQUFxQixDQUFDOzZCQUNuQzs0QkFDRCxlQUFlLEdBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ2pELGdCQUFnQixHQUFDLElBQUksQ0FBQzt5QkFDekI7cUJBQ0o7aUJBQ0o7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDO29CQUN0QixTQUFTLEdBQUMsNEJBQTRCLEdBQUMsQ0FBQyxDQUFDO29CQUN6QyxlQUFlLEdBQUMsUUFBUSxDQUFDO2lCQUM1QjthQUNKO1lBRUQsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSywwQkFBMEIsRUFBRTtnQkFDbEYsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUcsSUFBSSxFQUFFO29CQUN6QixlQUFlLEdBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqQyxlQUFlLEdBQUMsMEJBQTBCLENBQUM7aUJBRTlDO3FCQUFNO29CQUNILGVBQWUsR0FBQyxnQkFBZ0IsQ0FBQztpQkFDcEM7Z0JBQ0QsU0FBUyxHQUFDLGNBQWMsQ0FBQztnQkFDekIsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDO2FBQ3pCO1NBQ0o7UUFFRCxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBRyxJQUFJLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFHLE9BQU8sRUFBQztZQUM1RCxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBRyxJQUFJLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLGdCQUFnQixFQUFFO2dCQUN4RSxJQUFJO29CQUNBLElBQUksTUFBQSxNQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsMENBQUcsT0FBTyxDQUFDLDBDQUFHLGVBQWUsQ0FBQyxFQUFFO3dCQUM5QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBRS9DLElBQUksTUFBQSxNQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsMENBQUcsS0FBSyxDQUFDLDBDQUFHLE1BQU0sQ0FBQyxFQUFFO2dDQUNqRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQ0FDM0MsZUFBZSxHQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtvQ0FDMUQsU0FBUyxHQUFDLGdCQUFnQixDQUFDO2lDQUM5Qjs2QkFDSjtpQ0FBTTtnQ0FDSCxnQkFBZ0IsR0FBQyxJQUFJLENBQUM7Z0NBQ3RCLFNBQVMsR0FBQyxhQUFhLENBQUM7Z0NBQ3hCLGVBQWUsR0FBQyxRQUFRLENBQUM7NkJBQzVCOzRCQUVELElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ3RHLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztnQ0FDbEMsVUFBVSxHQUFHLFFBQVEsQ0FBQztnQ0FDdEIsU0FBUyxHQUFDLG9CQUFvQixDQUFDOzZCQUNsQzt5QkFDSjs2QkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBRXZELElBQUksTUFBQSxNQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsMENBQUcsU0FBUyxDQUFDLDBDQUFHLE1BQU0sQ0FBQyxFQUFFO2dDQUNwRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQ0FDaEQsZUFBZSxHQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDL0QsU0FBUyxHQUFDLGdCQUFnQixDQUFDO2lDQUM5Qjs2QkFDSjtpQ0FBTTtnQ0FDSCxnQkFBZ0IsR0FBQyxJQUFJLENBQUM7Z0NBQ3RCLFNBQVMsR0FBQyxhQUFhLENBQUM7Z0NBQ3hCLGVBQWUsR0FBQyxRQUFRLENBQUM7NkJBQzVCOzRCQUVELElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ3RHLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztnQ0FDbEMsVUFBVSxHQUFHLFFBQVEsQ0FBQztnQ0FDdEIsU0FBUyxHQUFDLG9CQUFvQixDQUFDOzZCQUNsQzt5QkFDSjs2QkFBTTs0QkFDSCxnQkFBZ0IsR0FBQyxJQUFJLENBQUM7NEJBQ3RCLFNBQVMsR0FBQyxzQkFBc0IsQ0FBQzs0QkFDakMsZUFBZSxHQUFDLFFBQVEsQ0FBQzt5QkFDNUI7d0JBQ0QsZUFBZSxHQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNqRCxnQkFBZ0IsR0FBQyxJQUFJLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNDLGdCQUFnQixHQUFDLElBQUksQ0FBQzt3QkFDdEIsU0FBUyxHQUFDLGdCQUFnQixDQUFDO3dCQUMzQixlQUFlLEdBQUMsUUFBUSxDQUFDO3FCQUNoQztpQkFDSjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDUixnQkFBZ0IsR0FBQyxJQUFJLENBQUM7b0JBQ3RCLFNBQVMsR0FBQyw4QkFBOEIsR0FBQyxDQUFDLENBQUM7b0JBQzNDLGVBQWUsR0FBQyxRQUFRLENBQUM7aUJBQzVCO2FBQ0o7U0FDSjtLQUNKO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFFUixnQkFBZ0IsR0FBQyxJQUFJLENBQUM7UUFDdEIsU0FBUyxHQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7UUFDekIsZUFBZSxHQUFDLFFBQVEsQ0FBQztLQUM1QjtJQUFBLENBQUM7SUFJRixJQUFJLGdCQUFnQixLQUFHLElBQUksRUFBQztRQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxlQUFlLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsQ0FBQztRQUdqQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQyxlQUFlLENBQUMsQ0FBQztRQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFDLFlBQVksQ0FBQyxDQUFDO1FBSXpDLElBQUk7WUFDQSxJQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFFLEVBQUU7Z0JBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO1FBR0QsT0FBTyxHQUFHLENBQUM7S0FDZDtTQUFNO1FBRUgsT0FBTyxHQUFHLENBQUM7S0FDZDtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKiBsaWIgY29kZSAqL1xuXG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUgOiBEYXRlKSA6IHN0cmluZyB7XG4gICAgbGV0IHJldCA6IHN0cmluZyAgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKSArIChcIjAwXCIgKyAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKSArIChcIjAwXCIrKGRhdGUuZ2V0RGF0ZSgpKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZShkYXRlIDogRGF0ZSkgOiBzdHJpbmcge1xuICAgIGxldCByZXQgOiBzdHJpbmcgID0gKFwiMDBcIitkYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKSkuc2xpY2UoLTIpICsgKFwiMDBcIitkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpKS5zbGljZSgtMikgKyAoXCIwMFwiK2RhdGUuZ2V0U2Vjb25kcygpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICByZXR1cm4gcmV0O1xufVxuXG5cbmZ1bmN0aW9uIHByZXR0eXRyYWNlKHNlc3Npb246YW55LGV2ZW50OmFueSxsb2NhbFBhcmFtczphbnkpOiBhbnkge1xuICAgIGxldCBsb2cgOiBhbnkgPSBzZXNzaW9uLmxvZztcbiAgICBcbiAgICAvL3NldCBwcmV0dHkgdHJhY2luZyBpbmZvLiBUaGlzIHNoYWxsIGJlIGluIHRoZSBmaXJzdCBsaWJyYXJ5IGFmdGVyIG1haW5cbiAgICBsZXQgbm93IDogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGxvZ0RhdGUgOiBzdHJpbmcgPSBmb3JtYXREYXRlKG5vdyk7XG4gICAgbGV0IGxvZ1RpbWUgOiBzdHJpbmcgPSBmb3JtYXRUaW1lKG5vdyk7XG4gICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uW1wiZnNtLXRyYWNlLWxldmVsXCJdID4gMCkge1xuICAgICAgICAgICAgICAgIC8vb25seSBpbmNyZWFzZSB0cmFjZSBpZiBlbmFibGVkIGJ5IFN0YXJ0IGhhbmRsZXIgKHJhbmRvbSBvciBsaXN0IGJhc2VkKVxuICAgICAgICAgICAgICAgIGlmIChldmVudFtcImV2ZW50LWFkZGl0aW9uYWwtaW5mb1wiXSE9bnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1widHJhY2Utc2tleVwiXSA9IGV2ZW50W1wiZXZlbnQtYWRkaXRpb25hbC1pbmZvXCJdW1widHJhY2luZ2lkXCJdO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1widHJhY2UtdHlwZVwiXSA9IGxvZ0RhdGUrXCItXCIrIGxvZ1RpbWUrXCJfXCIrZXZlbnRbXCJldmVudC1hZGRpdGlvbmFsLWluZm9cIl1bXCJ0cmFjaW5nbXNnXCJdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1widHJhY2UtdHlwZVwiXSA9IGxvZ0RhdGUrXCItXCIrIGxvZ1RpbWUrXCJfTWlzc2luZ1N0YWdpbmdJbmZvXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uW1widHJhY2UtdHlwZVwiXSA9PSBcInJhbmRvbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBpcyBhIHJhbmRvbSB0cmFjZSAtIHNldCB0aGUgdmFsdWUgZnJvbSBkZWZhdWx0IDEgdG8gMi4gbm90IHBvc3NpYmxlIHRvIGdldCBpdCBmcm9tIFVJUiBhcyB0aGlzIGlzIGxhdGVyIGluIHRoZSBmbG93LiBtYXliZSBjb3VsZCBjaGFuZ2UgaW4gbGF0ZXIgYnV0IG5vdCBjb25zaWRlcmVkIHlldFxuICAgICAgICAgICAgICAgICAgICAvL1wiZnNtLXRyYWNlLWxldmVsXCIgZmllbGQgaW4gdGhlIHNlc3Npb24gdG8gZWl0aGVyIDAgKGJhc2ljKSwgMSAoaW50ZXJtZWRpYXRlKSBvciAyIChoaWdoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbltcImZzbS10cmFjZS1sZXZlbFwiXSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbltcImZzbS10cmFjZS1sZXZlbFwiXSA9IDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiZ2V0X2NoZWNrSEY6RXJyb3IgYWRkaW5nIHRyYWNlIGRldGFpbHM6IHt9XCIsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzYXZlZXZlbnQoc2Vzc2lvbjphbnksZXZlbnQ6YW55LGxvY2FsUGFyYW1zOmFueSk6IGFueSB7XG4gICAgc2Vzc2lvbi5zX3NhdmVkZXZlbnQgPSBldmVudDtcblxuICAgIC8vIGFzIHRoaXMgaXMgdXNlZCBmb3IgU0lQLk9QVElPTlNcbiAgICAvL3NldCBwcmV0dHkgdHJhY2luZyBpbmZvLiBUaGlzIHNoYWxsIGJlIGluIHRoZSBmaXJzdCBsaWJyYXJ5IGFmdGVyIG1haW5cbiAgICBsZXQgbm93IDogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGxvZ0RhdGUgOiBzdHJpbmcgPSBmb3JtYXREYXRlKG5vdyk7XG4gICAgbGV0IGxvZ1RpbWUgOiBzdHJpbmcgPSBmb3JtYXRUaW1lKG5vdyk7XG4gICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uW1wiZnNtLXRyYWNlLWxldmVsXCJdID4gMCkge1xuICAgICAgICAgICAgICAgIC8vb25seSBpbmNyZWFzZSB0cmFjZSBpZiBlbmFibGVkIGJ5IFN0YXJ0IGhhbmRsZXIgKHJhbmRvbSBvciBsaXN0IGJhc2VkKVxuICAgICAgICAgICAgICAgIGlmIChldmVudFtcImV2ZW50LWFkZGl0aW9uYWwtaW5mb1wiXSE9bnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1widHJhY2Utc2tleVwiXSA9IGV2ZW50W1wiZXZlbnQtYWRkaXRpb25hbC1pbmZvXCJdW1widHJhY2luZ2lkXCJdO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1widHJhY2UtdHlwZVwiXSA9IGxvZ0RhdGUrXCItXCIrIGxvZ1RpbWUrXCJfXCIrZXZlbnRbXCJldmVudC1hZGRpdGlvbmFsLWluZm9cIl1bXCJ0cmFjaW5nbXNnXCJdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1widHJhY2UtdHlwZVwiXSA9IGxvZ0RhdGUrXCItXCIrIGxvZ1RpbWUrXCJfTWlzc2luZ1N0YWdpbmdJbmZvXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uW1widHJhY2UtdHlwZVwiXSA9PSBcInJhbmRvbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBpcyBhIHJhbmRvbSB0cmFjZSAtIHNldCB0aGUgdmFsdWUgZnJvbSBkZWZhdWx0IDEgdG8gMi4gbm90IHBvc3NpYmxlIHRvIGdldCBpdCBmcm9tIFVJUiBhcyB0aGlzIGlzIGxhdGVyIGluIHRoZSBmbG93LiBtYXliZSBjb3VsZCBjaGFuZ2UgaW4gbGF0ZXIgYnV0IG5vdCBjb25zaWRlcmVkIHlldFxuICAgICAgICAgICAgICAgICAgICAvL1wiZnNtLXRyYWNlLWxldmVsXCIgZmllbGQgaW4gdGhlIHNlc3Npb24gdG8gZWl0aGVyIDAgKGJhc2ljKSwgMSAoaW50ZXJtZWRpYXRlKSBvciAyIChoaWdoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbltcImZzbS10cmFjZS1sZXZlbFwiXSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbltcImZzbS10cmFjZS1sZXZlbFwiXSA9IDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiZ2V0X2NoZWNrSEY6RXJyb3IgYWRkaW5nIHRyYWNlIGRldGFpbHM6IHt9XCIsZSk7XG4gICAgfSAgICBcbn1cblxuOy8vTUFJTkJMT0NLXG47LyoqIGxpYiBjb2RlICovXG5cbi8vIFRoaXMgTVVTVCBub3QgYmUgY2hhbmdlZCBhcyBpdCBpcyB2ZXJ5IHBlcmZvcm1hbmNlIHNlbnNpdGl2ZSAtIGZvciBldmVyeSBldmVudFxuLy8gU1RBR0lORyBsaWJyYXJ5IGZvciBTSVAtSU5WSVRFUy4gRXh0cmFjdCB0aGUgdHJhY2luZ2lkIGZyb20gYSBJbml0aWFsIFNJUC5JbnZpdGUgaW4gdGhlIGZvbGxvd2luZyBvcmRlciBmcm9tIFRvcCBSb3V0ZSBIZWFkZXJcbi8vIFBBSSh1c2VyIHVyaSkgLT4gUEFJKG51bWJlciB1cmkpIC0+IEZyb20odXNlciB1cmkpIC0+IEZycG0obnVtYmVyIHVyaSlcblxuXG4vKiogXG4gKiBpbXBvcnQgYSB0eXBlIGZyb20gamF2YS4gVGhpcyBpcyBOT1QgamF2YXNjcmlwdCAoZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMpXG4gKi9cbnZhciBIYXNoTWFwID0gSmF2YS50eXBlKFwiamF2YS51dGlsLkhhc2hNYXBcIik7XG5cbi8qKlxuICogQHBhcmFtIGV2ZW50IHthbnl9IGV2ZW50IHRvIGFuYWx5emVcbiAqIEByZXR1cm4ge0hhc2hNYXB9IFxuICovXG5mdW5jdGlvbiB0cmFjZV9kZXRhaWxzKGV2ZW50OmFueSkge1xuICAgIHZhciByZXQgPSBuZXcgSGFzaE1hcCgpO1xuXG4gICAgLy9zYW1lIGFzIGNvbmZpZ3VyZWQgaW4gdGhlIHJ0ZSBwcm9jZXNzIHRvIHJlZnJlc2hcbiAgICAvL2xpc3QgaXMgcmVmcmVzaGVkIGV2ZXJ5IHNlY29uZHMgYXMgaW4gdGhlIHJ0ZSBwcm9jZXNzIGNvbmZpZ1xuICAgIGxldCBsaXN0TmFtZTpzdHJpbmcgPSBcImgzaXJzX3N0YWdpbmdcIjtcbiAgICBsZXQgdHJhY2VGaWVsZFZhbHVlOnN0cmluZyA9IGV2ZW50Lm5hbWUhPT1udWxsPyBldmVudC5uYW1lOlwibmFcIjtcbiAgICBsZXQgdHRsOm51bWJlciA9IDEwMDAwO1xuICAgIGxldCB0cmFjZXR5cGU6c3RyaW5nID0gXCJzdGFnaW5ndHlwZVwiO1xuICAgIGxldCB0cmFjZUZpZWxkOnN0cmluZyA9IFwic3RhZ2luZ2ZpZWxkXCI7XG4gICAgLy9wcmVmaXggb3Igc3VmZml4IG9yIGFueVxuICAgIGxldCBzZWFyY2hUeXBlOnN0cmluZyA9IFwic3VmZml4XCI7XG4gICAgbGV0IGluaXRpYWxldmVudGZsYWc6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICB0cnl7XG4gICAgICAgIC8vZm9yIGV2ZXJ5IHNlc3Npb24gaW5pdGlhbCBldmVudCBmb3IgdGhpcyBzZXJ2aWNlXG4gICAgICAgIC8vc2lwIG9wdGlvbnMgYXJlIHR5cGUgb2NjcCBmcm9tIHRhcy1zY2UtY29tcG9uZW50XG4gICAgICAgIGlmKCBldmVudFtcImV2ZW50LXR5cGVcIl0hPT1udWxsICYmIChldmVudFtcImV2ZW50LXR5cGVcIl09PT1cInNpcFwiIHx8IGV2ZW50W1wiZXZlbnQtdHlwZVwiXT09PVwib2NjcFwiKSl7ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggZXZlbnRbXCJldmVudC1uYW1lXCJdIT09bnVsbCAmJiBldmVudFtcImV2ZW50LW5hbWVcIl0gPT09IFwic2lwLmNhbGxTdGFydC5OT05FXCIpIHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy9vbmx5IGZvciBTSVAgaW5pdGlhbCBldmVudHMgd2l0aCB0aGUgdG9wLW1vc3Qgcm91dGUgSEYgc2V0IHRvIHJzaSpcbiAgICAgICAgICAgICAgICAgICAgLy9mZXRjaCBNU0lTRE46IFBBSSBpZiBwcmVzZW50IGVsc2UgRnJvbSAuLiBlbHNlIGV4Y2VwdGlvbi4gZm9yIHN0YWdpbmcgb25seSBQQUkgaWYgcHJlc2VudCBlbHNlIEZyb20gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbXCJTSVBcIl0/LltcIlAtQXNzZXJ0ZWQtSWRlbnRpdHlcIl0pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9QQUkgaXMgbm90IHByZXNlbnQgLSB1c2UgRnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiU0lQXCJdPy5bXCJQLUFzc2VydGVkLUlkZW50aXR5XCJdPy5bXCJhZGRyZXNzXCJdPy5bXCJ1cmlcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1BBSSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbXCJTSVBcIl0/LltcIlAtQXNzZXJ0ZWQtSWRlbnRpdHlcIl0/LltcImFkZHJlc3NcIl0/LltcInVyaVwiXT8uW1widXNlclwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9ZXZlbnRbXCJTSVBcIl1bXCJQLUFzc2VydGVkLUlkZW50aXR5XCJdW1wiYWRkcmVzc1wiXVtcInVyaVwiXVtcInVzZXJcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIklSU2J5UEFJTnVtYmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcmVmaXggaW5zdGVhZCBvZiBzdWZmaXggKGRlZmF1bHQpIGZvciBzdGFnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCsyMTMvKSB8fCB0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCs5OC8pIHx8IHRyYWNlRmllbGRWYWx1ZS5tYXRjaCgvXlxcKzEyMC8pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3ROYW1lID0gXCJoM2lyc19zdGFnaW5nX3ByZWZpeFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVHlwZSA9IFwicHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZXR5cGU9XCJJUlNieVBBSU51bWJlcl9wcmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9dHJhY2VGaWVsZFZhbHVlLnJlcGxhY2UoXCJcXCtcIixcIlwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsZXZlbnRmbGFnPXRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPWV2ZW50W1wiU0lQXCJdW1wiUC1Bc3NlcnRlZC1JZGVudGl0eVwiXVtcImFkZHJlc3NcIl1bXCJ1cmlcIl1bXCJudW1iZXJcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIklSU2J5UEFJVXNlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgcHJlZml4IGluc3RlYWQgb2Ygc3VmZml4IChkZWZhdWx0KSBmb3Igc3RhZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrMjEzLykgfHwgdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrOTgvKSB8fCB0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCsxMjAvKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0TmFtZSA9IFwiaDNpcnNfc3RhZ2luZ19wcmVmaXhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFR5cGUgPSBcInByZWZpeFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlQQUlVc2VyX3ByZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT10cmFjZUZpZWxkVmFsdWUucmVwbGFjZShcIlxcK1wiLFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsZXZlbnRmbGFnPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1BBSSBub3QgcHJlc2VudC4gVHJ5IFBBSSB3aXRoIGluZGV4IFswXSAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiU0lQXCJdPy5bXCJQLUFzc2VydGVkLUlkZW50aXR5XCJdPy5bMF0/LltcImFkZHJlc3NcIl0/LltcInVyaVwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1BBSVswXSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiU0lQXCJdPy5bXCJQLUFzc2VydGVkLUlkZW50aXR5XCJdPy5bMF0/LltcImFkZHJlc3NcIl0/LltcInVyaVwiXT8uW1widXNlclwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90cnkgUEFJWzBdIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPWV2ZW50W1wiU0lQXCJdW1wiUC1Bc3NlcnRlZC1JZGVudGl0eVwiXVswXVtcImFkZHJlc3NcIl1bXCJ1cmlcIl1bXCJ1c2VyXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlQQUlOdW1iZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcmVmaXggaW5zdGVhZCBvZiBzdWZmaXggKGRlZmF1bHQpIGZvciBzdGFnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrMjEzLykgfHwgdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrOTgvKSB8fCB0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCsxMjAvKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdE5hbWUgPSBcImgzaXJzX3N0YWdpbmdfcHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVHlwZSA9IFwicHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlQQUlOdW1iZXJfcHJlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9dHJhY2VGaWVsZFZhbHVlLnJlcGxhY2UoXCJcXCtcIixcIlwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGV2ZW50ZmxhZz10cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPWV2ZW50W1wiU0lQXCJdW1wiUC1Bc3NlcnRlZC1JZGVudGl0eVwiXVswXVtcImFkZHJlc3NcIl1bXCJ1cmlcIl1bXCJudW1iZXJcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZXR5cGU9XCJJUlNieVBBSVVzZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcmVmaXggaW5zdGVhZCBvZiBzdWZmaXggKGRlZmF1bHQpIGZvciBzdGFnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrMjEzLykgfHwgdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrOTgvKSB8fCB0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCsxMjAvKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdE5hbWUgPSBcImgzaXJzX3N0YWdpbmdfcHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVHlwZSA9IFwicHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlQQUlVc2VyX3ByZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPXRyYWNlRmllbGRWYWx1ZS5yZXBsYWNlKFwiXFwrXCIsXCJcIik7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGV2ZW50ZmxhZz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxldmVudGZsYWc9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIm5vUEFJbnVtYmVyWzBdXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9XCJub3RzZXRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbXCJTSVBcIl0/LltcIkZyb21cIl0/LltcImFkZHJlc3NcIl0/LltcInVyaVwiXT8uW1widXNlclwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT1ldmVudFtcIlNJUFwiXVtcIkZyb21cIl1bXCJhZGRyZXNzXCJdW1widXJpXCJdW1widXNlclwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZXR5cGU9XCJJUlNieUZyb21Vc2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHByZWZpeCBpbnN0ZWFkIG9mIHN1ZmZpeCAoZGVmYXVsdCkgZm9yIHN0YWdpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrMjEzLykgfHwgdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrOTgvKSB8fCB0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCsxMjAvKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3ROYW1lID0gXCJoM2lyc19zdGFnaW5nX3ByZWZpeFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUeXBlID0gXCJwcmVmaXhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlGcm9tVXNlcl9wcmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPXRyYWNlRmllbGRWYWx1ZS5yZXBsYWNlKFwiXFwrXCIsXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGV2ZW50ZmxhZz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT1ldmVudFtcIlNJUFwiXVtcIkZyb21cIl1bXCJhZGRyZXNzXCJdW1widXJpXCJdW1wibnVtYmVyXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIklSU2J5RnJvbU51bWJlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcmVmaXggaW5zdGVhZCBvZiBzdWZmaXggKGRlZmF1bHQpIGZvciBzdGFnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNlRmllbGRWYWx1ZS5tYXRjaCgvXlxcKzIxMy8pIHx8IHRyYWNlRmllbGRWYWx1ZS5tYXRjaCgvXlxcKzk4LykgfHwgdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrMTIwLykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0TmFtZSA9IFwiaDNpcnNfc3RhZ2luZ19wcmVmaXhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoVHlwZSA9IFwicHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIklSU2J5RnJvbU51bWJlcl9wcmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPXRyYWNlRmllbGRWYWx1ZS5yZXBsYWNlKFwiXFwrXCIsXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGV2ZW50ZmxhZz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsZXZlbnRmbGFnPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cImV4Y2VwdGlvbmF0LnNpcC5jYWxsU3RhcnQ6XCIrZTtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPVwibm90c2V0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYoIGV2ZW50W1wiZXZlbnQtbmFtZVwiXSE9PW51bGwgJiYgZXZlbnRbXCJldmVudC1uYW1lXCJdID09PSBcInNpcC5zZXNzaW9uU3RhcnQuT1BUSU9OU1wiKSB7ICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRbXCJzZXNzaW9uXCJdIT09bnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9ZXZlbnRbXCJzZXNzaW9uXCJdO1xuICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9XCJzaXAuc2Vzc2lvblN0YXJ0Lk9QVElPTlNcIjtcbiAgICAgICAgICAgICAgICAgICAgLy90cmFjZUZpZWxkVmFsdWU9XCIxXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPVwibm9zZXNzaW9uZm91bmRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlPUFRJT05TXCI7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGV2ZW50ZmxhZz10cnVlO1xuICAgICAgICAgICAgfSAgICAgIFxuICAgICAgICB9ICAgICAgICAgIFxuXG4gICAgICAgIGlmKCBldmVudFtcImV2ZW50LXR5cGVcIl0hPT1udWxsICYmIGV2ZW50W1wiZXZlbnQtdHlwZVwiXT09PVwiY2FtZWxcIil7ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggZXZlbnRbXCJldmVudC1uYW1lXCJdIT09bnVsbCAmJiBldmVudFtcImV2ZW50LW5hbWVcIl0gPT09IFwiY2FsbFN0YXJ0Lk5PTkVcIikgeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbXCJldmVudFwiXT8uW1wiY2FtZWxcIl0/LltcImV2ZW50VHlwZUJDU01cIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudFtcImV2ZW50XCJdW1wiY2FtZWxcIl1bXCJldmVudFR5cGVCQ1NNXCJdID09IDIpIHsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTU8gY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudFtcImV2ZW50XCJdW1wiY2FsbFN0YXJ0XCJdPy5bXCJsZWdcIl0/LltcInVzZXJcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbXCJldmVudFwiXVtcImNhbGxTdGFydFwiXVtcImxlZ1wiXVtcInVzZXJcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT1ldmVudFtcImV2ZW50XCJdW1wiY2FsbFN0YXJ0XCJdW1wibGVnXCJdW1widXNlclwiXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlNT2xlZ1VzZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxldmVudGZsYWc9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwibm9Vc2VyZm9yTVRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPVwibm90c2V0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBwcmVmaXggaW5zdGVhZCBvZiBzdWZmaXggKGRlZmF1bHQpIGZvciBzdGFnaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNlRmllbGRWYWx1ZS5tYXRjaCgvXlxcKzIxMy8pIHx8IHRyYWNlRmllbGRWYWx1ZS5tYXRjaCgvXlxcKzk4LykgfHwgdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFwrMTIwLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdE5hbWUgPSBcImgzaXJzX3N0YWdpbmdfcHJlZml4XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFR5cGUgPSBcInByZWZpeFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZXR5cGU9XCJJUlNieU1PbGVnVXNlcl9wcmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnRbXCJldmVudFwiXVtcImNhbWVsXCJdW1wiZXZlbnRUeXBlQkNTTVwiXSA9PSAxMikgeyAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9NTyBjYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiZXZlbnRcIl1bXCJjYWxsU3RhcnRcIl0/LltcImNvbnRhY3RcIl0/LltcInVzZXJcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiZXZlbnRcIl1bXCJjYWxsU3RhcnRcIl1bXCJjb250YWN0XCJdW1widXNlclwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPWV2ZW50W1wiZXZlbnRcIl1bXCJjYWxsU3RhcnRcIl1bXCJjb250YWN0XCJdW1widXNlclwiXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIklSU2J5TVRsZWdVc2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsZXZlbnRmbGFnPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIm5vVXNlcmZvck1UXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT1cIm5vdHNldFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgcHJlZml4IGluc3RlYWQgb2Ygc3VmZml4IChkZWZhdWx0KSBmb3Igc3RhZ2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCsyMTMvKSB8fCB0cmFjZUZpZWxkVmFsdWUubWF0Y2goL15cXCs5OC8pIHx8IHRyYWNlRmllbGRWYWx1ZS5tYXRjaCgvXlxcKzEyMC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3ROYW1lID0gXCJoM2lyc19zdGFnaW5nX3ByZWZpeFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUeXBlID0gXCJwcmVmaXhcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiSVJTYnlNVGxlZ1VzZXJfcHJlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsZXZlbnRmbGFnPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwibm9WYWxpZGV2ZW50VHlwZUJDU01cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjZUZpZWxkVmFsdWU9XCJub3RzZXRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT10cmFjZUZpZWxkVmFsdWUucmVwbGFjZShcIlxcK1wiLFwiXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsZXZlbnRmbGFnPXRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGV2ZW50ZmxhZz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNldHlwZT1cIm5vQ2FtZWxEZXRhaWxzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2VGaWVsZFZhbHVlPVwibm90c2V0XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxldmVudGZsYWc9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2V0eXBlPVwiZXhjZXB0aW9uYXQuY2FtZWwuY2FsbFN0YXJ0OlwiK2U7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlRmllbGRWYWx1ZT1cIm5vdHNldFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy9ub3QgZXhjZXB0aW9uIGhhbmRsaW5nXG4gICAgICAgIGluaXRpYWxldmVudGZsYWc9dHJ1ZTtcbiAgICAgICAgdHJhY2V0eXBlPVwiZXhjZXB0aW9uOlwiK2U7XG4gICAgICAgIHRyYWNlRmllbGRWYWx1ZT1cIm5vdHNldFwiO1xuICAgIH07XG5cbiAgICAvL3RoaXMgaXMgaW1wb3J0YW50IGZvciB0aGUgcGVyZm9ybWFuY2UuIE9ubHkgSW5pdGlhbCBldmVudHMgc2hhbGwgcmV0dXJuIGEgc3RydWN0dXJlIGFzIHRoaXMgdHJpZ2dlciB0aGUgcmVkaXMgdGFibGUgbG9va3VwIG9yIG5vdCFcbiAgICAvL2VnIFNJUCBPUFRJT05TIGFyZSBub3QgaW4gdGhlIGFib3ZlIGFzIHdlbGxcbiAgICBpZiAoaW5pdGlhbGV2ZW50ZmxhZz09PXRydWUpeyAgICAgICBcbiAgICAgICAgcmV0LnB1dChcInZhbHVlXCIsdHJhY2VGaWVsZFZhbHVlKTtcbiAgICAgICAgcmV0LnB1dChcImxpc3RcIixsaXN0TmFtZSk7XG4gICAgICAgIHJldC5wdXQoXCJzZWFyY2hUeXBlXCIsc2VhcmNoVHlwZSk7XG4gICAgICAgIHJldC5wdXQoXCJ0cmFjZVR0bFwiLHR0bCk7XG4gICAgICAgIHJldC5wdXQoXCJ0cmFjZVR5cGVcIix0cmFjZXR5cGUpO1xuICAgICAgICByZXQucHV0KFwidHJhY2VGaWVsZFwiLHRyYWNlRmllbGQpOyAgIFxuXG4gICAgICAgIC8vdGhvc2UgdmFsdWVzIGFyZSBjb3BpZWQgdG8gdGhlIC0gYWRkaXRpb25hbC1pbmZvPXt0cmFjaW5naWQ9PHZhbHVlPn1cbiAgICAgICAgcmV0LnB1dChcInRyYWNpbmdpZFwiLHRyYWNlRmllbGRWYWx1ZSk7XG4gICAgICAgIHJldC5wdXQoXCJ0cmFjaW5nbGlzdFwiLGxpc3ROYW1lKTtcbiAgICAgICAgcmV0LnB1dChcInRyYWNpbmdtc2dcIix0cmFjZXR5cGUpO1xuICAgICAgICByZXQucHV0KFwiZGlzcGF0Y2hlcnJlc3VsdFwiLFwic3RhZ2luZ3NldFwiKTtcblxuICAgICAgICAvL2FkZCB0cmFjaW5nIGZvciBQTVNSTiByYW5nZSAtIHRoaXMgaXMgdGhlIEIgcGFydHkgYW5kIHRyYWNpbmcgaW4gSVJTIGlzIGluIGdlbmVyYWwgb24gQSBwYXJ0eS4gU28gbm90IHJlcXVpcmVkXG4gICAgICAgIC8vdHJhY2VJbmRlbnRlZCBib29sZWFuIHRvIGFkZCB0aGUgXCJldmVudC10cmFjaW5nXCIgb2JqZWN0IHRvIHRoZSBldmVudCAoYW5kIG92ZXJydWxlIHRoZSBTdGFydEhhbmRsZXIgdHJhY2luZyBvciBub3QpLiBkZWZhdWx0IGlmIG5vdCBhZGRlZCBpcyBmYWxzZSAobm90IGFkZClcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICggdHJhY2VGaWVsZFZhbHVlLm1hdGNoKC9eXFw0MzY2MDMwMzgvICkpIHtcbiAgICAgICAgICAgICAgICByZXQucHV0KFwidHJhY2VJbmRlbnRlZFwiLHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXQucHV0KFwidHJhY2VJbmRlbnRlZFwiLGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldC5wdXQoXCJ0cmFjZUluZGVudGVkXCIsZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL21pZGRsZXdhcmUgYWx3YXlzIGFkZCB0aGUgcm9vdCBsZXZlbCBrZXkgXCJldmVudC1sYWJlbC1tYXRjaFwiIChib29sZWFuKSBpZiB0aGUgbGlzdCB3YXMgbWF0Y2hlZCBvciBub3RcbiAgICAgICAgcmV0dXJuIHJldDsgICAgICAgICAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vcmV0dXJuIGVtcHR5IC0gbWVhbnMgbm90IGFuIGV2ZW50IHRoYXQgd2Ugd2FudCAvcmVtZW1iZXIgdGhhdCBldmVyeSBldmVudCBnb2VzIHRocm91Z2ggdGhpc1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbn1cbiJdfQ==