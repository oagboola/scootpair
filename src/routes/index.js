const express = require('express');
const router = express.Router();

const initatePair = require('../controllers/initiatePair');
const validateOTP = require('../controllers/validateOTP');
const validatePair = require('../controllers/validatePair');

/* GET home page. */
router.post('/initiate-pair', initatePair);

router.post('/validate-otp', validateOTP);

router.post('/validate-pair', validatePair);

router.get('/unlock');
router.get('/history');
router.get('/reset');

module.exports = router;
