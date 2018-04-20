import * as types from './mutation-types'
import { firebaseApp } from '../firebaseApp'

export const signIn = ({commit}, user_payload) => {
    firebaseApp.auth().signInWithEmailAndPassword('fthiabadi@gmail.com', 'No2ftalem')
    .catch(error => {
      this.error = error
    })
    commit(types.SIGN_IN, user_payload)

}

export const signOut = ({commit}) => {
    firebaseApp.auth().signOut()
    commit(types.SIGN_OUT)
}

export const regUser = ({commit}, reg_payload) => {
    firebaseApp.auth().signInWithEmailAndPassword('fthiabadi@gmail.com', 'No2ftalem')
    .catch(error => {
      this.error = error
    })
    commit(types.REGISTER, reg_payload)
}

export const addWeb3 = ({commit}, web_payload) => {
    commit(types.ADDWEB3, web_payload)
}

export const addContracts = ({commit}, contract_payload) => {
    commit(types.ADDCONTRACTS, contract_payload)
}