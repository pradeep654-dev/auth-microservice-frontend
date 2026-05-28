const express = require('express')
const router = express.Router();
const userController = require ('./userController')
const authController = require ('./authController')

router.post('/login', userController.getUser)
router.post('/signup', userController.creatUser)
// router.post('/resetPassword', userController.resetPassword)

module.exports = router;