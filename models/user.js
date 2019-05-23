const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Constants = require('../utils/constants')


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