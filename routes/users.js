const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     name: Add new user
 *     summary: Adds a new user to the system
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.post('/', controller.addUser)


/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     name: Get users
 *     summary: Returns a list of all users in the system
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/', controller.listUsers);

/**
 * @swagger
 * /users/statistics:
 *   get:
 *     tags:
 *       - Users
 *     name: Get User statistics
 *     summary: Get user statistics in the system (e.g. total
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/statistics', controller.getUserStats);

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get user
 *     summary: Returns the specified user
 *     security:
 *       - Authorization: []
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 */
router.get('/:username', controller.getUserByUsername)



/**
 * @swagger
 * /users/update/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     name: Update user
 *     Summary: Update a the specified user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         $ref: '#/definitions/User'
 *         description: OK
 *       '404':
 *         description: 'The specified user does not exist'
 *
 */
router.put('/update/:userId', controller.editUser)

/**
 * @swagger
 * /users/deleteUser:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete User
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         in: query
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: string
 *         required:
 *           - username
 *     responses:
 *       '200':
 *         description: User deleted from db
 *       '403':
 *         description: Authentication error
 *       '404':
 *         description: No user in db with that name
 *       '500':
 *         description: Problem communicating with db
 */
router.delete('/:userId', controller.deleteUser)

module.exports = router;
