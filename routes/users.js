const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')

router.get('/:username', controller.getUserByUsername)

/* GET users listing. */
router.get('/', controller.listUsers);

router.post('/', controller.addUser)


module.exports = router;
