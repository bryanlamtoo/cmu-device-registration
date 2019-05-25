const deviceModel = require('../models/device')
const Constants = require('../utils/constants')
const Shell = require('node-powershell')
const ps = new Shell();
const ITEMS_PER_PAGE = 10;

/**
 * Adds a new device to the database
 *
 */
exports.addNewDevice = (req, res) => {
    //First make sure the user doesn't already have 3 devices registered
    deviceModel.find().byUserId(req.body.userId).exec((err, result) => {

        if (result.length >= 3) {

            res.status(403).json('Maximum number of devices reached')
            console.log('Maximum number of devices reached for user = ' + req.body.userId)
        } else {

            //Save the device
            let newDevice = new deviceModel(
                {
                    mac: req.body.mac,
                    deviceType: req.body.deviceType,
                    hostName: req.body.hostName,
                    dateUpdated: req.body.date,
                    serial: req.body.serial,
                    os: req.body.os,
                    manufacturer: req.body.manufacturer,
                    enabled: req.body.enabled,
                    userId: req.body.userId,
                    connectionType: req.body.connectionType,
                })
            deviceModel.findOne({mac: newDevice.mac}).then(result => {

                if (result) {
                    res.status(403).json('Device with the mac address already exists')
                } else
                    newDevice.save((err, savedDevice) => {
                        if (err)
                            console.log(err);
                        else {

                            //If device is enabled, reserve and IP for it
                            if (savedDevice.enabled)
                                addDeviceToNetwork(savedDevice)
                            else
                                res.status(201).json(savedDevice)
                        }
                    })
            })
        }
    })
};

function addDeviceToNetwork(savedDevice, res) {

    let ipAddr;
    let scope;
    let dScope;

    if (savedDevice.connectionType === Constants.ConnectionType.WLAN)
        scope = '172.29.53'
    else
        scope = '172.29.52'

    dScope = scope.concat('.0')

    //Return IP addresses from Database for the current $scope
    deviceModel.find({ipAddr: {$regex: /^/ + scope}}).exec((err, ipList) => {

        console.log(ipList)

        const count = ipList.length //number of addresses in use for the current scope
        let foundIP = false

        console.log(count + ' addresses currently used in ' + dScope)

        if (count <= 240) {  //if less than 240 addresses are in use, process this block of code
            do {
                //first half of scope - 221 addresses max
                let octet = getRandomNumber(17, 240) //generate random number for last octet
                let proposedIp = scope + '.' + octet
                ipAddr = proposedIp


                //Now we make sure this new ip address doesn't already exist in out DB
                if (ipList.indexOf(proposedIp) === -1) {
                    //We are now going to assign the IP
                    foundIP = true;
                } else
                    foundIP = false //The IP is already in use, try again


            } while (foundIP === false)

        } else {

            do {
                //second half of scope 251 addresses max
                let octet = getRandomNumber(2, 253) //generate random number for last octet
                let proposedIp = scope + '.' + octet
                ipAddr = proposedIp
                if (ipList.indexOf(proposedIp) === -1) {
                    //We are now going to assign the IP
                    foundIP = true;
                } else
                    foundIP = false

            } while (foundIP === false)

        }

        console.log('NEW IP ', ipAddr)

        /**
         * Declare the variables to be used
         */
        let regType;
        const serverName = 'rwn-ad-001.go.illinois.dvp s.local'
        if (savedDevice.connectionType === Constants.ConnectionType.WLAN)
            regType = 52
        else
            regType = 54

        let subnetID = '172.29.' + regType + '.0'


        //Initiate the power shell to reserve IP address
        let ps = new Shell({
            executionPolicy: 'Bypass',
            noProfile: true
        })

        /**
         * Invoke the powershel script to reserver the IP address on the server
         */
        ps.addCommand('./powershell/register-db_NEW.ps1 -IP ' + ipAddr + ' -mac ' + savedDevice.mac + ' -subnetId ' + subnetID + ' -server ' + serverName);

        ps.invoke()
            .then(output => {
                console.log(output);

                res.status(201).json(savedDevice)

            })
            .catch(err => {
                console.log(err);
                ps.dispose();

                res.status(501).json(err)
            });

    })
}

/**
 * Function to generate random numbers between the min and max excluding the max
 *
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min)) + min
}


exports.deleteDevice = (req, resp) => {
    let deviceId = req.params.deviceId

    if (deviceId)
        deviceModel.deleteOne({_id: deviceId}).exec((err, res) => {
            if (err) {
                console.log('Error: ', err)
                resp.status(500).send('An error occurred, please try again later')
            } else {
                console.log('Res: ', res)
                resp.status(200).send('Device successfully deleted')

            }
        })
    else
        resp.status(404).json('No device with the specified ID')
}

exports.enableDevice = (req, res) => {
    let shouldEnable = req.body.enable
    let deviceId = req.bo.deviceId

    if (shouldEnable) {
        deviceModel.updateOne({_id: deviceId},
            {
                $set: {
                    enabled: true
                }
            }
        ).exec((err, result) => {

            if (result) {
                console.log(result)
                res.status(200).json('Device enabled')
            }
        })
    }
}

exports.getDevice = (req, res) => {
}

exports.getDevices = (req, res) => {

    deviceModel.find((err, devices) => {

        res.status(200).json(devices)

    })

}

exports.getUserDevices = (req, res) => {
    let userId = req.params.userId

    console.log(req.params)

    deviceModel.find({userId: userId}).exec((err, results) => {

        //Send the results back to the caller
        res.send(results)
    })
}

exports.updateDevice = (req, resp) => {
    let deviceId = req.params.deviceId

    deviceModel.updateOne({_id: deviceId}, req.body).exec((err, res) => {
        if (err) {
            console.log(err)
            resp.status(400).json(err)
        } else {
            console.log(res)
            deviceModel.findOne({_id: deviceId}).then(res => {
                resp.status(200).json(res)
            })
        }
    })

}

exports.activateDevice = (req, resp) => {

    let deviceId = req.params.deviceId
    let status = req.body.enabled

    deviceModel.findOne({_id: deviceId}).then(result => {

        if (result) {
            deviceModel.updateOne({_id: deviceId}, {enabled: status}).exec((err, res) => {
                if (err) {
                    console.log(err)
                    resp.status(500).json(err)
                } else {
                    if (status === true) {
                        addDeviceToNetwork(result, resp)
                    } else
                        resp.json('Device deactivated')

                }
            })
        }
    })
}

exports.getDeviceStats = (req, res) => {

    let stats = {}
    // deviceModel.
}

