const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const deviceTypeENUM = {
    PHONE: 'phone',
    TABLET: 'tablet',
    COMPUTER: "computer",
    OTHER: 'other'
}

const deviceOSNUM = {
    ANDROID: 'android',
    WINDOWS: 'windows',
    MAC: "mac",
    IOS: 'ios'
}

const connectionTypeENUM = {
    WIRED: 'wired',
    WLAN: 'wlan'
}

var deviceSchema = new Schema({
    mac: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: deviceTypeENUM.OTHER
    },
    hostName: {
        type: String,
        required: true
    },
    ipAddr: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date
    },
    imei: Number,

    os: String,
    make: String,
    enabled: Boolean,
    deleted: {
        type: Boolean,
        default: false
    },
    userId: String,
    connectionType: {
        type: String,
        default: connectionTypeENUM.WLAN
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