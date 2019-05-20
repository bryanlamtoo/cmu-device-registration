const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userClassEnum = {

    STUDENT: 'Student',
    STAFF: 'Staff',
    DEFAULT: 'Guest',
    ADMIN: 'Admin'
}

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    loginId: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },

    userClass: {
        type: String,
        default: userClassEnum.DEFAULT
    },
    password: {
        type: String,
        required: true,
        default: 12345
    }

})

userSchema.index({username: 1})

userSchema.query.byUserName = function (username) {
    return this.where({username: new RegExp(username, 'i')});
}

userSchema.methods.hasShortPassword = function () {
    return this.password.length < 4
}

//Call to model makes a copy of the schema, make sure to add everything to the schema before calling this
const User = mongoose.model('User', userSchema)

module.exports = User