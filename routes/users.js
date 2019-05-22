const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')

router.get('/:username', controller.getUserByUsername)

/* GET users listing. */
router.get('/', controller.listUsers);

router.post('/', controller.addUser)

router.patch('/:userId', controller.editUser)

router.delete('/:userId', controller.deleteUser)


module.exports = router;
