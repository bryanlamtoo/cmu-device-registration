/* eslint-disable */
<template>
    <div class="row-fluid">
        <div class="page-title"><i class="icon-custom-left"></i>
            <h3>Manage - <span class="semi-bold">Devices</span></h3>
            <div class="pull-right actions">
                <button class="btn btn-primary btn-cons" data-toggle="modal" data-target="#myModal"> Add new device
                </button>
            </div>
        </div>

        <div class="span12">
            <div class="grid simple ">
                <div class="grid-title">
                    <h4>Registered <span class="semi-bold"> Devices</span></h4>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"></a>
                        <a href="#grid-config" data-toggle="modal" class="config"></a>
                        <a href="javascript:;" class="reload"></a>
                    </div>
                </div>
                <div v-if="devicesFound" class="grid-body ">
                    <table class="table table-striped table-flip-scroll cf">
                        <thead class="cf">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Serial</th>
                            <th>Mac Address</th>
                            <th>Type</th>
                            <th>Connection</th>
                            <th>OS</th>
                            <th>Make</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(device,index) in deviceList" v-bind:key="device._id" class="odd gradeX">
                            <td>{{++index}}</td>
                            <td>{{device.hostName}}</td>
                            <td>{{device.serial}}</td>
                            <td><span>{{device.mac}}</span>
                            </td>
                            <td>{{device.deviceType | capitalize}}</td>
                            <td>{{device.connectionType | capitalize}}</td>
                            <td>{{device.os | capitalize}}</td>
                            <td><a href=""></a> {{device.manufacturer | capitalize}}</td>
                            <td>
                                <span v-if="device.enabled" class="label label-success">ACTIVE</span>
                                <span v-else class="label label-danger">INACTIVE</span>

                            </td>
                            <td>

                                <a data-target="#deleteDeviceModal" data-toggle="modal"
                                   href="javascript:void(0)" @click="setDeviceToDelete(device)">
                                    <span class="fa fa-trash"></span>
                                </a>

                                <a class="m-l-20" data-target="#myModal" data-toggle="modal"
                                   href="javascript:void(0)" @click="setDeviceToEdit(device)">
                                    <span class="fa fa-edit"></span>
                                </a>

                                <div class="slide-primary m-l-20">
                                    <input v-model="device.enabled" @change="changeDeviceStatus(device)" type="checkbox"
                                           name="switch"
                                           class="ios" checked="checked"/>
                                </div>


                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else class="grid-body">
                    <p class="center-text">No devices found, please <a href="" data-toggle="modal"
                                                                       data-target="#myModal">add</a></p>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteDeviceModal" tabindex="-1" role="dialog"
             aria-labelledby="deleteDeviceModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <br>
                        <span class="fa fa-trash fa-4x"></span>
                        <h4 id="deleteDeviceModalLabel" class="semi-bold">Are you sure you want to remove the device
                            <br/><br/>
                            <p class="bold">{{deviceToDelete.hostName}}?</p></h4>
                        <br>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button @click="deleteDevice" data-dismiss="modal" type="button" class="btn btn-primary">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <!--<form >-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <br>
                        <i class="fa fa-laptop fa-7x"></i>
                        <h4 id="myModalLabel" class="semi-bold">Please note that you can only add</h4>
                        <p class="no-margin">upto the 3 devices </p>
                        <br>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">

                                <div class="grid-body no-border">
                                    <p class="center-text error" v-if="$v.$error">Please fill the
                                        form correctly.</p>

                                    <br>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group "
                                                 :class="{ 'error-control': $v.device_name.$error }">
                                                <label class="form-label">Device Name</label><span
                                                    class="text-error">*  </span>
                                                <span class="help">e.g. "WindowsPC"</span>
                                                <div class="controls">
                                                    <input v-model.trim="device.hostName" id="device_name"
                                                           @blur="setDeviceName($event.target.value)" type="text"
                                                           class="form-control">
                                                    <p class="error" v-if="$v.device_name.$error ">Device name is
                                                        required
                                                    </p>
                                                </div>


                                            </div>
                                            <div class="form-group" :class="{ 'error-control': $v.mac.$error }">
                                                <label class="form-label">Mac Address</label><span
                                                    class="text-error">*  </span>
                                                <span class="help">e.g. "6a:00:02:7c:5a:81"</span>
                                                <div class="controls">
                                                    <input v-model.trim="device.mac"
                                                           @input="setMac($event.target.value)"
                                                           type="text"
                                                           class="form-control">
                                                    <p class="error" v-if="$v.mac.$error && !$v.mac.required">Mac
                                                        address is
                                                        required
                                                    </p>
                                                    <p class="error" v-if="!$v.mac.macAddress">Invalid Mac Address
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Serial</label><span
                                                    class="text-error">*</span>
                                                <span class="help"> e.g. "XXXXXXXXXXXXXXXXXX"</span>
                                                <div class="controls">
                                                    <input @input="setSerial($event.target.value)" type="text"
                                                           v-model.trim="device.serial" class="form-control">
                                                    <p class="error" v-if="$v.serial.$error">Serial number is
                                                        required
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Device type</label>
                                                <span class="help">Select from the list</span>
                                                <div class="controls">

                                                    <select v-model="device.deviceType" id="source"
                                                            style="width:100%">
                                                        <option value="phone">Phone</option>
                                                        <option value="tablet">Tablet</option>
                                                        <option value="laptop">Laptop</option>
                                                        <option value="desktop">Desktop</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="row-fluid">
                                                <div class="form-group">
                                                    <label class="form-label">Manufacturer</label>
                                                    <span class="help">Select from the list</span>
                                                    <div class="controls">

                                                        <select v-model="device.manufacturer" id="mt"
                                                                style="width:100%">
                                                            <option value="apple">Apple</option>
                                                            <option value="hp">HP</option>
                                                            <option value="dell">Dell</option>
                                                            <option value="asus">Asus</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row-fluid">
                                                <div class="form-group">
                                                    <label class="form-label">Model</label>
                                                    <span class="help">e.g. "macbook pro"</span>
                                                    <div class="controls">
                                                        <input v-model="device.model" type="text"
                                                               class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Operating System</label>
                                                <span class="help">Select from the list</span>
                                                <div class="controls">

                                                    <select v-model="device.os" id="os" style="width:100%">
                                                        <option value="ios">IOS</option>
                                                        <option value="android">Android</option>
                                                        <option value="windows">Windows</option>
                                                        <option value="macos">Mac OS</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Connection Type</label>
                                                <span class="help">Select from the list</span>
                                                <div class="controls">

                                                    <select v-model="device.connectionType" id="ct"
                                                            style="width:100%">
                                                        <option value="wlan">WLAN</option>
                                                        <option value="wired">WIRED</option>
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="row-fluid">
                                                <label class="form-label">Activate device</label>
                                                <div class="slide-primary">
                                                    <input v-model="device.enabled" type="checkbox" name="switch"
                                                           class="ios" checked="checked"/>
                                                    <span> Enable this device</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary " @click="saveDevice"
                                :data-dismiss=" $v.$invalid ? '': 'modal'">Save
                        </button>

                    </div>
                </div>
                <!--</form>-->
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>


    </div>
