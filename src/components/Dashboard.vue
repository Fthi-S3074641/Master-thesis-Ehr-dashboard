<template>
  <div class="">
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                <a href="/dashboard" class="left"> &nbsp; &nbsp;   &nbsp; &nbsp; Account-{{$store.state.accountNumber}}: {{ accAddress }} &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp;   &nbsp; Current balance: ETH {{ balance }} </a>
                      <!-- <ul id="nav-mobile" class="hide-on-med-and-down">
                        <li><router-link class="link" to="/dashboard/accesscontrol"> Access control </router-link></li>
                        <li><div class="divider"></div></li>
                        <li><router-link class="link" to="/dashboard/payments">Payments</router-link></li>
                      </ul> -->
                <a class="brand-logo right" @click="signOut">Sign out</a>
                </div>
            </nav>
        </div>
        <div class="container">
          <div class="form-group zipper" >
                  <div class="alternatives">
                    <label > &nbsp; Ethereum menu</label>
                      <ul id="nav-mobile" class="hide-on-med-and-down">
                        <!-- <li><div class="divider form-control"></div></li> -->
                        <router-link class="link" to="/dashboard/accesscontrol"> <h6>Access control</h6> </router-link>
                        <li><div class="divider form-control"></div></li>
                        <router-link class="link" to="/dashboard/readrecord"><h6>Read records</h6></router-link>
                        <li><div class="divider form-control"></div></li>
                        <router-link class="link" to="/dashboard/addrecord"><h6>Add records</h6></router-link>
                        <li><div class="divider form-control"></div></li>
                      <router-link class="link" to="/dashboard/payments"><h6>Payments</h6></router-link>
                        <li><div class="divider form-control"></div></li>
                      </ul>
                 </div>
                 <div class="nestedroute">
                   
                <router-view></router-view>
                 </div>
          </div>
        </div>         
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      accAddress: null,
      balance: null
    }
  },
  mounted() {
    this.getBalance()
  },
  methods: {
    signOut(){
      this.$store.dispatch('signOut')
    },
    getBalance(){
      this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': No ethereum accounts')
                  return
              }
              var account1 = accounts[this.$store.state.accountNumber]
              this.accAddress = account1

              this.$store.state.contracts.EhrContract.deployed().then((instance) => {
              var ehrInstance = instance
              return ehrInstance.getBalance({from: account1})
              }).then((result) => {
                  // console.log('Money: ', result)
                  this.balance = result.c[0] 
              }).catch((err) => {
                  console.log('You DONT have MONEY: ', err.message)
              })
          })
      }
  }

  }
</script>
