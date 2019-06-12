const User = require('../models/user')
const ldap = require('ldapjs')
const Constants = require('../utils/constants')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ldapOptions = {
    url: 'ldap://40.127.2.44:389',
    // url: 'ldap://cmu-r.cmu.local',
    connectTimeout: 30000,
    reconnect: true
};

const ldapClient = ldap.createClient(ldapOptions);


exports.loginUser = (req, res) => {
    console.log('Attempting user login...')

    const result = {};    // To send back to the client

    let username = req.body.username;
    let password = req.body.password;
    let domain = 'cmu.local' //The server DNS domain name

    let loginId = username + '@' + domain


    User.findOne().byLoginId(username).exec(function (err, user) {

        if (err) {
            return res.status(500).json('An unexpected error occurred')
        }

        if (user === null || user.length === 0) {

            console.log('Initializing ldap connection ...')


            //Try to bind/authenticate the user on the active directory the search for the user details in the directory
            ldapClient.bind(loginId, password, function (err) {

                let msg = {}

                console.log('Error: ',err)

                if (err) {

                    if (err.name === 'InvalidCredentialsError') {
                        msg.msg = 'Login failed, Invalid Credentials'
                        msg.error = err
                        res.status(401).json(msg);
                    } else {
                        msg.msg = 'Unknown Error Occurred'
                        msg.error = null
                        res.status(401).json(msg)
                    }
                    return;

                } else {

                    /**
                     * OU = Organizational Uni
                     * DC = Domain Component
                     * CN = Common Name
                     */
                    const suffix = 'ou=cmu, dc=cmu, dc =local'
                    ldapClient.search(suffix, {
                        scope: 'sub',
                        filter: '(sAMAccountName=' + username + ')'

                    }, function (err, searchRes) {

                        if (err !== 'undefined') {
                            msg.msg = 'User details not found'
                            msg.error = null

                            res.status(404).json(msg)

                            return;
                        }

                        //when we get a result that is the user data
                        searchRes.on('searchEntry', function (entry) {


                            user.username = entry.object.sAMAccountName
                            user.email = entry.object.userPrincipalName
                            user.firstName = entry.object.givenName
                            user.lastName = entry.object.sn
                            user.name = entry.object.name

                            let appSecret = global.gConfig.appSecret
                            const token = jwt.sign({
                                username: user.username,
                                userId: user.email
                            }, appSecret, {expiresIn: '1h'})


                            // req.session.isLoggedIn = true
                            // req.session.authUser = user
                            res.status(200).json({token: token, user: user})

                        })

                        searchRes.on("error", (err) => {
                            res.json('User not found');
                        });

                    })
                }
            })

        } else {

            console.log('Found local account');

            bcrypt.compare(password, user.password).then(doMatch => {

                if (doMatch) {
                    let appSecret = global.gConfig.appSecret
                    const token = jwt.sign({
                        username: user.username,
                        userId: user._id
                    }, appSecret, {expiresIn: '1h'})

                    res.status(200).json({token: token, user: user})

                } else
                    res.status(401).json('Invalid Credentials')
            }).catch(err => {
                console.log(err)
                res.status(401).json('Error Occurred')

            })

        }
    })
}

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        console.log(err)
        res.json('User logged out successfully')
    })
}