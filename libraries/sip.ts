
interface Leg {
  address : string;
  name : string
}
interface Call {
  state : number
}

enum Capabilities {
  REL1XX = "REL1XX",
  FORKING= "FORKING",
  PRECONDITION="PRECONDITION",
  PEM="PEM",
  UPDATE="UPDATE"
}

interface Message {
  method : [string];
  type : [string];
  body : [string]
}

interface SIP {
  capabilities : [Capabilities];
  message : Message
}

interface CallStart {
  contact : string;
  cause: string;
  leg : string
}

interface CallPoll {
  name: string;
  type: string;
  leg: string
}

interface Event {
  name : string;
  callStart? : CallStart;
  callPoll? : CallPoll
}


interface OCCPEvent {
  callid : string;
  call : Call;
  as : string;
  eventtime : number;
  SIP : SIP;
  event: Event
}

interface Events {
  SuccessResponsePollEvent? : string;
  RawContentPollEvent? : string;
  InfoPollEvent?: string;
}
/**
  Define header variables used by application
*/
interface HeaderVars {
  disableSendDefaultReason? : string;
  disableSendNoAnswerReason? : string
}

enum Annotype {
  CONNECT = "CONNECT",
  RINGING = "RING"
}

interface RingingTone {
  anno_name : string;
  anno_type : Annotype
}

interface Session {
  log : any;
  inCapabilities : [Capabilities];
  outCapabilities? : string;
  events? : string;
  headerrulevar? : string;
  headerrulesselect? : string;
  ringingtones? : string;
  sendAction? : string ;
  SIPHelper : any;
  SIPInitialInvite? : any;
  SIPMessage? : any;
  SIPMessageType? : any
}


enum CallPollActionType {
 Accept = "accept",
 Forward = "forward",
 Reject = "reject",
}

enum CallStartActionType {
 Abort = 0,
 Forward = 1,
 RejectMrf = 2
}



/**
 Set action for CallStart event
*/
interface CallStartAction {
 type : CallStartActionType;
 errorcode : number;
 cause : string ;
 uri : string;
 earlymedia : number;
 legname : string 
}

/**
 Set action for CallPoll event
*/
interface CallPollAction {
 type : CallPollActionType
}


/**
 Application can set action for a specific leg, this is applicable for MRF contact
 */
interface LegAction {
 type : CallStartActionType ;
 legaction : string
}

enum MediaOperationActionType {
 PerformMediaOperation = "performMediaOperation"
}

enum MediaOperationContentType {
 MSML = "application/msml+xml"
}

interface PerformMediaOperation {
 ContentType : MediaOperationContentType;
 Content : string
}

interface MediaOperationAction {
 type : number;
 legaction : MediaOperationActionType;
 performMediaOperation : PerformMediaOperation
}

interface Action {
 action : any 
}


interface Header {
 header : string;
 value : string;
}

interface QHeader {
 Privacy : string;
 Reason : string ;
}

interface Parameter {
 transport : string;
 user : string ;
}

interface URI {
 scheme : string;
 authority : string ;
 gr : string ;
 host: string ;
 lr : string ;
 maddr : string ;
 port : number  ;
 user : string ;
 parameters : [Parameter];
 qheader : [QHeader];
}

interface Address {
 displayName : string;
 uri : URI 
}

interface HistoryInfo implements Header {
 address : Address;
 index : string
}

interface PAI implements Header  {
 address : Address
}

interface From implements Header {
 address : Address;
 tag : string ;
}

interface To implements Header {
 address : Address;
 tag : string;
}

interface PCV implements Header {
 icid_generated_at: string ;
 icid_value : string ;
 oaid : string;
 taid : string;
 osid : string;
 tsid : string;
}


interface ResultCode {
  resultCode : string ;
}

