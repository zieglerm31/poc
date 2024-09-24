interface ResultCode {
    resultCode:string ;
}

function h3a_prepareRoData(session:any,event:any,localParams:any): any {
    
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="Success";
    
    //Get current Unix timestamp used for CCR event Time  AVP 55
    session.s_UnixTimeStamp = parseInt((new Date()).getTime()/1000);
    //Get IDP call attempt time in Unix timestamp format used for CCR Req. TimeStamp AVP 834
    session.s_CallAttemptUnix = parseInt(session.s_callAttemptTime/1000);


    //Compose CCR chargingIdentifier (may also used for Camel FCI) Camel callReferenceNuber + fix string "FEE" seperator + Camel callAttempt unix timestamp format
    let l_chargingIdentifier : string = session.s_callReferenceNumber + "FEE" + session.s_callAttemptTime;
    if (l_chargingIdentifier.length % 2 == 0) {

      session.s_chargingIdentifier = l_chargingIdentifier;

    } else {

      session.s_chargingIdentifier = l_chargingIdentifier + "F";

    }

    // Compose Calling Party for CCR in tel uri format AVP 831
    session.s_Calling_tel_uri = "tel:+" + session.s_CallingPartyNrNorm.user;

    // Compose Called Party for CCR in tel uri format AVP 832
    if (session.s_CC_prefix == session.s_homeCountryCode  ) {

      //Compose Roam-Type AVP 2223 for CCR
      session.s_Roam_Type = 0;

      if (session.s_CalledPartyNrNorm.parameters["network-context"].match(/^.*\.(4|1)\.\d$/)) {

        if (session.s_IDP.event.callStart.contact.user.match(/^0(?!0)/)) {

          session.s_Called_tel_uri ="tel:+" + session.s_homeCountryCode + session.s_IDP.event.callStart.contact.user;

        } else {

          session.s_Called_tel_uri = "tel:+" + session.s_CalledPartyNrNorm.user;

        }

      } else {

        if (session.s_CalledPartyNrNorm.user.match(/^1|^3|^5|^7|^8/)) {

          session.s_Called_tel_uri ="tel:+" + session.s_homeCountryCode + session.s_CalledPartyNrNorm.user;

        } else {

          session.s_Called_tel_uri ="tel:" + session.s_CalledPartyNrNorm.user;

        }
      }
    } else {

      //Compose Roam-Type AVP 2223 for CCR
      session.s_Roam_Type = 2;

      if (session.s_IDP.event.callStart.contact.user.match(/^0(?!0)/)) {

        session.s_Called_tel_uri ="tel:" + session.s_IDP.event.callStart.contact.user;

      } else if (session.s_CalledPartyNrNorm.parameters["network-context"].match(/^.*\.(4|1)\.\d$/)) {

        session.s_Called_tel_uri ="tel:+" + session.s_CalledPartyNrNorm.user;

      } else {

        session.s_Called_tel_uri ="tel:" + session.s_CalledPartyNrNorm.user;

      }
    } 

    //Compose Bearer Type for CCR SDP-Media-Identifier AVP 2207
    switch (session.s_IDP.event.camel.common.mediaType) {
      
      case "AUDIO": {
        session.s_CCR_Media_Id = 0;
        break;
      }
      case "VIDEO": {
        session.s_CCR_Media_Id = 1;
        break;
      }
      case "FAX": {
        session.s_CCR_Media_Id = 2;
        break;
      }
      default: {
        session.s_CCR_Media_Id = 0;
        break;
      }
    }

    //Compose Bearer Type for CCR Service-Identity AVP 2202 only for CFU scenario set
    try {

          if (session.s_IDP.event.camel.redirectReason == "FORWARDED_UNCONDITIONAL") {

            session.s_CC_Service_Identity = 101;

          } else {

            session.s_CC_Service_Identity = null;

          }

    } catch (e) {

      session.s_CC_Service_Identity = null;

    }

    return ret;
}