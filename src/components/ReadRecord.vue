<template>
  <div class="form-group">
<label><h5>Enter account to read EHR </h5></label>
<div class="form-inline">
<input class="form-control" type="number" placeholder="Ethereum account" v-model="patient">
<button @click="privilegedAccount"> Read </button>
    <label> &nbsp; &nbsp; &nbsp; Medication: {{ eMessage }}</label>
</div>
                    <table>
                      <thead>
                        <tr>
                            <th>Doctors</th>
                            <th>Medications</th>
                            <th>Given when</th>
                        </tr>
                      </thead>
                      <tbody>

                            <tr v-for="arr in bigJson">
                              <td>{{arr.mydoctor}}</td>
                              <td>{{arr.mymedication}}</td>
                              <td>{{arr.when}}</td>
                            </tr>
                          </tbody>
                    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
    patient: null,
    docAddress: null,
    patientAddress: null,
    eMessage: '',
    priviledged: false,
    bigJson: null
    }
  },
  methods: {
    readRecord() {
      if(this.priviledged){
        this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': No ethereum accounts')
                  return
              }
              this.patientAddress = accounts[this.patient]
              this.docAddress = accounts[this.$store.state.accountNumber]
              this.getMedication(this.docAddress, this.patientAddress)
          })
      }
      else{
        this.eMessage = ' You are not priviledged '
      }
    },
    getMedication() {
      axios.get(`http://localhost:3000/api/giveMedication`)
      .then(json => {
        this.eMessage = 'Success'
          this.bigJson = json.data
         console.log(json.data) 
      })
      .catch(e => {
        return { error: e }
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
                this.readRecord()
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
  }
}
</script>
