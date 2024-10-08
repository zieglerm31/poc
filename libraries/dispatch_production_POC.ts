
/* define here the dispatch logic */

/// --- Production --- ///

// Main dispatch logic
function dispatch(event : any) : string {

    // Dispatch poc SIP Invites & poc SIP Options
    try {

        if ( event.SIP.message.method[0].match(/^OPTIONS$/)) {

            if (event.SIP["R-URI"].value.match(/^sip:10/)) {

                return "production:poc:poc_main";
                
            } 

        } else {

            try {
                //only for testing purpose
                //this is for generic_test_sip.xml flow to test the TAS-SIP module chain with sipp. type3 test
                if (event.SIP["message"]["body"][0].match("Subject: generic_test_sip")) {     

                    return "production:poc:generic_test_sip";
                    
                }
            } catch (e) {

                return "production:poc:drop";

            }

            return "production:poc:generic_test_sip";
        }
        

    } catch (e) {

        return "production:poc:drop";
    }

    // Default
	return "production:poc:drop";
}
