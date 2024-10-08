

function setdestination(session : any, event : any, localParams: any ){
    let viasource= event.SIP["message"]["body"][0];
    let tmp=viasource.split('Via:')[1];
    let tmp2=tmp.split('\r\n')[0];
    //tmp2 is now all via
    tmp=tmp2.split(',').pop();
    //tmp is now last via that is the sourceip (plus pre and port at end) of sipp
    tmp2=tmp.split(' ').pop();    
    session.source_inviteip=tmp2.split(':')[0];
    session.destination_inviteip=session.source_inviteip;
    session.destination_inviteport="5062";

    session.destination="sip:1000001@" + session.destination_inviteip + ":" + session.destination_inviteport;

}

function justproxy(session : any, event : any, localParams: any ){
    setdestination(session,event,localParams);

    session.destination="sip:1000001@" + session.destination_inviteip + ":" + session.destination_inviteport;

}

function addheader(session : any, event : any, localParams: any ){    
    
    let addHeaders = [];
    let removeHeaders = [];

    //get and set destination 
    setdestination(session,event,localParams);
    session.destination="sip:1000002@" + session.destination_inviteip + ":" + session.destination_inviteport;

    //add history-info header
    let hi: Header = {};
    hi.header = "History-Info";
    hi.value = "sip:+11004366087962011@172.20.208.99;user=phone";
    let addHistoryInfo = [];
    addHistoryInfo.push(hi);
    addHeaders.push(addHistoryInfo[0]);
    //add 2nd header
    let niceheader: Header = {};
    niceheader.header = "MyNewHeader";
    niceheader.value = "whateveryoulike";
    addHeaders.push(niceheader);
    //if all headers are added - add to session 
    session.addHeaders = JSON.stringify(addHeaders);

    //now remove a header
    removeHeaders.push("Subject");
    session.removeHeaders = JSON.stringify(removeHeaders);

    //Set headers for outgoing message
    //let headerVars : HeaderVars;
    //headerVars = headerVars || {};
    //headerVars.disableSendDefaultReason = "Disabled";
    //headerVars.disableSendNoAnswerReason = "Disabled";    
    //session.headerrulevar=JSON.stringify(headerVars);
    
    //select header rule set in TAS for proxy/b2bua scenarios
    session.headerrulesselect = "SipServiceSpecificRulesSet";

    // session.ringingtones = JSON.stringify(ringingTones);

    //let events : Events;
    //events = events || {};
    //events.InfoPollEvent="null";
    //events.SuccessResponsePollEvent="null";
    //events.SIPRingingPollEvent="null";
    //events.RawContentPollEvent="test/test";
    //session.events = JSON.stringify(events);
   

    //let unsub = {"InfoPollEvent":"", "SuccessResponsePollEvent":"", "SIPRingingPollEvent":"", "RawContentPollEvent":""};
    //session.unsubscribeEvents=JSON.stringify(unsub);
    //let unsub = {"SIP18xAnswerEvent":""};
    //session.unsubscribeEvents=JSON.stringify(unsub);    


    //Specify the Mode for the SNF, so SNF adds itself to Record-Route (needed for b2bua) or not (proxy)
    //headerVars.privateServiceMode = session.s_PrivateServiceMode;

    /*        
    let capabilities : any[] = [];
    capabilities.push(Capabilities.PEM);
    capabilities.push(Capabilities.REL1XX);
    capabilities.push(Capabilities.UPDATE);
    capabilities.push(Capabilities.FORKING);
    //session.upstreamCapabilities = JSON.stringify(capabilities);
    */
    //set the action for the call 
    //let pollAction : CallPollAction = {};
    //pollAction.type = actionType;
    //session.sendAction = JSON.stringify(pollAction);

    return "success";
}

function b2bualeave(session : any, event : any, localParams: any ){
    setdestination(session,event,localParams);

    session.destination="sip:1000006@" + session.destination_inviteip + ":" + session.destination_inviteport;

}

