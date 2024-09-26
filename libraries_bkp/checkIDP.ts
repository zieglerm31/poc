
//DEPS:utils:LATEST
namespace OCCPCAP{  export interface Address {
    scheme: string ,
    user: string ,
    params :{any},
  }

  export interface Call {
    legs:[Address],
    state: string
  }
  export interface ChargingUnit {
    tariffTimeChange:number ,
    amount:number ,
    unit: string ,
    tariffChangeUsage:string ,
    direction: string ,
    reportingReason: string
  }
  export interface ChargingParamSet {
    usedUnits:[ChargingUnit]
  }
  export interface Camel {
    sccpCdPa: Address ,
    cgPaCategory: number ,
    callReferenceNumber: string ,
    highLayerCharacteristics: number,
    charging: ChargingParamSet,
    gsmFwdPending: boolean,
    eventTypeBCSM:number ,
    mscAddress:Address ,
    vlrAddress: Address ,
    sccpCgPa:Address ,
    bearerServiceCode:number,
    locationNumber: Address,
    networkProtocol: string
  }
  export interface Event {
    camel : Camel,
    name : string ,
    callStart : CallStartParam,
    id : number
  }

  export interface CallStartParam {
    contact:Address,
    cause: string ,
    leg:Address
  }

  export interface CallStartEvent {
    callid : string ,
    call : Call,
    as : string ,
    eventtime : number ,
    starttime : number ,
    event : Event ,
    queue : string
  }

}

interface ResultCode {
    resultCode:string ;
}

function get_checkIDP(session:any,event:any,localParams:any): any {
    
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="Success";

    //add prettytrace directly into the first function
    //this sets the parameters that show up at the trace gui
    let now : Date = new Date();
    let logDate : string = formatDate(now);
    let logTime : string = formatTime(now);
    try {
            if (session["fsm-trace-level"] > 0) {
                //only increase trace if enabled by Start handler (random or list based)
                if (event["event-additional-info"]!=null) {
                    session["trace-skey"] = event["event-additional-info"]["tracingid"];
                    session["trace-type"] = logDate+"-"+ logTime+"_"+event["event-additional-info"]["tracingmsg"];
                } else  {
                    session["trace-type"] = logDate+"-"+ logTime+"_MissingStagingInfo";
                }
                if (session["trace-type"] == "random") {
                    //this is a random trace - set the value from default 1 to 2. not possible to get it from UIR as this is later in the flow. maybe could change in later but not considered yet
                    //"fsm-trace-level" field in the session to either 0 (basic), 1 (intermediate) or 2 (high);
                    session["fsm-trace-level"] = 2;
                } else {
                    session["fsm-trace-level"] = 2;
                }
            }
    } catch (e) {
        log.error("get_checkHF:Error adding trace details: {}",e);
    }
    //end prettytrace

    session.s_IDP = event;
    session.s_CalledPartyNr = session.s_IDP.event.callStart.contact.user;
    session.s_CallingPartyNr = session.s_IDP.event.callStart.leg.user;
    session.s_callReferenceNumber = session.s_IDP.event.camel.callReferenceNumber;
    session.s_callAttemptTime = session.s_IDP.event.camel.common.callAttemptTime;
    session.s_mscAddress = session.s_IDP.event.camel.mscAddress.user;

    //In case of CFU vlrAddress is not existing in CAP IDP
    if (session.s_IDP.event.camel.vlrAddress) {

      session.s_vlrAddress = session.s_IDP.event.camel.vlrAddress.user;

    } else {

      session.s_vlrAddress = session.s_mscAddress;

    }

    if (session.s_CalledPartyNr.match(/^43/)){

        session.s_callInAustria = "Y";
    }
    
    //Determine Country Code for number Normalization
    let l_vlrAddress : string = session.s_vlrAddress;
    // Visiting Country Code Prefix
    session.s_CC_prefix = l_vlrAddress.substr(0,2);

    //HomeCountryCode for normalization
    //Quick workaround, has to be replaced by best match via LDAP search for mscroaming table
    //session.s_Norm_prefix = session.s_IDP.event.camel.sccpCdPa.user.substr(0,2); // Every Service/subscriber has its on sccp called GT e.g.: CMI starts with 39, H3A starts with 43
    //session.s_Norm_prefix = "39"; // for CMI subscriber

    //Get Visited Location Register (where subscriber is roaming)
    session.s_MSCRoamingDN = session.s_IDP.event.camel.sccpCgPa.user;


    //Define CallType (MOC,MTC,CFMOC) based on parameters in IDP

    if (session.s_IDP.event.camel.eventTypeBCSM==2) {

      if (session.s_IDP.event.camel.redirectReason != null) {

        session.s_CallType = "CFMOC_IDP2";
        session.s_CCRRoleOfNode = 2;   
        return ret;

      } else {

        session.s_CallType = "MOC_IDP2"
        session.s_CCRRoleOfNode = 0;
        return ret;
      }

    } else if (session.s_IDP.event.camel.eventTypeBCSM==3) {

      if (session.s_IDP.event.camel.redirectReason != null) {

        session.s_CallType = "CFMOC_IDP3";
        session.s_CCRRoleOfNode = 2;
        return ret;

      } else {

        session.s_CallType = "MOC_IDP3"
        session.s_CCRRoleOfNode = 0;
        return ret;
      }

    } else if (session.s_IDP.event.camel.eventTypeBCSM==12) {

      session.s_CallType = "MTC_IDP12"
      session.s_CCRRoleOfNode = 1;
      return ret;

    } else {

      return ret.resultCode="No_IDP";

    }

    //log.debug("Mazi-1 : {}", session.s_CallingPartyNr);

}
