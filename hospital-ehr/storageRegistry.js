const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection,
 express = require('express'),
 Web3 = require('web3'),
 cors = require('cors'),
 storageReg = require('./storageRegistry');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log(web3.version.api);

var contract = "0x22205e003bee8b86ff5c07bd9d3b3cc24cf2d55a";

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "grantAccess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "patient",
				"type": "address"
			},
			{
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "verifyPriviledge",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "revokeAccess",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "who",
				"type": "string"
			}
		],
		"name": "userRegister",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "sendPayment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "requestPayment",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "x",
				"type": "address"
			}
		],
		"name": "didIGaveRights",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "identity",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "category",
				"type": "string"
			}
		],
		"name": "RegisterParticipant",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentRequested",
		"type": "event"
	}
];

var MyContract = web3.eth.contract(abi);
console.log(web3.eth.accounts);
var myContractInstance = MyContract.at(contract);


// ========================From here Composer-client=========================
this.bizNetworkConnection = new BusinessNetworkConnection();
this.cardName ='admin@hospital-ehr';
this.businessNetworkIdentifier = 'hospital-ehr';

this.businessNetworkDefinition = this.bizNetworkConnection.connect(this.cardName);
// .then((result) => {
// this.bizNetworkConnection.getParticipantRegistry('org.acme.hospital.Doctor')
// .then((registry) => {
// return registry.getAll();
// console.log('Reached here');
// })
// .then((aResources) => {
//  console.log('No.of accounts: '+aResources.length);
//  console.log('Account list');
//  let arrayLength = aResources.length;
//  for(let i = 0; i < arrayLength; i++) {
//  console.log(aResources[i].personId);
//  }
// })
// .catch(function (error) {
//  throw 'RSCC: ' +error;
// })
// })
// .catch(function (error) {
//  throw 'CONN: s'+error;
// });



this.bizNetworkConnection.on('event',(evt)=>{
 
 console.log(' — — — — — -Event happend — — — — -');
 console.log('From Account: ' +evt.theDoctor);
 console.log('to' + evt.thePatient);
 console.log('HMMMM: '+evt.theMessage);
 result = myContractInstance.didIGaveRights(evt.theDoctor, {from: evt.thePatient, gas:3000000});
 console.log(result.c[0]);
 if(result == '1'){

this.bizNetworkConnection.getTransactionRegistry('org.acme.hospital.addNurses')
.then((registry) => {
return registry.getAll();
})
.then((aResources) => {
 console.log('No.of accounts: '+aResources.length);
 console.log('Account list');
 let arrayLength = aResources.length;
 for(let i = 0; i < arrayLength; i++) {
 console.log(aResources[i].personId);
 }
})
.catch(function (error) {
 throw 'RSCC: ' +error;
})
	// let doctor = docregistry.get(evt.theDoctor);
	console.log('I am in '+doctor.personId);
	// let patientRegistry = this.bizNetworkConnection.getParticipantRegistry('org.acme.hospital.Patient');
	// let patient = patientRegistry.get(evt.thePatient)

	// let serializer = this.businessNetworkDefinition.getSerializer();

	// let resource = serializer.fromJSON({
	// '$class': 'org.acme.hospital.moreLive',
	// 'mydoctor': evt.theDoctor,
	// 'mypatient': evt.thePatient,
	// "when": "2018-04-19T18:08:41.020Z"
	// });

	// this.bizNetworkConnection.submitTransaction(resource);

 }
 else{
	 console.log('BUMMER');
 }
 
});



const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, User-Agent, Content-Type, Accept");
    next();
  });

app.get('/verify/', (req, res, next) => {
    // req.param('patient');
	// var doctor = req.param('doctor');
	var docAddress = req.param('doctorAddress');
	var patAddress = req.param('patientAddress');
    console.log(myContractInstance.didIGaveRights(docAddress, {from: patAddress, gas:3000000}));
    result = myContractInstance.didIGaveRights(docAddress, {from: patAddress, gas:3000000});
    var ret = result.c[0];
	console.log(ret);
	if(result == '1'){
		console.log(docAddress);
	}
    res.send(result)
});

app.get('/grant', (req, res) => {
    myContractInstance.grantAccess(web3.eth.accounts[0], {from: web3.eth.accounts[1], gas:3000000});
    res.send('granted')
});

app.get('/revoke', (req, res) => {
    myContractInstance.revokeAccess(web3.eth.accounts[0], {from: web3.eth.accounts[1], gas:3000000});
    res.send('revoked')
});

app.post('/api/createCard', function (req, res) {
	var transactionData = req.body.transactionData;
	var cardName = req.headers.authorization;
	var mynetwork = new MyNetwork(cardName);
	mynetwork.init().then(function () {
		return mynetwork.createCar(transactionData)
	}).then(function () {
		res.json({ success: true })
	}).catch(function (error) {
		res.status(500).json({error: error.toString()})    
	})
  });

app.listen(4000, () => console.log('Example app listening on port 3000!'))