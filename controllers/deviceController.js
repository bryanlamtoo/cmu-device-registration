const deviceModel = require('../models/devices')
const ITEMS_PER_PAGE = 10;

/**
 * Adds a new device to the database
 *
 * @param req
 * @param res
 */
exports.addNewDevice = (req, res) => {

    res.status(200).json()
};

exports.deleteDevice = (req, res) => {
}

exports.updateDevice = (req, res) => {
}

exports.enableDevice = (req, res) => {
}

exports.getDevice = (req, res) => {
}

exports.getDevices = (req, res) => {

    console.log('Got here')

    res.status(200).json()

}

