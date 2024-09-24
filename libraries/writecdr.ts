function writeCDR(sessionData: any, event : any, localParams: any) : any {
    let log = sessionData.log;
    let cdr : OfflineCDR;


    if( sessionData.cdr ==null ){
        cdr = {};
        sessionData.cdr = cdr;
    } else {
        cdr = sessionData.cdr;
    }


      sessionData.cdr.a_idp = sessionData.s_CamelInfo.callingPartyNorm.substr(1);
      sessionData.cdr.a_pai= sessionData.s_pai;
      sessionData.cdr.a_from = sessionData.s_from;
      sessionData.cdr.a_privacy = sessionData.s_privacy;
      sessionData.cdr.a_location = sessionData.s_CamelInfo.MCCMNC;
      sessionData.cdr.a_country = sessionData.s_CamelInfo.RoamingNetwork;
      sessionData.cdr.a_callid = sessionData.s_InitialInvite.callid;
      sessionData.cdr.a_present = sessionData.s_CamelInfo.Presentation;
      sessionData.cdr.a_date  = new Date().toString();

    cdr.queue="cdrQueue";
    cdr.irs = {};
    log.debug("CDR:{}",JSON.stringify(cdr));

    if ( sessionData.cdr==null) {
        return "error";
    }

    return "success";
}
