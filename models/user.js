const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

userSchema.index({username: 1})

userSchema.query.byUserName = function (username) {
    return this.where({ username: new RegExp(username, 'i') });
}

//Call to model makes a copy of the schema, make sure to add everything to the schema before calling this
const User = mongoose.model('User', userSchema)

module.exports = User