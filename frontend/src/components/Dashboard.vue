<template>
    <div class="">
        <div class="page-title">
            <h3>Dashboard </h3>
        </div>
        <div id="container">
            <div class="row 2col">
                <div class="col-md-4 col-sm-6 spacing-bottom-sm spacing-bottom">
                    <div class="tiles blue added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> TOTAL USERS</div>
                            <div class="heading"><span class="animate-number" data-value="100"
                                                       data-animation-duration="1200">100</span>
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

                <div class="col-md-4 col-sm-6 spacing-bottom-sm spacing-bottom">
                    <div class="tiles green added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> TOTAL DEVICES</div>
                            <div class="heading"> <span class="animate-number" data-value="200" data-animation-duration="1000">200</span> </div>
                            <div class="progress transparent progress-small no-radius">
                                <div class="progress-bar progress-bar-white animate-progress-bar" data-percentage="79%"></div>
                            </div>
                            <div class="description"><i class="icon-custom-up"></i><span class="text-white mini-description ">&nbsp; 2% higher <span class="blend">than last month</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 spacing-bottom">
                    <div class="tiles red added-margin">
                        <div class="tiles-body">
                            <div class="controller">
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                            <div class="tiles-title"> ACTIVE DEVICES </div>
                            <div class="heading"><span class="animate-number" data-value="70" data-animation-duration="1200">70</span> </div>
                            <div class="progress transparent progress-white progress-small no-radius">
                                <div class="progress-bar progress-bar-white animate-progress-bar" data-percentage="45%"></div>
                            </div>
                            <div class="description"><i class="icon-custom-up"></i><span class="text-white mini-description ">&nbsp; 5% higher <span class="blend">than last month</span></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dashboard"
    }
</script>

<style scoped>

</style>