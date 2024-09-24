
/* define here the dispatch logic */

/// --- SIT --- ///

// Main dispatch logic
function dispatch(event : any) : string {

    // Dispatch h3irs SIP Invites & h3irs SIP Options
    try {

        if ( event.SIP.message.method[0].match(/^OPTIONS$/) && event.SIP["R-URI"].address.uri.user != null) {

            if (event.SIP["R-URI"].address.uri.user.match(/^h3irs_/)) {

                return "ocadmin:h3irs:h3irs_InternationalRoamingService_main";
                
            } 

        } else if (event.SIP.Route[0].address.uri.host.match(/^irs/)) {

            return "ocadmin:h3irs:h3irs_InternationalRoamingService_main";
            
        }

    } catch (e) {

        return "ocadmin:h3irs:drop" ;
    }

    // Default
	return "ocadmin:h3irs:drop" ;
}
