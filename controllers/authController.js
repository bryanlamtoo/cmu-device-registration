const User = require('../models/user')
const ldap = require('ldapjs')

const ldapOptions = {
    url: 'ldap://',
    connectTimeout: 30000,
    reconnect: true
};

const ldapClient = ldap.createClient(ldapOptions);

exports.loginUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let domain = ''

    let loginId = username + '@' + domain

    console.log(req.body)

    ldapClient.bind(loginId, password, function (err) {

        if (err) {
            res.json("Login failed " + err);
            return;
        }

        res.json("Log on successful");
    })
}