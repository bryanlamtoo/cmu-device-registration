<template>
    <div data-original="assets/img/work.jpg" class="row login-container animated fadeInUp">
        <div class="col-md-7 col-md-offset-2 tiles white no-padding">
            <div class="p-t-30 p-l-40 p-b-20 xs-p-t-10 xs-p-l-10 xs-p-b-10">
                <h2 class="normal">
                    Sign in to Device Manager
                </h2>
                <p>
                    Use your andrewId to sign in.
                    <br>
                </p>

            </div>
            <div class="tiles grey p-t-20 p-b-20 no-margin text-black tab-content">
                <div role="tabpanel" class="tab-pane active" id="tab_login">
                    <form class="animated fadeIn validate" id="" name="">
                        <div class="row form-row m-l-20 m-r-20 xs-m-l-10 xs-m-r-10">
                            <div class="col-md-6 col-sm-6">
                                <input class="form-control" id="login_username" name="login_username"
                                       placeholder="Username" type="text" required>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <input class="form-control" id="login_pass" name="login_pass" placeholder="Password"
                                       type="password" required>
                            </div>
                        </div>
                        <div class="row p-t-10 m-l-20 m-r-20 xs-m-l-10 xs-m-r-10">
                            <div class="control-group col-md-10">
                                <div class="checkbox checkbox check-success">
                                    <a href="#">Trouble login in?</a>&nbsp;&nbsp;
                                    <input id="checkbox1" type="checkbox" value="1">
                                    <label for="checkbox1">Keep me reminded</label>
                                </div>
                            </div>
                        </div>
                        <div class="row p-t-10 m-l-20 m-r-20 xs-m-l-10 xs-m-r-10">
                            <div class="control-group col-md-10">
                                <button type="submit" class="btn btn-primary btn-cons">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "signin",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            onSubmit() {

                let formData = {
                    email: this.username,
                    password: this.password,
                    returnSecureToken: true
                }
                api.createAccount(formData).then(res => {

                    console.log(res)
                })
            }

        }
    }
</script>

<style scoped>
    body {

    }
</style>