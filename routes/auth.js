const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login the user
 *     summary: Login the user
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/', controller.loginUser);

