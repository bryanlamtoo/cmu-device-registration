const express = require('express')
const router = express.Router()
const controller = require('../controllers/deviceController')

router.post('/', controller.addNewDevice);

router.delete('/:deviceId', controller.deleteDevice);

router.get('/', controller.getDevices);

router.get('/:userId/:deviceId', controller.getDevice);

router.get('/:userId', controller.getUserDevices);

router.put('/update/:deviceId', controller.updateDevice);

router.get('/activate/:userId/:deviceId', controller.activateDevice);

module.exports = router