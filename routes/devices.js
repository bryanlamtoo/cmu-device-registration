const express = require('express')
const router = express.Router()
const controller = require('../controllers/deviceController')

router.post('/', controller.addNewDevice);

router.delete('/:deviceId', controller.deleteDevice);

router.get('/', controller.getDevices);

router.get('/:userId', controller.getDevice);

router.get('/:userId', controller.getUserDevices);

router.get('/activate/:userId/:deviceId', controller.activateDevice);

module.exports = router