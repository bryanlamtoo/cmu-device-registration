<template>
    <div class="row-fluid">
        <div class="page-title"><i class="icon-custom-left"></i>
            <h3>Manage - <span class="semi-bold">Users</span></h3>
            <div class="pull-right actions">
                <!--<button class="btn btn-primary btn-cons" type="button" id="btn-new-ticket">New Device</button>-->
                <button class="btn btn-primary btn-cons" data-toggle="modal" data-target="#addUserModal"> Add new user
                </button>

            </div>
        </div>
        <div class="span12">
            <div class="grid simple ">
                <div class="grid-title">
                    <h4>Registered <span class="semi-bold">Users</span></h4>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"></a>
                        <a href="#grid-config" data-toggle="modal" class="config"></a>
                        <a href="javascript:;" class="reload"></a>
                    </div>
                </div>
                <div class="grid-body ">
                    <table class="table table-striped" id="example2">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Login ID</th>
                            <th>Contact</th>
                            <th>User Class</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(user, index) in userList" class="odd gradeX">
                            <td>{{++index}}</td>
                            <td>{{user.firstName | capitalize}}</td>
                            <td>{{user.lastName | capitalize}}</td>
                            <td>{{user.loginId}}</td>
                            <td class="center"> {{user.contact}}</td>
                            <td class="center">{{user.userClass | capitalize}}</td>
                            <td class="center">
                                <div class="col-4"><a data-target="#deleteUserModal" data-toggle="modal"
                                                      href="javascript:void(0)" @click="setUserToDelete(user)"><i
                                        class="fa fa-trash"></i></a>
                                    <a class="m-l-20" data-target="#addUserModal" data-toggle="modal"
                                       href="javascript:void(0)" @click="setUserToEdit(user)">
                                        <span class="fa fa-edit"></span>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="deleteUserModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <br>
                        <i class="fa fa-trash fa-4x"></i>
                        <h4 id="deleteUserModalLabel" class="semi-bold">Are you sure you want to remove the user
                            <br/><br/>
                            <p class="bold">{{userToDelete.firstName}} {{userToDelete.lastName}} ?</p></h4>
                        <br>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button @click="deleteUser" data-dismiss="modal" type="button" class="btn btn-primary">Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <br>
                        <i class="fa fa-user fa-4x"></i>
                        <h4 id="addUserModalLabel" class="semi-bold">Add a new user</h4>
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
                                                <label class="form-label">First Name</label>
                                                <span class="help">e.g. "John"</span>
                                                <div class="controls">
                                                    <input v-model="user.firstName" type="text"
                                                           class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Contact</label>
                                                <span class="help">e.g. "+250 789 123456"</span>
                                                <div class="controls">
                                                    <input v-model="user.contact" type="text"
                                                           class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Last Name</label>
                                                <span class="help">e.g. "Doe"</span>
                                                <div class="controls">
                                                    <input type="text" v-model="user.lastName"
                                                           class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">User Class</label>
                                                <span class="help">Select from the list</span>
                                                <div class="controls">

                                                    <select v-model="user.userClass" id="source"
                                                            style="width:100%">
                                                        <option value="student">Student</option>
                                                        <option value="staff">Staff</option>
                                                        <option value="guest">Guest</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
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
                        <button @click="saveUser" data-dismiss="modal" type="button" class="btn btn-primary">Save
                            changes
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    import api from '../api/apiServices'

    export default {
        name: "UserList",

        created() {

            this.getUserList()
        },

        data: () => {

            return {
                user: {},
                userList: [],
                userToDelete: {},
                isNewUser: true

            }
        },

        methods: {

            saveUser() {

                //Create the login ID
                this.user.loginId = this.user.firstName.charAt(0).concat(this.user.lastName).toLowerCase();
                if (this.isNewUser)

                    api.addNewUser(this.user).then(res => {
                        this.userList.push(res.data)
                        this.showNotification('User has been added', 'success')
                    }).catch(err => {
                        if (err.response)
                            this.showNotification(err.response.data, 'error')
                        else
                            this.showNotification('An error occurred', 'error')
                    })
                else {
                    api.editUser(this.user._id, this.user).then(res => {
                        this.getUserList()
                        this.isNewUser = true
                        this.showNotification('User updated!', 'success')

                    }).catch(err => {
                        if (err.response)
                            this.showNotification(err.response.data, 'error')
                        else
                            this.showNotification('An error occurred', 'error')

                    })
                }
            },

            getUserList() {

                //reset the array list
                this.userList = [];
                api.getUserList().then(res => {

                    if (res.data.length > 0) {
                        res.data.forEach(user => {
                            this.userList.push(user)
                        })
                    }

                }).catch(err => {
                    if (err.response)
                        this.showNotification(err.response.data, 'error')
                    else
                        this.showNotification('An error occurred', 'error')
                })


            },
            deleteUser() {
                api.deleteUser(this.userToDelete._id).then(res => {
                    this.showNotification('User deleted!', 'success')
                    this.getUserList();
                })
            },
            setUserToDelete(user) {
                this.userToDelete = user
            },
            setUserToEdit(user) {
                this.isNewUser = false
                this.user = user
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