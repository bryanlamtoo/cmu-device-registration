<template>
    <div>
        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar " id="main-menu">
            <!-- BEGIN MINI-PROFILE -->
            <div class="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
                <div class="user-info-wrapper sm">
                    <div class="profile-wrapper sm">
                        <img src="assets/img/profiles/avatar.png" alt="" data-src="assets/img/profiles/avatar.png"
                             data-src-retina="assets/img/profiles/avatar.png" width="69" height="69"/>
                        <div class="availability-bubble online"></div>
                    </div>
                    <div class="user-info sm">
                        <div class="username">{{userDetails.firstName}} <span
                                class="semi-bold">{{userDetails.lastName}}</span></div>
                        <div class="status">{{userDetails.email}}</div>
                    </div>
                </div>
                <!-- END MINI-PROFILE -->
                <!-- BEGIN SIDEBAR MENU -->
                <p class="menu-title sm">BROWSE <span class="pull-right"><a href="javascript:;"><i
                        class="material-icons">refresh</i></a></span></p>
                <ul>
                    <li>
                        <router-link to="/"><i class="material-icons">home</i> <span class="title">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="status active">
                        <router-link to="/devices">
                            <i class="material-icons">airplay</i>
                            <span class="title">Devices</span> <span class=" badge badge-disable pull-right ">3</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/manageUsers"><i class="fa fa-users"></i><span
                                class="title">Manage Users</span></router-link>
                    </li>
                    <li>
                        <router-link to="/manageDevices"><i class="fa fa-users"></i><span
                                class="title">Manage Devices</span></router-link>
                    </li>


                </ul>

                <div class="clearfix"></div>
                <!-- END SIDEBAR MENU -->
            </div>
        </div>
        <a href="#" class="scrollup">Scroll</a>
        <div class="footer-widget">

            <p>Carnegie Mellon University - Africa</p>

        </div>
        <!-- END SIDEBAR -->
    </div>
</template>

<script>
    export default {
        name: "AppSidebar",

        computed: {
            userDetails() {
                return this.$store.getters.user
            }
        }
    }
</script>

<style scoped>

</style>