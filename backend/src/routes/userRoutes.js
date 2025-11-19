const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users', userController.getUsers)
router.put('/user/:user_id', userController.updateProfile)
router.delete('/user/:user_id', userController.deleteAccount)

module.exports = router