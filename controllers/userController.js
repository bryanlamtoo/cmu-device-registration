const User = require('../models/user')

exports.addUser = (req, res) => {

    console.log(req.body)
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        loginId: req.body.loginId,
        contact: req.body.contact,
        userClass: req.body.userClass,
        password: req.body.password
    });

    //save the new user
    user.save((err, newUser) => {
        if (err)
            console.log(err);

        res.status(200).json(newUser)
    })
}

exports.listUsers = (req, res) => {
    User.find((err, users) => {

        res.status(200).json(users)
    })
}

/**
 * Returns a given user specified by the user name in the request
 */
exports.getUserByUsername = (req, res) => {
    let username = req.params.username;

    User.findOne().byUserName(username).exec(function (err, result) {

        if (result.length === 0)
            res.status(404).json('No user exists with that username')
        else
            res.status(200).json(result)
    })


}

exports.editUser = (req, res) => {

    let userId = req.params.id;
    console.log(username)

}