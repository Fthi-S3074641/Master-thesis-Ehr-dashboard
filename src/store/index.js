import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    accountNumber:  '',
    regUser: {
        accountNumber: '',
        role: ''
    },
    web3: null,
    contracts: {}
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})