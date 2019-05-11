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
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Mac Address</label>
                                                <span class="help">e.g. "6a:00:02:7c:5a:81"</span>
                                                <div class="controls">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Device IME</label>
                                                <span class="help">e.g. "XXXXXXXXXXXXXXXXXX"</span>
                                                <div class="controls">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Device type</label>
                                                <span class="help">Select from the list</span>
                                                <div class="controls">

                                                    <select id="source" style="width:100%">
                                                        <option value="AK">Phone</option>
                                                        <option value="HI">Tablet</option>
                                                        <option value="HI">Computer</option>
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

                                                <select id="os" style="width:100%">
                                                    <option value="AK">IOS</option>
                                                    <option value="HI">Android</option>
                                                    <option value="HI">Windows</option>
                                                    <option value="HI">Mac OS</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
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
    export default {
        name: "Devices"
    }
</script>

<style scoped>

</style>