import * as types from './mutation-types'

export const mutations = {
    [types.SIGN_IN] (state, user_payload) {
        state.accountNumber = user_payload
    },
    [types.SIGN_OUT] (state) {
        state.accountNumber = {}
        state.regUser = {}
    },
    [types.REGISTER] (state, reg_payload) {
        state.regUser = reg_payload
        state.accountNumber= reg_payload[0]
    },
    [types.ADDWEB3] (state, web_payload) {
        state.web3 = web_payload
    },
    [types.ADDCONTRACTS] (state, contract_payload) {
        state.contracts = contract_payload
    }
}