const express = require('express')
const router = express.Router()
const controller = require('../controllers/deviceController')

router.post('/', controller.addNewDevice);

router.delete('/:deviceId', controller.deleteDevice);

router.get('/', controller.getDevices);

router.get('/:userId', controller.getDevice);

module.exports = router