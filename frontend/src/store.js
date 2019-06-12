import Vue from 'vue'
import VueX from 'vuex'
import api from './api/apiServices'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'
import router from './router/index'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(VueX)

export default new VueX.Store({
    state: {
        idToken: null,
        user: null


    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token
            state.user = userData.user
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.idToken}`;
        },
        clearAuthUser(state) {
            state.idToken = null
            state.user = null
        }
    },
    actions: {
        login({commit}, authData) {
            return api.signInUser(authData)
        },
        logout({commit}) {
            commit('clearAuthUser')
            router.replace('/signin')
        }

    },
    getters: {
        user(state) {
            return state.user
        },

        tokenId(state) {
            return state.idToken
        },

        isAuthenticated(state) {
            return state.idToken !== null
        }
    },
    plugins:[
        vuexLocal.plugin
    ]
})