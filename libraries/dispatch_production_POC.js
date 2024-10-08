"use strict";
;
function dispatch(event) {
    try {
        if (event.SIP.message.method[0].match(/^OPTIONS$/)) {
            if (event.SIP["R-URI"].value.match(/^sip:10/)) {
                return "production:poc:poc_main";
            }
        }
        else {
            try {
                if (event.SIP["message"]["body"][0].match("Subject: generic_test_sip")) {
                    return "production:poc:poc_main";
                }
            }
            catch (e) {
                return "production:poc:drop";
            }
            return "production:poc:poc_main";
        }
    }
    catch (e) {
        return "production:poc:drop";
    }
    return "production:poc:drop";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxDQUFDO0FBS0QsU0FBUyxRQUFRLENBQUMsS0FBVztJQUd6QixJQUFJO1FBRUEsSUFBSyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBRWpELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUUzQyxPQUFPLHlCQUF5QixDQUFDO2FBRXBDO1NBRUo7YUFBTTtZQUVILElBQUk7Z0JBR0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO29CQUVwRSxPQUFPLHlCQUF5QixDQUFDO2lCQUVwQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBRVIsT0FBTyxxQkFBcUIsQ0FBQzthQUVoQztZQUVELE9BQU8seUJBQXlCLENBQUM7U0FDcEM7S0FHSjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBRVIsT0FBTyxxQkFBcUIsQ0FBQztLQUNoQztJQUdKLE9BQU8scUJBQXFCLENBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vTUFJTkJMT0NLXG47LyogZGVmaW5lIGhlcmUgdGhlIGRpc3BhdGNoIGxvZ2ljICovXG5cbi8vLyAtLS0gUHJvZHVjdGlvbiAtLS0gLy8vXG5cbi8vIE1haW4gZGlzcGF0Y2ggbG9naWNcbmZ1bmN0aW9uIGRpc3BhdGNoKGV2ZW50IDogYW55KSA6IHN0cmluZyB7XG5cbiAgICAvLyBEaXNwYXRjaCBwb2MgU0lQIEludml0ZXMgJiBwb2MgU0lQIE9wdGlvbnNcbiAgICB0cnkge1xuXG4gICAgICAgIGlmICggZXZlbnQuU0lQLm1lc3NhZ2UubWV0aG9kWzBdLm1hdGNoKC9eT1BUSU9OUyQvKSkge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQuU0lQW1wiUi1VUklcIl0udmFsdWUubWF0Y2goL15zaXA6MTAvKSkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicHJvZHVjdGlvbjpwb2M6cG9jX21haW5cIjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvL29ubHkgZm9yIHRlc3RpbmcgcHVycG9zZVxuICAgICAgICAgICAgICAgIC8vdGhpcyBpcyBmb3IgZ2VuZXJpY190ZXN0X3NpcC54bWwgZmxvdyB0byB0ZXN0IHRoZSBUQVMtU0lQIG1vZHVsZSBjaGFpbiB3aXRoIHNpcHAuIHR5cGUzIHRlc3RcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuU0lQW1wibWVzc2FnZVwiXVtcImJvZHlcIl1bMF0ubWF0Y2goXCJTdWJqZWN0OiBnZW5lcmljX3Rlc3Rfc2lwXCIpKSB7ICAgICBcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwcm9kdWN0aW9uOnBvYzpwb2NfbWFpblwiO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwcm9kdWN0aW9uOnBvYzpkcm9wXCI7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFwicHJvZHVjdGlvbjpwb2M6cG9jX21haW5cIjtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICByZXR1cm4gXCJwcm9kdWN0aW9uOnBvYzpkcm9wXCI7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdFxuXHRyZXR1cm4gXCJwcm9kdWN0aW9uOnBvYzpkcm9wXCI7XG59XG4iXX0=