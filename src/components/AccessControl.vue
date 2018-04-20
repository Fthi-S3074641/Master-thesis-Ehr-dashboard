<template>
  <div class="form-group">
<label><h5>Enter an account to give priviledge</h5></label>
<div class="form-inline">
<input class="form-control" type="number" placeholder="Ethereum account" v-model="secondary">
<button @click="grantAccess"> Give</button>
<button @click="revokeAccess"> Revoke</button>
<button @click="didIGaveRights"> Verify</button>
<label> &nbsp; &nbsp;   &nbsp; &nbsp; {{output}}</label>
</div>
                    <table>
                      <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr>
                              <td>account xyz</td>
                              <td>doctor</td>
                            </tr>
                          </tbody>
                    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: '',
      secondary: null,
      account: null
    }
  },
  methods: {
      grantAccess() {
            this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': no accounts')
                  return
              }
              this.account = accounts[this.$store.state.accountNumber]
              var addr = accounts[this.secondary]
              this.$store.state.contracts.EhrContract.deployed().then((instance) => {
                  var ehrInstance = instance
                  return ehrInstance.grantAccess(addr, {from: this.account, gas:3000000})
              }).then((result) => {
                  console.log('Access granting SucceSS: ', result)
                  this.output = 'Success: ' + result.tx
              }).catch((err) => {
                  console.log('No access granting: ', err.message)
                  this.output = err.message
              })
          })
      },
      revokeAccess() {
           this.$store.state.web3.eth.getAccounts((error, accounts) => {
              if(error) {
                  console.log(error, ': no accounts')
                  return
              }
              this.account = accounts[this.$store.state.accountNumber]
              var addr = accounts[this.secondary]
             this.$store.state.contracts.EhrContract.deployed().then((instance) => {
                  var ehrInstance = instance
                  return ehrInstance.revokeAccess(addr, {from: this.account, gas:3000000})
              }).then((result) => {
                  console.log('Access revoking SucceSS: ', result)
                  this.output = 'Success: ' + result.tx
              }).catch((err) => {
                  console.log('No access revoking: ', err.message)
                  this.output = err.message
              })
          })
      },
      didIGaveRights() {
        this.$store.state.web3.eth.getAccounts((error, accounts) => {
            if(error) {
                console.log(error, ': no accounts')
                return
            }
            this.account = accounts[this.$store.state.accountNumber]
            var addr = accounts[this.secondary]
            this.$store.state.contracts.EhrContract.deployed().then((instance) => {
                var ehrInstance = instance
                return ehrInstance.didIGaveRights(addr, {from: this.account, gas:3000000})
            }).then((result) => {
              console.log(result)
                if(result.c[0] == '1'){ this.output = '  YES privileged ' } else {this.output = ' Not privileged: '}
            }).catch((err) => {
                console.log('Unsuccessful request: ', err.message)
                this.output = err.message
            })
       })
      }
  }
}
</script>

