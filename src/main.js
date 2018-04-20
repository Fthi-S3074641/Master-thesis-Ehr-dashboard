import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebaseApp } from './firebaseApp'


import TruffleContract from 'truffle-contract'

Vue.use(VueRouter)

import store from './store'

import App from './components/App.vue'
import Dashboard from './components/Dashboard.vue'
import Register from './components/Register.vue'
import AccessControl from './components/AccessControl.vue'
import Payments from './components/Payments.vue'
import ReadRecord from './components/ReadRecord.vue'
import AddRecord from './components/AddRecord.vue'
import { signOut } from './store/actions';


Object.defineProperty(Vue.prototype, '$TruffleContract', {value: TruffleContract})

const router =new VueRouter({
    mode: 'history',
    routes: [
        {path: '/register', component: Register},
        {path: '/dashboard', component: Dashboard,
        children: [
            {
              path: 'accesscontrol',
              component: AccessControl
            },
            {
              path: 'payments',
              component: Payments
            },
            {
                path: 'readrecord',
                component: ReadRecord
            },
            {
                path: 'addrecord',
                component: AddRecord
            }
          ]
    }
    ]

})


firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        router.push('/dashboard')
    } else {
        router.replace('/register')
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})