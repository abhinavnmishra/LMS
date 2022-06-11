const express = require('express');
const {
    redirect, sendLoginUrl, sendResourceUrl, otp, validateOtp
} = require('../controllers/twilio');
const router = express.Router();

router.get('/login', sendLoginUrl);
router.get('/resource', sendResourceUrl);
router.get('/redirect', redirect);

router.post('/otp', otp);
router.post('/validate', validateOtp);

module.exports = router;
