"use strict";
;
function formatDate(date) {
    var ret = date.getFullYear().toString() + ("00" + (date.getMonth() + 1).toString()).slice(-2) + ("00" + (date.getDate()).toString()).slice(-2);
    return ret;
}
function formatTime(date) {
    var ret = ("00" + date.getHours().toString()).slice(-2) + ("00" + date.getMinutes().toString()).slice(-2) + ("00" + date.getSeconds().toString()).slice(-2);
    return ret;
}
function sleepfunction(date) {
    java.lang.Thread.sleep(999);
    return "success";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBVztJQUMzQixJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckosT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBVztJQUMzQixJQUFJLEdBQUcsR0FBYSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoSyxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFHRCxTQUFTLGFBQWEsQ0FBQyxJQUFXO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU1QixPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBVyxFQUFDLEtBQVMsRUFBQyxXQUFlO0lBQ3RELElBQUksR0FBRyxHQUFTLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFHNUIsSUFBSSxHQUFHLEdBQVUsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUM1QixJQUFJLE9BQU8sR0FBWSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsSUFBSSxPQUFPLEdBQVksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLElBQUk7UUFDSSxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUVoQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxJQUFFLElBQUksRUFBRTtnQkFDdEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwRSxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxHQUFDLEdBQUcsR0FBRSxPQUFPLEdBQUMsR0FBRyxHQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2pHO2lCQUFPO2dCQUNKLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLEdBQUMsR0FBRyxHQUFFLE9BQU8sR0FBQyxxQkFBcUIsQ0FBQzthQUN0RTtZQUNELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsRUFBRTtnQkFHbkMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQztTQUNKO0tBQ1I7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLEdBQUcsQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0Q7QUFDTCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsT0FBVyxFQUFDLEtBQVMsRUFBQyxXQUFlO0lBQ3BELE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBSTdCLElBQUksR0FBRyxHQUFVLElBQUksSUFBSSxFQUFFLENBQUM7SUFDNUIsSUFBSSxPQUFPLEdBQVksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksT0FBTyxHQUFZLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxJQUFJO1FBQ0ksSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFFaEMsSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFBRSxJQUFJLEVBQUU7Z0JBQ3RDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEUsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sR0FBQyxHQUFHLEdBQUUsT0FBTyxHQUFDLEdBQUcsR0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRztpQkFBTztnQkFDSixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxHQUFDLEdBQUcsR0FBRSxPQUFPLEdBQUMscUJBQXFCLENBQUM7YUFDdEU7WUFDRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxRQUFRLEVBQUU7Z0JBR25DLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDSCxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEM7U0FDSjtLQUNSO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixHQUFHLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdEO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vTUFJTkJMT0NLXG47LyoqIGxpYiBjb2RlICovXG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSA6IERhdGUpIDogc3RyaW5nIHtcbiAgICBsZXQgcmV0IDogc3RyaW5nICA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpICsgKFwiMDBcIiArIChkYXRlLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKSkuc2xpY2UoLTIpICsgKFwiMDBcIisoZGF0ZS5nZXREYXRlKCkpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKGRhdGUgOiBEYXRlKSA6IHN0cmluZyB7XG4gICAgbGV0IHJldCA6IHN0cmluZyAgPSAoXCIwMFwiK2RhdGUuZ2V0SG91cnMoKS50b1N0cmluZygpKS5zbGljZSgtMikgKyAoXCIwMFwiK2RhdGUuZ2V0TWludXRlcygpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKSArIChcIjAwXCIrZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKSkuc2xpY2UoLTIpO1xuICAgIHJldHVybiByZXQ7XG59XG5cblxuZnVuY3Rpb24gc2xlZXBmdW5jdGlvbihkYXRlIDogRGF0ZSkgOiBzdHJpbmcge1xuICAgIGphdmEubGFuZy5UaHJlYWQuc2xlZXAoOTk5KTtcblxuICAgIHJldHVybiBcInN1Y2Nlc3NcIjtcbn1cblxuZnVuY3Rpb24gcHJldHR5dHJhY2Uoc2Vzc2lvbjphbnksZXZlbnQ6YW55LGxvY2FsUGFyYW1zOmFueSk6IGFueSB7XG4gICAgbGV0IGxvZyA6IGFueSA9IHNlc3Npb24ubG9nO1xuICAgIFxuICAgIC8vc2V0IHByZXR0eSB0cmFjaW5nIGluZm8uIFRoaXMgc2hhbGwgYmUgaW4gdGhlIGZpcnN0IGxpYnJhcnkgYWZ0ZXIgbWFpblxuICAgIGxldCBub3cgOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgbG9nRGF0ZSA6IHN0cmluZyA9IGZvcm1hdERhdGUobm93KTtcbiAgICBsZXQgbG9nVGltZSA6IHN0cmluZyA9IGZvcm1hdFRpbWUobm93KTtcbiAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHNlc3Npb25bXCJmc20tdHJhY2UtbGV2ZWxcIl0gPiAwKSB7XG4gICAgICAgICAgICAgICAgLy9vbmx5IGluY3JlYXNlIHRyYWNlIGlmIGVuYWJsZWQgYnkgU3RhcnQgaGFuZGxlciAocmFuZG9tIG9yIGxpc3QgYmFzZWQpXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiZXZlbnQtYWRkaXRpb25hbC1pbmZvXCJdIT1udWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25bXCJ0cmFjZS1za2V5XCJdID0gZXZlbnRbXCJldmVudC1hZGRpdGlvbmFsLWluZm9cIl1bXCJ0cmFjaW5naWRcIl07XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25bXCJ0cmFjZS10eXBlXCJdID0gbG9nRGF0ZStcIi1cIisgbG9nVGltZStcIl9cIitldmVudFtcImV2ZW50LWFkZGl0aW9uYWwtaW5mb1wiXVtcInRyYWNpbmdtc2dcIl07XG4gICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25bXCJ0cmFjZS10eXBlXCJdID0gbG9nRGF0ZStcIi1cIisgbG9nVGltZStcIl9NaXNzaW5nU3RhZ2luZ0luZm9cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25bXCJ0cmFjZS10eXBlXCJdID09IFwicmFuZG9tXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGlzIGEgcmFuZG9tIHRyYWNlIC0gc2V0IHRoZSB2YWx1ZSBmcm9tIGRlZmF1bHQgMSB0byAyLiBub3QgcG9zc2libGUgdG8gZ2V0IGl0IGZyb20gVUlSIGFzIHRoaXMgaXMgbGF0ZXIgaW4gdGhlIGZsb3cuIG1heWJlIGNvdWxkIGNoYW5nZSBpbiBsYXRlciBidXQgbm90IGNvbnNpZGVyZWQgeWV0XG4gICAgICAgICAgICAgICAgICAgIC8vXCJmc20tdHJhY2UtbGV2ZWxcIiBmaWVsZCBpbiB0aGUgc2Vzc2lvbiB0byBlaXRoZXIgMCAoYmFzaWMpLCAxIChpbnRlcm1lZGlhdGUpIG9yIDIgKGhpZ2gpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1wiZnNtLXRyYWNlLWxldmVsXCJdID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1wiZnNtLXRyYWNlLWxldmVsXCJdID0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2cuZXJyb3IoXCJnZXRfY2hlY2tIRjpFcnJvciBhZGRpbmcgdHJhY2UgZGV0YWlsczoge31cIixlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNhdmVldmVudChzZXNzaW9uOmFueSxldmVudDphbnksbG9jYWxQYXJhbXM6YW55KTogYW55IHtcbiAgICBzZXNzaW9uLnNfc2F2ZWRldmVudCA9IGV2ZW50O1xuXG4gICAgLy8gYXMgdGhpcyBpcyB1c2VkIGZvciBTSVAuT1BUSU9OU1xuICAgIC8vc2V0IHByZXR0eSB0cmFjaW5nIGluZm8uIFRoaXMgc2hhbGwgYmUgaW4gdGhlIGZpcnN0IGxpYnJhcnkgYWZ0ZXIgbWFpblxuICAgIGxldCBub3cgOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgbG9nRGF0ZSA6IHN0cmluZyA9IGZvcm1hdERhdGUobm93KTtcbiAgICBsZXQgbG9nVGltZSA6IHN0cmluZyA9IGZvcm1hdFRpbWUobm93KTtcbiAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHNlc3Npb25bXCJmc20tdHJhY2UtbGV2ZWxcIl0gPiAwKSB7XG4gICAgICAgICAgICAgICAgLy9vbmx5IGluY3JlYXNlIHRyYWNlIGlmIGVuYWJsZWQgYnkgU3RhcnQgaGFuZGxlciAocmFuZG9tIG9yIGxpc3QgYmFzZWQpXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50W1wiZXZlbnQtYWRkaXRpb25hbC1pbmZvXCJdIT1udWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25bXCJ0cmFjZS1za2V5XCJdID0gZXZlbnRbXCJldmVudC1hZGRpdGlvbmFsLWluZm9cIl1bXCJ0cmFjaW5naWRcIl07XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25bXCJ0cmFjZS10eXBlXCJdID0gbG9nRGF0ZStcIi1cIisgbG9nVGltZStcIl9cIitldmVudFtcImV2ZW50LWFkZGl0aW9uYWwtaW5mb1wiXVtcInRyYWNpbmdtc2dcIl07XG4gICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25bXCJ0cmFjZS10eXBlXCJdID0gbG9nRGF0ZStcIi1cIisgbG9nVGltZStcIl9NaXNzaW5nU3RhZ2luZ0luZm9cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25bXCJ0cmFjZS10eXBlXCJdID09IFwicmFuZG9tXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGlzIGEgcmFuZG9tIHRyYWNlIC0gc2V0IHRoZSB2YWx1ZSBmcm9tIGRlZmF1bHQgMSB0byAyLiBub3QgcG9zc2libGUgdG8gZ2V0IGl0IGZyb20gVUlSIGFzIHRoaXMgaXMgbGF0ZXIgaW4gdGhlIGZsb3cuIG1heWJlIGNvdWxkIGNoYW5nZSBpbiBsYXRlciBidXQgbm90IGNvbnNpZGVyZWQgeWV0XG4gICAgICAgICAgICAgICAgICAgIC8vXCJmc20tdHJhY2UtbGV2ZWxcIiBmaWVsZCBpbiB0aGUgc2Vzc2lvbiB0byBlaXRoZXIgMCAoYmFzaWMpLCAxIChpbnRlcm1lZGlhdGUpIG9yIDIgKGhpZ2gpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1wiZnNtLXRyYWNlLWxldmVsXCJdID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uW1wiZnNtLXRyYWNlLWxldmVsXCJdID0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2cuZXJyb3IoXCJnZXRfY2hlY2tIRjpFcnJvciBhZGRpbmcgdHJhY2UgZGV0YWlsczoge31cIixlKTtcbiAgICB9ICAgIFxufVxuIl19