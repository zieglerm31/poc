"use strict";
;
function dispatch(event) {
    try {
        if (event.event.camel != null) {
            return "ocadmin:h3irs:h3irs_InternationalRoamingService_main";
        }
        else if (event["event-type"] == "camel") {
            return "ocadmin:h3irs:h3irs_InternationalRoamingService_main";
        }
    }
    catch (e) {
        return "ocadmin:h3irs:drop";
    }
    return "ocadmin:h3irs:drop";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxDQUFDO0FBS0QsU0FBUyxRQUFRLENBQUMsS0FBVztJQUd6QixJQUFJO1FBRUEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFFM0IsT0FBTyxzREFBc0QsQ0FBQztTQUVqRTthQUFNLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUV2QyxPQUFPLHNEQUFzRCxDQUFDO1NBRWpFO0tBRUo7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUVSLE9BQU8sb0JBQW9CLENBQUU7S0FDaEM7SUFHSixPQUFPLG9CQUFvQixDQUFFO0FBQzlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvL01BSU5CTE9DS1xuOy8qIGRlZmluZSBoZXJlIHRoZSBkaXNwYXRjaCBsb2dpYyAqL1xuXG4vLy8gLS0tIFNJVCAtLS0gLy8vXG5cbi8vIE1haW4gZGlzcGF0Y2ggbG9naWNcbmZ1bmN0aW9uIGRpc3BhdGNoKGV2ZW50IDogYW55KSA6IHN0cmluZyB7XG5cbiAgICAvLyBEaXNwYXRjaCBoM2lycyBjYW1lbFxuICAgIHRyeSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZXZlbnQuZXZlbnQuY2FtZWwgIT0gbnVsbCkge1xuXG4gICAgICAgICAgICByZXR1cm4gXCJvY2FkbWluOmgzaXJzOmgzaXJzX0ludGVybmF0aW9uYWxSb2FtaW5nU2VydmljZV9tYWluXCI7XG5cbiAgICAgICAgfSBlbHNlIGlmIChldmVudFtcImV2ZW50LXR5cGVcIl0gPT0gXCJjYW1lbFwiKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBcIm9jYWRtaW46aDNpcnM6aDNpcnNfSW50ZXJuYXRpb25hbFJvYW1pbmdTZXJ2aWNlX21haW5cIjtcblxuICAgICAgICB9XG5cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIFwib2NhZG1pbjpoM2lyczpkcm9wXCIgO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHRcblx0cmV0dXJuIFwib2NhZG1pbjpoM2lyczpkcm9wXCIgO1xufVxuIl19