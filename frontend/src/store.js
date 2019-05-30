import Vue from 'vue'
import VueX from 'vuex'
import api from './api/apiServices'

Vue.use(VueX)

export default new VueX.Store({
    state: {
        idToken: null,
        userId: null

    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.token
            state.userId = userData.userId
        }
    },
    actions: {
        login({commit}, authData) {
            console.log('Login Data ', authData)

            return api.signInUser(authData).then(result => {

                commit('authUser',{
                    token: result.data.token,
                    userId: result.data.userId
                })
            })
        }
    },
    getters: {}
})