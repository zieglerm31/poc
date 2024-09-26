interface ResultCode {
    resultCode:string ;
}

function h3a_validateCCA(session:any,event:any,localParams:any): any {
  
  // This function has to be called only after a CCA received from network
    
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="Success";
    
    //Save the received Diameter Credit Control Answer
    session.s_CCA = event; 

    //Validate Result-Code of CCA
    if (session.s_CCA.diameter.keys["Result-Code"][0].value == 2001) {

        // Validate Arrays of the diameter response
        for ( let eachElement of session.s_CCA.diameter.avps) {
            if (eachElement != null || eachElement != undefined || eachElement != "" || eachElement != " ") {
                switch(eachElement.name) { 
                    case "CC-Request-Number": {
                        //Store received Request-Number object AVP 415
                        session.s_CC_Request_Number_A = eachElement;
                        //Check if first CCA (number 0) is received
                        if (session.s_CC_Request_Number_A.value == 0) {

                            //Increment CCR-Request Number for next diameter CCR (e.g.: CCR-U, CCR-T)
                            session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;

                        } else {
                            //Check if correct sequence of CCA Request Number is received
                            if (session.s_CC_Request_Number_A.value == session.s_CC_Request_Number_A_plus_1) {

                                //Increment CCR-Request Number for next diameter CCR (e.g.: CCR-U, CCR-T)
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;

                            } else  {

                                // Increment last send CCR Number
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A_plus_1.value + 1;
                                //Return DiameterError and ResultCode
                                return ret.resultCode = "DiameterError." + "Wrong_CCA_Req_Number_received";
                            }
                        }
                        break; 
                    }
                    case "Multiple-Services-Credit-Control": {
                        //Store received Multiple-Services-Credit-Control object AVP 456
                        session.s_Multiple_Services_Credit_Control_A = eachElement;
                        //Store received CC-Time in seconds (type number) AVP 420
                        session.s_CC_Time_sec_A = session.s_Multiple_Services_Credit_Control_A.value[0].value[0].value;
                        break; 
                    }
                    case "CC-Request-Type": {
                        //Store received CC-Request-Type object AVP 416
                        session.s_CC_Request_Type_A = eachElement;
                        break; 
                    }
                }
            }
        }

        //Return DiameterSuccess and ResultCode
        return ret.resultCode = "DiameterSuccess." + session.s_CCA.diameter.keys["Result-Code"][0].value;

    } else {

        for ( let eachElement of session.s_CCA.diameter.avps) {
            if (eachElement != null || eachElement != undefined || eachElement != "" || eachElement != " ") {
                switch(eachElement.name) { 
                    case "CC-Request-Number": {
                        //Store received Request-Number object AVP 415
                        session.s_CC_Request_Number_A = eachElement;
                        //Check if first CCA (number 0) is received
                        if (session.s_CC_Request_Number_A.value == 0) {

                            //Increment CCR-Request Number for next diameter CCR (e.g.: CCR-U, CCR-T)
                            session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;

                        } else {
                            //Check if correct sequence of CCA Request Number is received
                            if (session.s_CC_Request_Number_A.value == session.s_CC_Request_Number_A_plus_1) {

                                //Increment CCR-Request Number for next diameter CCR (e.g.: CCR-U, CCR-T)
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A.value + 1;

                            } else  {

                                // Increment last send CCR Number
                                session.s_CC_Request_Number_A_plus_1 = session.s_CC_Request_Number_A_plus_1.value + 1;
                                //Return DiameterError and ResultCode
                                return ret.resultCode = "DiameterError." + "Wrong_CCA_Req_Number_received";
                            }
                        }
                        break; 
                    }
                    case "CC-Request-Type": {
                        //Store received CC-Request-Type object AVP 416
                        session.s_CC_Request_Type_A = eachElement;
                        break; 
                    }
                }
            }
        }

        //Return DiameterError and ResultCode
        return ret.resultCode = "DiameterError." + session.s_CCA.diameter.keys["Result-Code"][0].value;
    }

    //log.debug("Mazi-1 : {}", session.s_CallingPartyNr);

}