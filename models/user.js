const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Constants = require('../utils/constants')

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       first_name:
 *         type: string
 *       last_name:
 *         type: integer
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       resetPasswordToken:
 *         type: string
 *       resetPasswordExpires:
 *         type: string
 *         format: date-time
 *       required:
 *         - email
 *         - username
 *         - password
 */

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    loginId: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        default: ''
    },

    userClass: {
        type: String,
        default: Constants.UserClass.DEFAULT
    },
    password: {
        type: String,
        required: true,
        default: 12345
    }

})

userSchema.index({loginId: 1}, {unique: true})

userSchema.query.byLoginId = function (loginId) {
    return this.where({loginId: new RegExp(loginId, 'i')});
}

userSchema.methods.hasShortPassword = function () {
    return this.password.length < 4
}

//Call to model makes a copy of the schema, make sure to add everything to the schema before calling this
const User = mongoose.model('User', userSchema)

module.exports = User