const User = require('../models/user')
const moment = require('moment')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let appSecret = global.gConfig.appSecret
const ldap = require('ldapjs')

const ldapOptions = {
    url: process.env.LDAP_URL,
    connectTimeout: 30000,
    reconnect: true,
    bindDN: process.env.LDAP_BIND_USER,
    credentials: process.env.LDAP_BIND_PASSWORD
};

const ldapClient = ldap.createClient(ldapOptions);


exports.addUser = (req, resp) => {

    let password = req.body.password
    let loginId = req.body.loginId


    User
        .findOne({loginId: loginId}).then(res => {

        if (res) {
            resp.status(403).json('User with the login ID already exists')
        } else {

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    // Store hash in your password DB.

                    let user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        loginId: loginId,
                        userClass: req.body.userClass,
                        password: hash
                    });

                    //save the new user
                    user.save((err, newUser) => {
                        if (err) {
                            resp.status(500).json('Saving user failed')

                            console.log(err);
                        }
                        resp.status(201).json(newUser)
                    })
                });
            });


        }
    })


}

exports.listUsers = (req, res) => {
    const authHeader = req.get('Authorization');

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {

        decodedToken = jwt.verify(token, appSecret);
        const userId = decodedToken.userId

        User.findOne({_id: userId}, (err, user) => {

            if (user && user.userClass === 'admin') {


                ldapClient.on('error', function (e) {
                    console.log('LDAP connection error:', e);
                });


                //now connect to the DHCP serve and fetch all users
                /**
                 * OU = Organizational Uni
                 * DC = Domain Component
                 * CN = Common Name
                 */
                const suffix = 'dc=go, dc=rwanda, dc=cmu, dc =local'
                const opts = {
                    scope: 'sub',
                    paged: true,
                    sizeLimit: 200
                }
                let msg = {}

                let loginId = ldapOptions.bindDN + '@' + process.env.LDAP_DOMAIN


                ldapClient.bind(loginId, ldapOptions.credentials, function (err) {

                    console.log('User', loginId)
                    console.log('Pass', ldapOptions.credentials)

                    let msg = {}
                    if (err) {
                        console.log("Error binding to LDAP", 'dn: ' + err.dn + '\n code: ' + err.code + '\n message: ' + err.message);

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

                        ldapClient.search(suffix, opts, function (err, searchRes) {

                            if (err !== 'undefined') {
                                msg.msg = 'An error occurred'
                                msg.error = null

                                res.status(404).json(msg)

                                return;
                            }
                            searchRes.on('searchEntry', function (entry) {
                                console.log('entry: ' + JSON.stringify(entry.object));

                                return res.send(200)
                            });

                            searchRes.on("error", (err) => {
                                console.error('error: ' + err.message);
                                return res.json('User not found');
                            });

                        })
                    }
                })

            } else
                return res.status(401).json('You are not authorized to access this resource')
        })


    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    // User.find((err, users) => {
    //     res.status(200).json(users)
    // })
}

/**
 * Returns a given user specified by the user name in the request
 */
exports.getUserByUsername = (req, res) => {
    let username = req.params.username;

    User.findOne().byLoginId(username).exec(function (err, result) {

        if (result === null || result.length === 0)
            res.status(404).json('No user exists with that username')
        else
            res.status(200).json(result)
    })


}

exports.editUser = (req, resp) => {

    let userId = req.params.userId;

    User.updateOne({_id: userId}, req.body).exec((err, res) => {
        if (err) {
            console.log(err)
            resp.status(404).json("The specified user does not exist")
        } else {
            console.log(res)
            User.findOne({_id: userId}).then(res => {
                resp.status(200).json(res)
            })
        }
    })
}

/**
 * Deletes and existing user by id
 *
 */
exports.deleteUser = (req, resp) => {
    console.log(req.params)
    let id = req.params.userId

    User.deleteOne({_id: id}).exec((err, res) => {
        if (err) {
            console.log('Error: ', err)
            resp.status(404).send()
        } else {
            console.log('Res: ', res)
            resp.status(200).send('User successfully deleted')

        }
    })
}

exports.getUserStats = (req, resp) => {
    let stats = {}

    return User.count().then(result => {
        //append the total number of users found
        stats.totalUsers = result

        return User.aggregate([{
            $group: {
                _id: {
                    month: {$month: "$dateAdded"},
                    year: {$year: "$dateAdded"}
                },
                count: {$sum: 1},
                date: {$first: "$dateAdded"}

            }

        },
            {
                $project:
                    {
                        date:
                            {
                                $dateToString: {format: "%Y-%m", date: "$date"}
                            },
                        count: 1,
                        _id: 0
                    }
            }
        ])
    }).then(res => {

        const thisMonthDate = moment().format('Y-MM')
        const lastMonthDate = moment(thisMonthDate).subtract(1, 'months').format('Y-MM')

        res.forEach(data => {

            if (data.date === thisMonthDate)
                stats.usersThisMonth = data.count
            else if (data.date === lastMonthDate)
                stats.usersLastMonth = data.count
        })

        resp.json(stats)

    }).catch(err => {
        console.log(err)

        resp.status(500).json('An unexpected error occured')
    })

}