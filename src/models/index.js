const user = require('./user');
const OTP = require('./otp');
const log = require('./log');
const pairingCode = require('./paringCode');

module.exports = {
	User: user,
	OTP: OTP,
	Log: log,
	PairingCode: pairingCode
};