/* this is the entry point */
function setPreconditionForwadCall(session:any,event:any,localParams:any): ResultCode {
 let ret: ResultCode ;
    ret = ret || {};
    ret.resultCode="success";

    let status2 : string;
    let events : Events;
    events = events || {};
    events.InfoPollEvent="null";
    events.SuccessResponsePollEvent="null";
    events.SIPRingingPollEvent="null";
    events.RawContentPollEvent="test/test";

    //Set headers for outgoing message
    let headerVars : HeaderVars;
    headerVars = headerVars || {};
    headerVars.disableSendDefaultReason = "Disabled";
    headerVars.disableSendNoAnswerReason = "Disabled";

    //headerVars.newContact = session.contactList;
    //headerVars.privateServiceMode = "proxy";
    //headerVars.pani = session.s_CamelInfo.vlrAddress + ";CS";
    //headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=23210e6104070";

    try {
      // Add HF for SNF routing (ocsnfconf show policy), is deleted 
      headerVars.xVtasRoute = "irsRoute";

      // Add HF X-VTaS_IRS HF including callInformation
      headerVars.xVtasIRS = "irs;roampartnername=\"" + session.s_CamelInfo.RoamingNetwork + "\";roamccndc=" + session.s_CamelInfo.CCNDC + ";roammccmnc=" + session.s_CamelInfo.MCCMNC + ";reroutingnumber=" + session.s_RequestURI.address.uri.number;
          
      if (session.s_CamelInfo.cgID.match(/^cgid:/)) {

        headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=" + session.s_CamelInfo.cgID.replace("cgid:","") + ";CS";

      } else {

        headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=" + session.s_CamelInfo.MCCMNC + ";CS";

      }
    } catch (e) {

      headerVars.pani = "3GPP-UTRAN;utran-cell-id-3gpp=" + session.s_CamelInfo.MCCMNC + ";CS";

    }
    
    //headerVars.psu = session.s_InitialInvite.SIP["P-Asserted-Identity"][0].value;
     
     
     headerVars.psu = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">";
     headerVars.newPai = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">";

    if (session.s_CamelInfo.Presentation == 0) {

   headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;

    } else {

   headerVars.newFrom = "\"Anonymous\" <sip:anonymous@anonymous.invalid>;tag=" + session.s_InitialInvite.SIP["From"].tag;

   }

   if(( session.s_from.match(/^[a-zA-Z]/ )) !=null){
     session.s_from ="anonymous" ;
   }

  if ((session.s_CamelInfo.Presentation == 0) && (session.s_pai != null) && (session.s_from != null) && (session.s_privacy != null)) {

       if ((session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_privacy==="none")){
       
       headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;

       } else {
        
      if ((session.s_privacy !== "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !=="anonymous")) {
       
       session.writecdr=1;
      
       headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
             
       } else {

      if ((session.s_privacy === "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !==session.s_pai)) {
       
       session.writecdr=1;
      headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;

      } else {
      
      if ((session.s_privacy !== "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from ==="anonymous")){
        session.writecdr=1;

      } else {

      if ((session.s_pai != session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_privacy === "none")) {
      headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
       session.writecdr=1;
         }
        }
       } 
      }     
    } 
  } else {
   
if ((session.s_CamelInfo.Presentation == 0) && (session.s_pai != null) && (session.s_from != null) && (session.s_privacy == null)) {

     if (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) {
       
       headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;


    } else {

      if ((session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !==session.s_pai)) {
       
       session.writecdr=1;
      headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
    } else {

      if (session.s_pai != session.s_CamelInfo.callingPartyNorm.substr(1)) {
      headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
      session.writecdr=1;
      }
    }
  }    
} else {

  if ((session.s_CamelInfo.Presentation == 0) && (session.s_pai == null) && (session.s_from != null) && (session.s_privacy == null)) {

    headerVars.newFrom = "<tel:" + session.s_CamelInfo.callingPartyNorm + ">;tag=" + session.s_InitialInvite.SIP["From"].tag;
    session.writecdr=1;

    }     
  }  
}    
  if ((session.s_CamelInfo.Presentation == 1) && (session.s_pai != null) && (session.s_from != null) && (session.s_privacy != null)){

       if ((session.s_privacy !== "none") && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from ==="anonymous")){

        headerVars.newFrom = "\"Anonymous\" <sip:anonymous@anonymous.invalid>;tag=" + session.s_InitialInvite.SIP["From"].tag;

      } else {
        
        if ((session.s_privacy === "none") && (session.s_pai != session.s_from) && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1) )) {
         
          session.writecdr=1;

        } else {
      
      if ((session.s_privacy !== "none") && (session.s_pai == session.s_from) && (session.s_pai == session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from !=="anonymous")) {

         session.writecdr=1;
         
         } else {

      if ((session.s_pai != session.s_CamelInfo.callingPartyNorm.substr(1)) && (session.s_from ==="anonymous")) {

        headerVars.newFrom = "\"Anonymous\" <sip:anonymous@anonymous.invalid>;tag=" + session.s_InitialInvite.SIP["From"].tag;
        
        session.writecdr=1;

          }
         }
        }
      }
     }


    let capabilities = session.inCapabilities;
    if( capabilities!=null){
        capabilities.push(Capabilities.PEM);
        capabilities.push(Capabilities.FORKING);
        session.outCapabilities = JSON.stringify(capabilities);
    }

    session.events = JSON.stringify(events);
    session.headerrulevar=JSON.stringify(headerVars);
    session.headerrulesselect = "SipServiceSpecificRulesSet";

    return ret;
}

function buildVTAS_HF(vtasServiceName:string,startSign:string,endSign:string,assignSign:string,seperatorSign:string,abbrevations:string[],...sessionValues:any[]): string {

  // Build the VTAS HF for the service e.g.:
  //Example: 
  // X-VTAS-RSI: rsi;cdn=4312703774;uri=sip:+4312703774@id1522.imsnetwork.at;sdba=ActKey=FIX|GEO_OTHER|G20,app=sdbAction,dc=apd;a=1021;m=B
  // For details check chapter 2.2 of vTAS ICS Routing Services vRSI documentation
  
  // Moved to function input abbrevations!
  //let l_Abbreviation : string[] = ["ANr","DNn","URI","SA","A","M"];

  // incrementer to access the right l_Abbreviation for the sessionValues
  let i:number = 0;
  let l_HF_Info:string = ";";

  // Length of sessionValues has to be equal length of l_Abbreviation otherwise inconsistency of VTAS_HF
  if (sessionValues.length == abbrevations.length) {

      for ( let sessionElement of sessionValues) {
        
        l_HF_Info = l_HF_Info + startSign + abbrevations[i] + assignSign + "\"" + sessionElement + "\"" + endSign + seperatorSign;
        i++;

      }

      // Remove last seperator sign at the End of the HF
      return vtasServiceName + l_HF_Info.replace(/;$/,"");

  } else {

    return "Inconsistency between amount of abbrevations and sessionValues"

  }
}