const express = require('express');
const {
    redirect, sendLoginUrl, sendResourceUrl, otp
} = require('../controllers/twilio');
const router = express.Router();

router.get('/login', sendLoginUrl);
router.get('/resource', sendResourceUrl);
router.get('/redirect', redirect);

router.get('/otp', otp);

module.exports = router;
