const deviceModel = require('../models/device')
const Constants = require('../utils/constants')
const Shell = require('node-powershell')
const ITEMS_PER_PAGE = 10;
const moment = require('moment')
const jwt = require('jsonwebtoken')
let appSecret = global.gConfig.appSecret
const User = require('../models/user')

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
                    dateUpdated: req.body.dateUpdated,
                    dateAdded: req.body.dateAdded,
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
                                addDeviceToNetwork(savedDevice, res)
                            else
                                res.status(201).json(savedDevice)
                        }
                    })
            })
        }
    })
};

function addDeviceToNetwork(savedDevice, resp) {

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
        const serverName = 'rwn-ad-001.go.rwanda.cmu.local'
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
        let cmd = './powershell/register-db_NEW.ps1 -IP ' + ipAddr + ' -mac ' + savedDevice.mac + ' -subnetId ' + subnetID + ' -server ' + serverName
        console.log('Command: ', cmd)
        ps.addCommand(cmd);

        ps.invoke()
            .then(output => {
                console.log(output);

                deviceModel.updateOne({_id: savedDevice._id}, {ipAddr: ipAddr}).exec((err, res) => {
                    console.log('SavedDevice', res);

                    if (err) {
                        console.log('Error: ', err)
                        resp.status(500).send('An error occurred, please try again later')
                    } else {

                        deviceModel.findOne({_id: savedDevice._id}).then(res => {
                            resp.status(201).json(res)
                        })
                    }
                })


            })
            .catch(err => {
                console.log('DHCP Error', err);
                ps.dispose();

                resp.status(501).json(err)
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

    //If the user id admin, fetch all the devices from the system
    const authHeader = req.get('Authorization');

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {

        decodedToken = jwt.verify(token, appSecret);
        const userId = decodedToken.userId

        User.findOne({_id: userId}, (err, user) => {

            if (user && user.userClass === 'admin') {

                //now connect to the DHCP serve and fetch all users
                deviceModel.find((err, devices) => {

                    res.status(200).json(devices)

                })
            } else
                return res.status(401).json('You are not authorized to access this resource')
        })


    } catch (err) {
        err.statusCode = 500;
        throw err;
    }


}

exports.getUserDevices = (req, res) => {
    let userId = req.params.userId

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


exports.getDeviceStats = (req, resp) => {

    let stats = {}
    stats.totalActiveDevices = 0
    stats.totalDevices = 0
    stats.devicesThisMonth = 0
    stats.devicesLastMonth = 0
    stats.totalInactiveDevices = 0


    return deviceModel.count()
        .then(res => {

            //Append the total count of devices
            stats.totalDevices = res;

            return deviceModel.aggregate([{
                $group: {
                    _id: {
                        month: {$month: "$dateAdded"},
                        year: {$year: "$dateAdded"}
                    },
                    count: {$sum: 1},
                    date: {$first: "$dateAdded"}

                }

            },
                {
                    $project:
                        {
                            date:
                                {
                                    $dateToString: {format: "%Y-%m", date: "$date"}
                                },
                            count: 1,
                            _id: 0
                        }
                }
            ])
        }).then(res => {

            const thisMonthDate = moment().format('Y-MM')
            const lastMonthDate = moment(thisMonthDate).subtract(1, 'months').format('Y-MM')

            res.forEach(data => {

                if (data.date === thisMonthDate)
                    stats.devicesThisMonth = data.count
                else if (data.date === lastMonthDate)
                    stats.devicesLastMonth = data.count
            })

            return deviceModel.aggregate([
                {
                    $group: {
                        _id: "$enabled", count: {$sum: 1}, active: {$first: "$enabled"}
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ])


        }).then(res => {

            res.forEach(data => {

                if (data.active === true)
                    stats.totalActiveDevices = data.count
                else if (data.active === false)
                    stats.totalInactiveDevices = data.count

            })

            resp.json(stats)

        }).catch(err => {
            console.log(err)

            resp.status(500).json('An unexpected error occurred, please try again later')
        })


}

exports.getRecentlyAdded = (req, res) => {

    return deviceModel.aggregate([
        {
            $sort: {dateAdded: 1}
        },
        {
            $limit: 5
        }
    ]).then(result => {

        console.log(result)

        res.json(result)

    }).catch(err => {
        console.log(err)

        res.status(500).json("An un expected error has occurred")
    })
}

