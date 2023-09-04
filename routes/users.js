const express = require('express')
const router = express.Router();
const UsersController = require('../controllers/usersController')

router.get('/' , UsersController.getAllUsers.bind(UsersController))
router.get('/:id' , UsersController.getOneUser.bind(UsersController))

module.exports = router