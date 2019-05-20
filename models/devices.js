const mongoose = require('mongoose')
const Schema = mongoose.Schema;


var deviceSchema = new Schema({
    mac: {
        type: String,
        required: true
    },
    ipAddress: String,
    serial: String,
    hostName: String,
    type: String,
    make: String,
    model: String,
    date: {type: Date, default: Date.now},
    enabled: Boolean,
    userId: Number

})

//Return a device with the specified mac address
deviceSchema.methods.findDeviceByMac = function () {

}

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device