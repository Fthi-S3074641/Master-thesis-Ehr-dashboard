// import { request } from "http";

// import { request } from "https";

 /**
   * To add doctors
   * @param {org.acme.hospital.moreLive} addLive the doctor adding transaction
   * @transaction
  */


 async function moreLive(addLive) {
  var factory = getFactory();
  var nameSpace = 'org.acme.hospital';
 
  var doctorId = addLive.mydoctor;
  var patientId = addLive.mypatient;
 
      // Get the driver participant registry.
    return getParticipantRegistry(nameSpace + '.Doctor')
    .then(function (participantRegistry) {
      // Get the specific driver from the driver participant registry.
      return participantRegistry.get(doctorId);
    })
    .then(function (driver) {
      if(driver.myClients) { driver.myClients.push(patientId);  }
      else { driver.myClients = [patientId];  }
      return getParticipantRegistry(nameSpace + '.Doctor')
      .then(function (updateRegistry) {
        return updateRegistry.update(driver);
      })
    })
    .then(function (){
      return getParticipantRegistry(nameSpace + '.Patient')
      .then(function (patientRegistry) {
        return patientRegistry.get(patientId);
      })
      .then(function (patientDriver) {
        if(patientDriver.myReaders) { patientDriver.myReaders.push(doctorId);  }
         else { patientDriver.myReaders = [doctorId];  }
        return getParticipantRegistry(nameSpace + '.Patient')
        .then(function (updateRegistry) {
          return updateRegistry.update(patientDriver);
        })
      })
    })
    .catch(function (error) {
      // Add optional error handling here.
    });


 
//  let doctorRegistry = await getParticipantRegistry(nameSpace + '.Doctor');
//  await doctorRegistry.update(doctor);
   
//  let patient = await getParticipantRegistry(nameSpace + '.Patient');
//  await patient.get(patientId);

//      if(patient.myReaders) { patient.myReaders.push(doctorId);  }
//    else { patient.myReaders = [doctorId];  }
   
//  let patientRegistry = await getParticipantRegistry(nameSpace + '.Patient');
//  await patientRegistry.update(patient);
 
}

  /**
    * To add nurses
    * @param {org.acme.hospital.addNurses} adNur the nurse adding transaction
    * @transaction
    */

  async function addNurses(adNur) {
        var factory = getFactory();
        var nameSpace = 'org.acme.hospital';
      
        var doctor = adNur.mydoctor;
        var patient = adNur.mypatient;
      
        

      if(doctor.myClients) { doctor.myClients.push(patient.personId);  }
        else { doctor.myClients = [patient.personId];  }
      
      let doctorRegistry = await getParticipantRegistry(nameSpace + '.Doctor');
      await doctorRegistry.update(doctor);
        
          if(patient.myReaders) { patient.myReaders.push(doctor.personId);  }
        else { patient.myReaders = [doctor.personId];  }
        
      let patientRegistry = await getParticipantRegistry(nameSpace + '.Patient');
      await patientRegistry.update(patient);
  }

  
//   /**
//     * To add a patient
//     * @param {org.acme.hospital.addPatients} adPat  the patient adding instance.
//     * @transaction
//     */
//    function addPatient(adPat) {
//     var factory = getFactory();
//     var NameSpace = 'org.acme.hospital';
 
//     var patient = factory.newResource(NameSpace, 'Patient', 'patient2');
//     patient.name = 'ftu';
 
//     return getParticipantRegistry(NameSpace + '.Patient').then(function(patientRegistry) {
//       return patientRegistry.addAll([patient]); });
//   }


