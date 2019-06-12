<template>
    <div class="">
        <div class="page-title">
            <h3>Dashboard </h3>
        </div>
        <div id="container">
            <div class="row 2col">
                <div class="col-md-3 col-sm-3 spacing-bottom-sm spacing-bottom">
                    <div class="tiles blue added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> TOTAL USERS</div>
                            <div class="heading"><span class="animate-number" :data-value="userStats.totalUsers"
                                                       data-animation-duration="1200">{{userStats.totalUsers}}</span>
                            </div>
                            <div class="progress transparent progress-small no-radius">
                                <div class="progress-bar progress-bar-white animate-progress-bar"
                                     data-percentage="28.2%"></div>
                            </div>
                            <div class="description"><i class="icon-custom-up"></i><span
                                    class="text-white mini-description ">&nbsp; 4% higher <span class="blend">than last month</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-3 spacing-bottom-sm spacing-bottom">
                    <div class="tiles cmu added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> TOTAL DEVICES</div>
                            <div class="heading"><span class="animate-number" :data-value="deviceStats.totalDevices"
                                                       data-animation-duration="1000">{{deviceStats.totalDevices}}</span>
                            </div>
                            <div class="progress transparent progress-small no-radius">
                                <div class="progress-bar progress-bar-white animate-progress-bar"
                                     data-percentage="79%"></div>
                            </div>
                            <div class="description"><i class="icon-custom-up"></i><span
                                    class="text-white mini-description ">&nbsp; {{percentageIncreaseDevices}}% higher <span
                                    class="blend">than last month</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-3 spacing-bottom">
                    <div class="tiles red added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> ACTIVE DEVICES</div>
                            <div class="heading"><span class="animate-number"
                                                       :data-value="deviceStats.totalActiveDevices"
                                                       data-animation-duration="1200">{{deviceStats.totalActiveDevices}}</span>
                            </div>
                            <div class="progress transparent progress-white progress-small no-radius">
                                <div class="progress-bar progress-bar-white animate-progress-bar"
                                     data-percentage="45%"></div>
                            </div>
                            <div class="description"><i class="icon-custom-up"></i><span
                                    class="text-white mini-description ">&nbsp; 5% higher <span class="blend">than last month</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6 spacing-bottom-sm spacing-bottom">
                    <div class="tiles green added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> DEVICES THIS MONTH</div>
                            <div class="heading"><span class="animate-number" :data-value="deviceStats.devicesThisMonth"
                                                       data-animation-duration="1000">{{deviceStats.devicesThisMonth}}</span>
                            </div>
                            <div class="progress transparent progress-small no-radius">
                                <div class="progress-bar progress-bar-white animate-progress-bar"
                                     data-percentage="79%"></div>
                            </div>
                            <div class="description"><i class="icon-custom-up"></i><span
                                    class="text-white mini-description ">&nbsp; 2% higher <span class="blend">than last month</span></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import api from '../api/apiServices'

    export default {
        name: "Dashboard",
        data() {
            return {
                deviceStats: {},
                userStats: {},
                recentDevices: {},
            }
        },
        // mounted() {
        //     window.addEventListener('unload', this.getDeviceStats)
        // },
        // beforeDestroy(){
        //     window.removeEventListener('unload', this.getDeviceStats)
        // },
        async created() {
            this.getDeviceStats()
            this.getUserStats()
            this.getRecentDevices()
        },
        methods: {
            getDeviceStats() {
                api.getDevicesStats().then(result => {
                    if (result.data) {
                        this.deviceStats = result.data
                    }

                })
            },
            getUserStats() {
                api.getUsersStats().then(result => {
                    if (result.data) {
                        console.log(result.data)
                        this.userStats = result.data
                    }

                })
            },
            getRecentDevices() {
                api.getRecentlyAddedDevices().then(result => {
                    if (result.data) {
                        // console.log(result)
                        this.recentDevices = result.data
                    }

                })
            }
        },
        computed: {

            percentageIncreaseDevices: function () {

                return ((this.deviceStats.devicesThisMonth - this.deviceStats.devicesLastMonth) / this.deviceStats.devicesLastMonth) * 100
            },
            userDetails(){
                return this.$store.getters.user
            },
            auth(){
                return this.$store.getters.isAuthenticated
            }
        }
    }
</script>

<style scoped>

</style>