const express = require('express')
const router = express.Router()
const controller = require('../controllers/deviceController')

/**
 * @swagger
 * /devices:
 *   post:
 *     tags:
 *       - Devices
 *     name: Add Device
 *     summary: Add a new device to the system
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/', controller.addNewDevice);


/**
 * @swagger
 * /devices:
 *   get:
 *     tags:
 *       - Devices
 *     name: Get Devices
 *     summary: Return a list of the devices the system
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/', controller.getDevices);

/**
 * @swagger
 * /devices/statistics:
 *   get:
 *     tags:
 *       - Devices
 *     name: Get Device statistics
 *     summary: Get device statistics in the system (e.g. total
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/statistics', controller.getDeviceStats);


/**
 * @swagger
 * /devices/recent:
 *   get:
 *     tags:
 *       - Devices
 *     name: Get Device statistics
 *     summary: Get device statistics in the system (e.g. total
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/recent', controller.getRecentlyAdded);

/**
 * @swagger
 * /devices/{userId}/{deviceId}:
 *   get:
 *     tags:
 *       - Devices
 *     name: Get Device
 *     summary: Return a single devices for the specified user
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/:userId/:deviceId', controller.getDevice);

/**
 * @swagger
 * /devices/{userId}:
 *   get:
 *     tags:
 *       - Devices
 *     name: Gte Device
 *     summary: Return a list of all the devices of the specified user
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/:userId', controller.getUserDevices);

/**
 * @swagger
 * /devices/update/{deviceId}:
 *   update:
 *     tags:
 *       - Devices
 *     name: Update a Device
 *     summary: Update the specified device
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.put('/update/:deviceId', controller.updateDevice);


/**
 * @swagger
 * /status/{deviceId}:
 *   put:
 *     tags:
 *       - Devices
 *     name: Update Device Status
 *     summary: Activate or deactivate a device
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.put('/status/:deviceId', controller.activateDevice);


/**
 * @swagger
 * /devices/{deviceId}:
 *   delete:
 *     tags:
 *       - Devices
 *     name: Delete Device
 *     summary: Delete the specified device from the system
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.delete('/:deviceId', controller.deleteDevice);

module.exports = router