/**
  * to add medication
  * @param {org.acme.hospital.addMeLive} addLive the medication registration
  * @transaction
  */
 async function addMeLive(addLive) {
   var factory = getFactory();
   var nameSpace = 'org.acme.hospital';
  
   var patient = addLive.mypatient.personId;
   var doctor = addLive.mydoctor.personId;
   var message = 'Dr. '+ doctor + ' wants to read patient' + patient+ 'data';

   return getParticipantRegistry(nameSpace + '.Patient')
     .then(function(patientRegistry) {
         var basicEvent = factory.newEvent(nameSpace, 'addMeLiveEvent');
         basicEvent.theDoctor=doctor;
         basicEvent.thePatient=patient;
          basicEvent.theMessage = message;
         emit(basicEvent);
   })
    .catch(function(error) {
       throw new Error('PPProblem: '+ error)
    });
 }

// /**
//   * to prescribe a medication
//   * @param {org.acme.hospital.giveMedication} giveMed prescription instance
//   * @transaction
//   */
//  async function giveMedication(giveMed) {
//   var factory = getFactory();
//   var nameSpace = 'org.acme.hospital';
  
//   var patient = giveMed.mypatient;
//   var medication = giveMed.mymedication;
  
//   if(patient.myMedications) { patient.myMedications.push(medication);  }
//   else { patient.myMedications = [medication];  }
  
//   return getParticipantRegistry(nameSpace + '.Patient').then(function(patientRegistry) {
//     return patientRegistry.update(patient); });
// }
                                                             
 /**
  * to prescribe a medication
  * @param {org.acme.hospital.giveMedication} giveMed prescription instance
  * @transaction
  */
 async function giveMedication(giveMed) {
  var factory = getFactory();
  var nameSpace = 'org.acme.hospital';
  
  var patient = giveMed.mypatient;
  var medication = giveMed.mymedication;
  var doctor = giveMed.mydoctor;
   
   dAddress = doctor.personId;
   pAddress = patient.personId;

   URL = 'http://10.60.10.238:4000';
   /*const importerRegistry = await getAssetRegistry('org.acme.hospital.uriEthereum');
   var uriE = await importerRegistry.get('ETH');
   URL = uriE.urlETH;
   */
  /*return getAssetRegistry('org.acme.hospital.uriEthereum')
    .then(function (uriRegistry) {
      return uriRegistry.get('ETH');
    })
    .then(function (uriE) {
       URL = uriE.urlETH;
    })
    .catch(function (error) {
      throw new Error('URL not found: '+ error)
    });
   */
   var stock = await request.get({uri: `${URL}/verify?doctorAddress=${dAddress}&patientAddress=${pAddress}`, headers: {
        'User-Agent': 'Request-Promise' }, json: true})
    .then(function(res) {
          if (res === '1'){
                if(patient.myMedications) { patient.myMedications.push(medication);  }
                else { patient.myMedications = [medication];  }

                return getParticipantRegistry(nameSpace + '.Patient').then(function(patientRegistry) {
                  return patientRegistry.update(patient); });
          }
          })
          .catch(function(error) {
            throw new Error('There is problem: '+ error)
          });
}
                                                             
/**
  * to add sysmptoms
  * @param {org.acme.hospital.addSymptoms} addSym symptom addition
  * @transaction
  */
async function addSymptoms(addSym) {
  var facttory = getFactory();
  var nameSpace = 'org.acme.hospital';
  
  var patient = addSym.mypatient;
  var symptom = addSym.mysymptom;
  
  if(patient.mySymptoms){ patient.mySymptoms.push(symptom); }
  else { patient.mySymptoms = [symptom]; }
  
  return getParticipantRegistry(nameSpace + '.Patient').then(function(patientRegistry) {
    return patientRegistry.update(patient); });
  
  
}

/**
* to update the URL for Ethereum
* @param {org.acme.hospital.updateUrl} upUrl update instance
* @transaction
*/

async function updateUrl(upUrl) {
 var factory = getFactory();
 var nameSpace = 'org.acme.hospital';

 var newUrl = upUrl.newUrl;
 var uriethereum = upUrl.oldUrl;

 uriethereum.urlETH = newUrl;

 return getAssetRegistry(nameSpace+ '.uriEthereum').then (function(uriRegistry) {
   return uriRegistry.update(uriethereum);
 });
}

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
