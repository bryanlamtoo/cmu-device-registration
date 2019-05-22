<template>
    <!-- BEGIN PAGE TITLE -->
    <div class="page-title"><i class="icon-custom-left"></i>
        <h3>My Devices</h3>
        <div class="pull-right actions">
            <!--<button class="btn btn-primary btn-cons" type="button" id="btn-new-ticket">New Device</button>-->
            <button class="btn btn-primary btn-cons" data-toggle="modal" data-target="#myModal"> Add new device</button>

        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="grid simple ">

                    <div class="grid-title no-border">
                        <h4>Registered <span class="semi-bold"> Devices</span></h4>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"></a>
                            <a href="#grid-config" data-toggle="modal" class="config"></a>
                            <a href="javascript:;" class="reload"></a>
                        </div>
                    </div>

                    <div class="grid-body no-border">
                        <table class="table table-striped table-flip-scroll cf">
                            <thead class="cf">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Device name</th>
                                <th>Device IMEI</th>
                                <th>Mac Address</th>
                                <th>Device Type</th>
                                <th>Operating System</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    1
                                </td>
                                <td>Iphone 7</td>
                                <td>869805994009333</td>
                                <td><span>6a:00:02:7c:5a:81!</span>
                                </td>
                                <td>Phone</td>
                                <td>IOS</td>
                                <td>
                                    <span class="label label-info">ACTIVE</span>

                                </td>
                                <td>
                                    <span class="fa fa-trash"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    2
                                </td>
                                <td>
                                    <div class="inline">Acer E456</div>

                                </td>
                                <td>869805994009333</td>
                                <td><span>6a:00:02:7c:5a:81</span>
                                </td>
                                <td>Tablet</td>
                                <td>Android</td>
                                <td>
                                    <span class="label label-info">ACTIVE</span>

                                </td>
                                <td><span class="fa fa-trash"></span></td>
                            </tr>
                            <tr>
                                <td>
                                    3
                                </td>
                                <td>Samsung Tablet</td>
                                <td>869805994009333</td>
                                <td><span>6a:00:02:7c:5a:81</span>
                                </td>
                                <td>Laptop</td>
                                <td>Linux</td>
                                <td>
                                    <span class="label label-info">ACTIVE</span>
                                </td>
                                <td><span class="fa fa-trash"></span></td>
                            </tr>
                            <tr>
                                <td>
                                    4
                                </td>
                                <td>Macbook pro</td>
                                <td>869805994009333</td>
                                <td><span>6a:00:02:7c:5a:81</span>
                                </td>
                                <td>Laptop</td>
                                <td>Mac OSx</td>
                                <td>
                                    <span class="label label-default">INACTIVE</span>
                                </td>
                                <td><span class="fa fa-trash"></span></td>
                            </tr>
                            </tbody>
                        </table>
                        <br>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <br>
                        <i class="fa fa-credit-card fa-7x"></i>
                        <h4 id="myModalLabel" class="semi-bold">Please note that you can only</h4>
                        <p class="no-margin">upto the 3 devices </p>
                        <br>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">

                                <div class="grid-body no-border">
                                    <br>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Device Name</label>
                                                <span class="help">e.g. "Windows PC"</span>
                                                <div class="controls">
                                                    <input v-model="device.name" type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Mac Address</label>
                                                <span class="help">e.g. "6a:00:02:7c:5a:81"</span>
                                                <div class="controls">
                                                    <input v-model="device.mac_address" type="text"
                                                           class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Device IME</label>
                                                <span class="help">e.g. "XXXXXXXXXXXXXXXXXX"</span>
                                                <div class="controls">
                                                    <input type="text" v-model="device.imei" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Device type</label>
                                                <span class="help">Select from the list</span>
                                                <div class="controls">

                                                    <select v-model="device.type" id="source" style="width:100%">
                                                        <option value="phone">Phone</option>
                                                        <option value="tablet">Tablet</option>
                                                        <option value="computer">Computer</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Operating System</label>
                                            <span class="help">Select from the list</span>
                                            <div class="controls">

                                                <select v-model="device.os" id="os" style="width:100%">
                                                    <option value="ios">IOS</option>
                                                    <option value="android">Android</option>
                                                    <option value="windows">Windows</option>
                                                    <option value="macOs">Mac OS</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Connection Type</label>
                                            <span class="help">Select from the list</span>
                                            <div class="controls">

                                                <select v-model="device.connectionType" id="ct" style="width:100%">
                                                    <option value="wlan">WLAN</option>
                                                    <option value="wired">WIRED</option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="col-md-6">
                                        <div class="row-fluid">
                                            <label class="form-label">Activate device</label>
                                            <div class="slide-primary">
                                                <input type="checkbox" name="switch" class="ios" checked="checked"/>
                                                <span> Enable this device</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" @click="saveDevice" data-dismiss="modal" class="btn btn-primary">Save
                        </button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->

    </div>
</template>

<script>

    import api from '../api/apiServices'

    export default {
        name: "Devices",

        data() {
            return {
                device: {}
            }
        },
        methods: {

            saveDevice() {

                console.log(this.device)
                //set the user ID
                this.device.userId = '5ce31954a4378217796b1620';

                api.addNewDevice(this.device).then(res => {
                    console.log(res)

                }).catch(err => {

                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>