</template>

<script>

    import api from '../api/apiServices'
    import {required, macAddress} from 'vuelidate/lib/validators'

    export default {
        name: "Devices",

        data() {
            return {
                device: {},
                deviceList: [],
                currUser: {},
                deviceToDelete: {},
                isNewDevice: true,
                enableDevice: false,
                devicesFound: false,
                submitStatus: null,
                device_name: '',
                mac: '',
                serial: ''
            }
        },
        validations: {
            device_name: {
                required
            },
            mac: {
                macAddress: macAddress(':'),
                required
            },
            serial: {
                required
            }
        },
        created() {
            this.getDeviceList()
        },
        methods: {
            setDeviceName(value) {
                this.device_name = value
                this.$v.device_name.$touch()
            },
            setMac(value) {
                this.mac = value
                this.$v.mac.$touch()
            },

            setSerial(value) {
                this.serial = value
                this.$v.serial.$touch()
            },


            saveDevice() {

                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'OK'
                    //set the user ID
                    this.device.userId = this.currUser.id;

                    if (this.isNewDevice)
                        api.addNewDevice(this.device).then(res => {
                            this.getDeviceList()
                            this.showNotification('Device has been added', 'success')
                        }).catch(err => {
                                if (err.response) {
                                    if (err.response.status === 401)
                                        this.showNotification('Unauthorized access', 'error')
                                    else
                                        this.showNotification(err.response.data, 'error')
                                } else
                                    this.showNotification('An error occurred', 'error')
                                this.submitStatus = 'ERROR'

                            }
                        )
                    else {
                        api.editDevice(this.device._id, this.device).then(res => {
                            this.getDeviceList()
                            this.isNewDevice = true
                            this.showNotification('Device updated!', 'success')

                        }).catch(err => {
                            if (err.response)
                                this.showNotification(err.response.data, 'error')
                            else
                                this.showNotification('An error occurred', 'error')
                            this.submitStatus = 'ERROR'

                        })
                    }
                }
            },

            getDeviceList() {

                this.currUser.id = this.$store.getters.tokenId

                api.getDeviceList(this.currUser.id).then(res => {
                    this.deviceList = [];
                    if (res.data.length > 0) {
                        this.devicesFound = true
                        res.data.forEach(device => {
                            this.deviceList.push(device)
                        })
                    } else
                        this.devicesFound = false

                }).catch(err => {
                    if (err.response) {
                        if (err.response.status === 401)
                            this.showNotification('Unauthorized access', 'error')
                        else
                            this.showNotification(err.response.data, 'error')
                    } else
                        this.showNotification('An error occurred', 'error')
                })

            },
            setDeviceToDelete(device) {
                this.deviceToDelete = device;
            },
            setDeviceToEdit(device) {
                this.isNewDevice = false
                this.device = device
            },
            changeDeviceStatus(device) {

                api.changeDeviceStatus(device._id, device).then(res => {
                    console.log(res)

                    this.showNotification(res.data, 'success')

                }).catch(err => {
                    if (err.response)
                        this.showNotification(err.response.data, 'error')
                    else
                        this.showNotification('An error occurred', 'error')
                })
            },

            deleteDevice() {

                api.deleteDevice(this.deviceToDelete._id).then(res => {
                    this.showNotification('Device deleted!', 'success')
                    this.getDeviceList();
                }).catch(err => {
                    if (err.response)
                        this.showNotification(err.response.data, 'error')
                    else
                        this.showNotification('An error occurred', 'error')
                })
            },
            showNotification(msg, type) {
                Messenger().post({
                    message: msg,
                    type: type,
                    showCloseButton: true
                });

            }
        },
        filters: {
            capitalize: function (value) {
                if (!value)
                    return ''
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
</script>

<style scoped>

</style>