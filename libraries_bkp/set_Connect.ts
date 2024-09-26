function set_DestinationRoutingNr(session:any,event:any,localParams:any): any {
 
    // Set Default ResultCode and prepare logging for case if needed
    let ret: ResultCode;
    let log : any = session.log;
    ret = ret || {};
    ret.resultCode="success";
 
    // Build Routing Number according W3 - CMI MVNO introduction in network live - LLD MVNO CMI_IMSI_MIN_TRIGGER_Ver.PA2.xlsx
    let l_dialedNumber : string = session.s_IDP.event.callStart.contact.user
    let l_dialdNetworkContext : string = session.s_IDP.event.callStart.contact.parameters["network-context"];
    let l_TON : string[] = l_dialdNetworkContext.split(".");
    let l_CallingPartyNrNorm : string = session.s_CallingPartyNrNorm.user;
    let l_mscAddress :string = session.s_mscAddress;
 
    //When CMI subscriber is roaming (VLR != 39) in MO part a CAP Continue has to be sent
    if (session.s_homeCountryCode != session.s_CC_prefix) {
 
        return ret.resultCode="CMI_Roaming";
 
    }
      session.s_sitRange = false;

    if ((l_CallingPartyNrNorm.match(/^393241200/)) || (l_CallingPartyNrNorm.match(/^393241300/))) {  //CMI + ELITE
        session.s_sitRange = true;
    } 
 
    if (l_dialedNumber.match(/^(0(?!0)|1|3|4|5|7|8)/) && l_TON[1].match(/^(0|3)$/g)) {
 
        //Special Pre-Announcement Number start with 456
        if (l_dialedNumber.match(/^456/)) {
 
            //session.s_DR_Nr = l_dialedNumber.replace(/^456/,"CC889436600391").substr(0,20);
 
            //Number range for SIT calling Party number: from 393241200000 to 393241200999 needs specail routing prefix: C8890399
            if (l_CallingPartyNrNorm.match(/^393241200/)) {
 
                //fierina
                session.s_DR_Nr = l_dialedNumber.replace(/^456/,"CC8890399");
 
            //All other calling Party number (also MNP numbers) are considered as production number and get following routing prefix: CC8890391
            } else {
 
                //Fierina
 
                session.s_DR_Nr = l_dialedNumber.replace(/^456/,"CC8890391");
 
            }
            
            return ret.resultCode="PreAnnouncement";
 
           } else {

            if (l_dialedNumber ==="3201010079") {
               
               if (session.s_sitRange === true) {
                session.s_DR_Nr = "CC804393201010079"; 
               } else {
                session.s_DR_Nr = "CC801393201010079";    
               }
               
            } else {
             
            if (l_dialedNumber ==="4010079") {
              
              if (session.s_sitRange === true) {
                session.s_DR_Nr = "CC803399079"; 
               } else {
                session.s_DR_Nr = "CC803391079";    
               }

            
            } else {

          session.s_DR_Nr = session.s_prefixToConnect + "39" + l_dialedNumber;
         }
    } 
}
    } else if (l_dialedNumber.match(/^00/) && l_TON[1].match(/^(0|3)$/g)) {

            if (l_dialedNumber.replace(/^00/,"") ==="393201010079") {
               
               if (session.s_sitRange === true) {
                session.s_DR_Nr = "CC804393201010079"; 
               } else {
                session.s_DR_Nr = "CC801393201010079";    
               }
               
            } else {
        
        session.s_DR_Nr = session.s_prefixToConnect + l_dialedNumber.replace(/^00/,"");
    }
    } else if (l_TON[1].match(/^(1|4)$/g)) {

    if (l_dialedNumber === "393201010079") { //IVR Call SIT & PROD

        if (session.s_sitRange === true) {
         session.s_DR_Nr = "CC804393201010079";   
        } else {
        session.s_DR_Nr = "CC801393201010079";   
        }
        
    } else {

     session.s_DR_Nr = session.s_prefixToConnect + l_dialedNumber;   
    }
}      
    if  (session.s_CCRRoleOfNode == 2) {


            if (l_dialedNumber === "393201010087") {
           
              session.s_DR_Nr = "CC802" + l_dialedNumber;
           
       } else {
 
        session.s_DR_Nr = session.s_prefixToConnect + l_dialedNumber;
      }
    }
 
    return ret;
}