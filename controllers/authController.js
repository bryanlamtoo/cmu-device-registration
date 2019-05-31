const User = require('../models/user')
const ldap = require('ldapjs')


const ldapOptions = {
    url: 'ldap://cmu-r.cmu.local',
    connectTimeout: 30000,
    reconnect: true
};

const ldapClient = ldap.createClient(ldapOptions);
exports.loginUser = (req, res) => {
    const result = {};    // To send back to the client

    let username = req.body.username;
    let password = req.body.password;
    let domain = 'cmu.local'


    let loginId = username + '@' + domain

    console.log(req.body)

    //Try to bind/authenticate the user on the active directory the search for the user details in the directory
    ldapClient.bind(loginId, password, function (err) {

        if (err) {

            if (err.name === 'InvalidCredentialsError')
                res.status(401).json("Login failed, Invalid Credentials " + err);
            else
                res.status(401).json("Unknown Error Occurred")
            return;

        } else {

            const suffix = 'dc=cmu-r'
            ldapClient.search(suffix, {
                scope: 'sub',
                filter: '(userPrincipalName=' + username + ')'

            }, function (err, searchRes) {

                if (err !== 'undefined') {
                    res.json('LDAP search error')
                    return;
                }

                //when we get a result that is the user data
                searchRes.on('searchEntry', function (entry) {

                    console.log('Found User', entry)
                    let groups = entry.object.memberOf

                    //We want to handle a string (single value) as an array
                    if (typeof groups === 'string')
                        groups = [groups]

                    result.groups = groups

                })

                searchRes.on("error", (err) => {
                    // result += "Search failed with " + err;
                    res.json(err);
                });

            })
        }

        req.session.isLoggedIn = true
        res.json("Log on successful");
    })
}

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        console.log(err)
        res.json('User logged out successfully')
    })
}