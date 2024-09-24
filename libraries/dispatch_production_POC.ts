
/* define here the dispatch logic */

/// --- Production --- ///

// Main dispatch logic
function dispatch(event : any) : string {

    // Dispatch poc SIP Invites & poc SIP Options
    try {

        if ( event.SIP.message.method[0].match(/^OPTIONS$/) && event.SIP["R-URI"].address.uri.user != null) {

            if (event.SIP["R-URI"].address.uri.user.match(/^sip:10.20.110.18/)) {

                return "production:poc:poc_main";
                
            } 

        } else if (event.SIP.Route[0].address.uri.host.match(/^poc/)) {

            return "production:poc:poc_main";
            
        }

    } catch (e) {

        return "production:poc:poc_Drop" ;
    }

    // Default
	return "production:poc:poc_Drop" ;
}