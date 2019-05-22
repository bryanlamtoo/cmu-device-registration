const Constants = require('../utils/constants')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    mac: {
        type: String,
        required: true
    },
    deviceType: {
        type: String,
        default: Constants.DeviceType.OTHER
    },
    hostName: {
        type: String,
        required: true
    },
    ipAddr: {
        type: String,
        default: ''
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date
    },
    serial: {
        type: String,
        default: ''
    },

    os: {
        type: String,
        default: ''
    },
    manufacturer: {
        type: String,
        default: ''
    },
    enabled: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    connectionType: {
        type: String,
        default: Constants.ConnectionType.WLAN
    }

})

deviceSchema.query.byUserId = function (userId) {

    return this.where({userId: new RegExp(userId, 'i')});
}

//Return a device with the specified mac address
deviceSchema.query.byMacAddress = function () {

}

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device