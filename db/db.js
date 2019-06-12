const mongoose = require('mongoose')
const User = require('../models/user')
const Constants = require('../utils/constants')
const bcrypt = require('bcryptjs')

require('../config/config.js')

// Wait for the in memory db
let waitingTime = 0
if (process.env.NODE_ENV === 'test') waitingTime = 5000

setTimeout(function () {
    let connectionString = global.gConfig.database
    console.log(connectionString)

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true
    }, (err) => {
        if (!err) {
            console.log('Database connected successfully')

            //insert the DB admin
            let password = 'Samibryan1.'
            let loginId = 'blamtoo'

            User
                .findOne({loginId: loginId}).then(res => {

                if (res) {
                    console.log('Admin already exists')
                } else {

                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            // Store hash in your password DB.

                            let user = new User({
                                firstName: 'Brian',
                                lastName: 'Lamtoo',
                                loginId: loginId,
                                userClass: Constants.UserClass.ADMIN,
                                password: hash

                            });

                            //save the new user
                            user.save((err, newUser) => {
                                if (err) {
                                    console.log('Saving user failed', err)

                                }
                                console.log('Admin added!', newUser)
                            })
                        });
                    });


                }
            })


        } else {
            console.log('Error in database connection: ' + err)
        }
    })
}, waitingTime)

module.exports = {
    db: mongoose
}
