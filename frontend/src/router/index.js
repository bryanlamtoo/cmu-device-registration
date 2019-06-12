import Vue from 'vue'
import Router from 'vue-router'
import AppContainer from "@/components/containers/AppContainer";
import Devices from "@/components/Devices";
import Page404 from "@/components/pages/Page404";
import UserList from "../components/UserList";
import Dashboard from "../components/Dashboard";
import Signin from "../components/auth/Signin";
import store from '../store'

Vue.use(Router)

export default new Router({

    mode: 'history',
    linkActiveClass: 'open active',
    routes: [

        {
            path: '/',
            component: AppContainer,
            name: 'Home',

            children: [
                {
                    path: '',
                    component: Dashboard,
                    name: 'Dashboard'
                },
                {
                    path: '/devices',
                    component: Devices,
                    name: 'My Devices'
                },
                {
                    path: '/manageUsers',
                    component: UserList,
                    name: 'Manage Users'
                },
            ],
            beforeEnter(to, from, next) {
                if (store.state.idToken) {
                    next()
                } else
                    next('/signin')
            }
        },
        {
            path: '/signin',
            component: Signin,
            name: 'Sign in',
            beforeEnter(to, from, next) {
                if (store.state.idToken) {
                    next('/')
                } else
                    next()
            }
        },

        {
            path: '/404',
            component: Page404,
            name: 'Page404'
        }
    ]

})