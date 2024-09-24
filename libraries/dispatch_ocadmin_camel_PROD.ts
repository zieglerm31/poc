
/* define here the dispatch logic */

/// --- PROD --- ///

// Main dispatch logic
function dispatch(event : any) : string {

    // Dispatch h3irs camel
    try {
        
        if (event.event.camel != null) {

            return "ocadmin:h3irs:h3irs_InternationalRoamingService_main";

        } else if (event["event-type"] == "camel") {

            return "ocadmin:h3irs:h3irs_InternationalRoamingService_main";

        }

    } catch (e) {

        return "ocadmin:h3rsi:H3RSI_Drop" ;
    }

    // Default
	return "ocadmin:h3rsi:H3RSI_Drop" ;
}