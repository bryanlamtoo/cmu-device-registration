import Vue from 'vue'
import Router from 'vue-router'
import AppContainer from "@/components/containers/AppContainer";
import Devices from "@/components/Devices";
import Page404 from "@/components/pages/Page404";

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
                    path: 'devices',
                    name: 'MyDevices',
                    component: Devices
                }
            ]
        },
        {
            path:'/404',
            component: Page404,
            name: 'Page404'
        }
    ]

})