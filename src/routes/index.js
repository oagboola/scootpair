const express = require('express');
const router = express.Router();

const initatePair = require('../controllers/initiatePair');
const validateOTP = require('../controllers/validateOTP');
const validatePair = require('../controllers/validatePair');
const unlock = require('../controllers/unlock');
const history = require('../controllers/history');

/* GET home page. */
router.post('/initiate-pair', initatePair);

router.post('/validate-otp', validateOTP);

router.post('/validate-pair', validatePair);

router.post('/unlock', unlock);

router.get('/history', history);

router.post('/reset');

module.exports = router;
