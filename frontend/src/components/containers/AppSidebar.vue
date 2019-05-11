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
                        <div class="username">Brian <span class="semi-bold">Lamtoo</span></div>
                        <div class="status">Life goes on...</div>
                    </div>
                </div>
                <!-- END MINI-PROFILE -->
                <!-- BEGIN SIDEBAR MENU -->
                <p class="menu-title sm">BROWSE <span class="pull-right"><a href="javascript:;"><i
                        class="material-icons">refresh</i></a></span></p>
                <ul>
                    <!--<li class="start active ">-->
                        <!--<router-link to="/"><i class="material-icons">home</i> <span-->
                            <!--class="title">Home</span> <span class="selected"></span> </router-link>-->
                    <!--</li>-->
                    <li class="status active">
                        <router-link to="/devices"><i class="material-icons">airplay</i> <span
                                class="title">Devices</span> <span
                                class=" badge badge-disable pull-right ">3</span>
                        </router-link>
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
        name: "AppSidebar"
    }
</script>

<style scoped>

</style>