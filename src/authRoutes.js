const express = require('express');

const router = express.Router();

const authController = require('./authController');

router.post('/getOtp', authController.getOtp);
router.post('/verifyOtp', authController.varifyOtp);
router.post('/changePassword', authController.changePassword);

module.exports = router;