const User = require('../models/user')
const moment = require('moment')
const bcrypt = require('bcryptjs')

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
    User.find((err, users) => {
        res.status(200).json(users)
    })
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