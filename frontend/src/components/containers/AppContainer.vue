<template>

    <div class="page-container">

        <!-- BEGIN HEADER -->
        <app-header></app-header>
        <!-- END HEADER -->

        <!-- BEGIN CONTENT -->
        <div class="page-container row-fluid">
            <app-sidebar></app-sidebar>
            <!-- BEGIN PAGE CONTAINER-->
            <div class="page-content">
                <div class="content">

                    <Breadcrumb :list="list"/>

                    <!-- END PAGE TITLE -->
                    <!-- BEGIN PlACE PAGE CONTENT HERE -->
                    <!-- END PLACE PAGE CONTENT HERE -->

                    <router-view></router-view>

                </div>
            </div>
            <!-- END PAGE CONTAINER -->

        </div>


    </div>

</template>

<script>
    import AppHeader from '@/components/containers/AppHeader'
    import AppSidebar from '@/components/containers/AppSidebar'
    import Breadcrumb from '@/components/Breadcrum/BreadCrumb'

    export default {

        name: "AppContainer",
        components: {
            AppHeader,
            AppSidebar,
            Breadcrumb
        },

        computed: {
            name() {
                return this.$route.name
            },
            list() {
                return this.$route.matched.filter((route) => route.name || route.meta.label)
            }
        }
    }
</script>

<style scoped>

</style>