<template>
  <div class="form-group">
    <label><h5>Enter account to add medication </h5></label>
    <div class="form-inline">
    <input class="form-control" type="number" placeholder="Ethereum account" v-model="patient">
    <input class="form-control" type="text" placeholder="Medicine Id" v-model="medicine">
    <!-- <input class="form-control" type="text" placeholder="Additional information"> -->
    <button @click="privilegedAccount" type="button" > Add </button>
    <label> &nbsp; &nbsp; &nbsp; Medication: {{ eMessage }}</label>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      patient: null,
      medicine: null,
      docAddress: 'null',
      patientAddress: 'null',
      eMessage: '',
      priviledged: false,
      bizNetworkConnection: null
    }
  },
  methods: {
    addRecord() {
      // this.privilegedAccount()
      if(this.priviledged){
        this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': No ethereum accounts')
                  return
              }
              this.patientAddress = accounts[this.patient]
              this.docAddress = accounts[this.$store.state.accountNumber]
              this.giveMedication(this.docAddress, this.patientAddress)
          })
      }
      else{
        this.eMessage = ' You are not priviledged '
      }
    },
    giveMedication(doc, patient) {
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/giveMedication',
                    data: {
                        "$class": "org.acme.hospital.giveMedication",
                        "mydoctor": doc,
                        "mymedication": this.medicine,
                        "mypatient": patient,
                        "when": new Date()
                        },
                        headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }

                  })
                  .then((response) => {
                    console.log(response);
                      // this.$route.router.replace('/dashboard/readrecord');
                    this.eMessage = response.request['statusText'] 
                  }, (error) => {
                    this.eMessage = 'Error: failed attempt'
                  })
    },
    privilegedAccount() {
        this.$store.state.web3.eth.getAccounts((error, accounts) => {
            if(error) {
                console.log(error, ': no accounts')
                return
            }
            
            this.patientAddress = accounts[this.patient]
            this.docAddress = accounts[this.$store.state.accountNumber]

            this.$store.state.contracts.EhrContract.deployed().then((instance) => {
                var ehrInstance = instance
                return ehrInstance.didIGaveRights(this.docAddress, {from: this.patientAddress, gas:3000000})
            }).then((result) => {
              console.log(result)
                if(result.c[0] == '1'){ this.eMessage = '  YES privileged ' 
                this.priviledged = true
                this.addRecord()
                } else {
                  this.eMessage = ' You need priviledge: '
                  this.priviledged = false
                  }
                
            }).catch((err) => {
                console.log('Unsuccessful request: ', err.message)
                this.eMessage = err.message
                this.priviledged = false
            })
       })
    }
  },
  created() {
    this.priviledged = false;
  }
}
</script>