function setPreconditionForwadCallb2b(session:any,event:any,localParams:any): ResultCode {

    let ret: ResultCode ;
    ret = ret || {};
    ret.resultCode="success";
    
    let events : Events;
    events = events || {};

    
    events.SIPPollEvent="null";
    //typos in the below
    events.SIP18xInformatoinalEvent="null";
    events.SdpAnswerEvent="null";
    events.SIPReINVITEEvent="null";
    events.SDPOfferPollEvent="null";
    events.SipRingingPollEvent="null";
    events.SipSdpOfferPollEvent="null";
    events.SIPegClosedEvent="null";
    
    events.CallBeingForwardedPollEvent="null";
    events.SIPSdpAnswerPollEvent="null";

    events.RingingPollEvent="null";




    events.SIP18xAnswerEvent="null";
    events.SIPRingingPollEvent="null";
    //needs a handle
    events.InfoPollEvent="null";
    events.SuccessResponsePollEvent="null";
    events.RawContentPollEvent="test/test";
    session.events = JSON.stringify(events);  

    //let unsub = {"InfoPollEvent":"", "SuccessResponsePollEvent":"", "SIPRingingPollEvent":"", "RawContentPollEvent":""};
    //session.unsubscribeEvents=JSON.stringify(unsub);
    //let unsub = {"SIP18xAnswerEvent":""};
    //session.unsubscribeEvents=JSON.stringify(unsub);

    //Set headers for outgoing message
    let headerVars : HeaderVars;
    headerVars = headerVars || {};
    headerVars.disableSendDefaultReason = "Disabled";
    headerVars.disableSendNoAnswerReason = "Disabled";
    session.headerrulevar=JSON.stringify(headerVars);
    session.headerrulesselect = "SipServiceSpecificRulesSet";

    //Specify the Mode for the SNF, so SNF adds itself to Record-Route (needed for b2bua) or not (proxy)
    //not needed here - this is in SNF to apply some rules for b2b
    //headerVars.privateServiceMode = "b2bua"";
    
    /*
    //this requires a Supported: 100Rel in the incoming request and sends a 183 to A with Require: 100Rel 
    let capabilities : any[] = [];
    capabilities.push(Capabilities.PEM);
    capabilities.push(Capabilities.REL1XX);
    capabilities.push(Capabilities.UPDATE);
    capabilities.push(Capabilities.FORKING);
    session.upstreamCapabilities = JSON.stringify(capabilities);
    */

    /*
    let capabilities = session.s_InitialCapabilities;
    if( capabilities!=null){
        capabilities.push(Capabilities.PEM);
        capabilities.push(Capabilities.FORKING);
        session.outCapabilities = JSON.stringify(capabilities);
    }
    */

    // session.ringingtones = JSON.stringify(ringingTones);

    return ret;
}


function checkSDPAnswerAction(session:any,event:any,localParams:any)  {
    //eventData is now last messgae
    let eventData = localParams.message;

    //add the poll actions (accept, forward, reject) to the callpoll ansewr event
    //InformationalEvent is a high-level interface typically specialized for concrete events. The CallUser is not required to take any action for this event, these are purely informational.
    //PollEvent is an event on which the CallUser is expected to take an action upon receiving the event. The action is usually by invoking the PollEvent methods accept, reject or forward.
    let pollAction : CallPollAction;
    pollAction = pollAction || {};
    //pollAction.type = CallPollActionType.Accept;
    pollAction.type = CallPollActionType.Reject;
    session.sendAction = JSON.stringify(pollAction);

    return true;
}


function storeInitialInvite(session:any,event:any,localParams:any)  {
    let initialMsg = localParams.message;
    session.initial = initialMsg;
    return "stored";
}


function modifydisposition(session:any,event:any,localParams:any) {
    let initialMsg = localParams.message;
    if (initialMsg["SIP"]["capabilities"] != null) {
        if (initialMsg["SIP"]["capabilities"].indexOf(Capabilities.FORKING) > -1) {
            //it is present. means the SIP header "Request-Disposition: no-fork" is NOT present. This instructs TAS to not send 183 before forwarding the INVITE
            let capabilities : any[] = [];
            
            //the below creates exception 
            //capabilities = initialMsg.SIP.capabilities;
            //capabilities.push(Capabilities.FORKING);
            //this would be remove
            //let index= initialMsg["SIP"]["capabilities"].indexOf(Capabilities.FORKING);
            //initialMsg["SIP"]["capabilities"].splice(index, 1); // 2nd parameter means remove one item only
            session.upstreamCapabilities = JSON.stringify(capabilities);    
        }
    }

    if (initialMsg["SIP"]["R-URI"]["value"] == "sip:972000019@172.31.11.142:5062") {
        session.destlist = ["sip:9900004@172.31.11.142:5062", "sip:9900099@172.31.11.142:5062"];
    }
    

    return true;
}


function setdestinationlist(session:any,event:any,localParams:any) {
    let initialMsg = localParams.message;

    if (initialMsg["SIP"]["R-URI"]["value"] == "sip:972000019@172.31.11.142:5062") {
        session.destlist = ["sip:9900011@172.31.11.142:5062", "sip:9900022@172.31.11.142:5064", "sip:9900033@172.31.11.142:5065"];
    }
    
    return true;
}



