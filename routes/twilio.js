const express = require('express');
const {
    redirect, sendLoginUrl, sendResourceUrl
} = require('../controllers/twilio');
const router = express.Router();

router.get('/login', sendLoginUrl);
router.get('/resource', sendResourceUrl);
router.get('/redirect', redirect);
module.exports = router;
