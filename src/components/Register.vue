<template>
  <div class="container">
    <div class="form-inline registration">

    <div class="form-group login-div">
      <label><h5>Sign in to Ethereum</h5></label>
      <br>
      <input class="form-control" type="number" placeholder="Ethereum account" v-model="accountNumber">
      <button class="btn btn-primary" @click="signInEthereum">Sign In</button>
      <p>{{ errorSignIn.message }}</p>
    </div>
        <div class="divider-line">
        </div>
      <div class="form-group register-div">
        <label> <h5>Register if you are a new user</h5></label>
        <br>
        <input class="form-control" type="number" placeholder="Ethereum account" v-model="accountNumber">
        <input class="form-control" type="text" placeholder="Role" v-model="role">
        <button class="btn btn-danger" @click="registerEthereum">Register</button>
        <p>{{ error.message }}</p>
        <!-- regUser([accountNumber, role]) -->
      </div>
    </div>
  </div>

</template>

<script>
import ehrJson from '../../build/contracts/Ehr.json'
import { mapActions } from 'vuex'
import Web3 from 'web3'
import axios from 'axios'

export default {
  data() {
    return {
      web3Provider: null,
      contracts: {},
      accountNumber: '',
      role: '',
      error: {
        message: ''
      },
      errorSignIn: {
        message: '',
        extra: ''
      }
    }
  },
  mounted() {
    this.getProvider()
  },
  methods: {
    getProvider() {
          this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
          this.$store.dispatch('addWeb3', new Web3(this.web3Provider))
          this.getContract()
    },
    getContract() {
          this.contracts.EhrContract  = this.$TruffleContract(ehrJson)
          this.contracts.EhrContract.setProvider(this.web3Provider)
          this.$store.dispatch('addContracts', this.contracts)
          this.networkCheck()
    },
    networkCheck() {
      this.$store.state.web3.version.getNetwork((err, netId) => {
        if(err){
          console.log(err, 'There is no ganache-cli or testrpc')
          return
        }
        this.accAddress = this.$store.state.web3.eth.accounts[this.$store.state.accountNumber]
        console.log('A local network discovered: ', netId)
        })
        // this.getBalance()
    },
    registerEthereum(){
      this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': No ethereum accounts')
                  return
              }
              var account1 = accounts[this.accountNumber]
              // ============================
              this.$store.state.contracts.EhrContract.deployed().then((instance) => {
                  var ehrInstance = instance
                  return ehrInstance.userRegister(this.role, {from: account1, gas:3000000})
              }).then((result) => {
                  this.error = result
                this.ledgerRegistration(account1, this.role)
                this.$store.dispatch('regUser', [this.accountNumber,this.role])
              }).catch((err) => {
                this.error = err
              })
          })
      },
      ledgerRegistration(account1, role) {
        console.log('Registration attempt to Hyperledger', account1, ': with the role of: ', role)
          axios({
                    method: 'post',
                    url: `http://localhost:3000/api/${role}`,
                    data: {
                        "$class": `org.acme.hospital.${role}`,
                        "personId": account1,
                        "name": this.role
                        }
                  })
                    .then(function (response) {
                      console.log(response);
                })
                  .catch(function (error) {
                  console.log(error);
                });
      },
      signInEthereum() {
         this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': No ethereum accounts')
                  return
              }
              var account1 = accounts[this.accountNumber]
              this.$store.state.contracts.EhrContract.deployed().then((instance) => {
                  var ehrInstance = instance
                  return ehrInstance.getBalance({from: account1})
              }).then((result) => {
                  // console.log('Account available: ', result)
                  if(result.c[0] >= 1 && this.accountNumber <=9 && this.accountNumber >=0) {
                  this.$store.dispatch('signIn', this.accountNumber)
                  }else {
                    this.errorSignIn.message = 'Register first using 0 to 9 accounts'
                  }
              }).catch((err) => {
                  this.error = err
              })
          })
      }
  }

}
</script>
