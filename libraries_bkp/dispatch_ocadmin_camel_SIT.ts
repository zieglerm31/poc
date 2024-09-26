
/* define here the dispatch logic */

/// --- SIT --- ///

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

        return "ocadmin:h3irs:drop" ;
    }

    // Default
	return "ocadmin:h3irs:drop" ;
}
