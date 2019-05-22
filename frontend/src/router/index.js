import Vue from 'vue'
import Router from 'vue-router'
import AppContainer from "@/components/containers/AppContainer";
import Devices from "@/components/Devices";
import Page404 from "@/components/pages/Page404";
import UserList from "../components/UserList";
import Dashboard from "../components/Dashboard";

Vue.use(Router)

export default new Router({

    mode: 'history',
    base: process.env.BASE_URL,
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
            ]
        },

        {
            path: '/404',
            component: Page404,
            name: 'Page404'
        }
    ]

})