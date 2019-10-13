const models = require('../models');
const log = require('../log');

const { OTP, PairingCode } = models;

module.exports = async function(req, res) {
	const { user, code } = req.body;
	try {

		//fetch OTP based on the user id
		const otp = await OTP.findOne({user: user}).populate('user');

		//check if the associated user id matches the input
		if(otp && otp.user._id.toString() === user) {

			//confirm the user has not more than 3 OTP entries
			if(otp.entry_count >= 3) {
				try {
					await otp.user.update({disabled: true});
					await otp.save();
				} catch(e) {
					res.send(e);
				}
				return res.status(400).send('OTP tried more than 3 times, account has been locked');
			}
			//check if otp code sent matches what was generated
			if(code === otp.otp) {

				//generate pairing code associaed with user
				generatePairCode(user);
				log({
					user: user,
					action: 'validate_otp',
					result: 'success'
				});
				res.send('Valid');
			} else {
				try {
					await otp.update({$inc: { entry_count: 1}});
					await otp.save();
					log({
						user: user,
						action: 'validate_otp',
						result: 'failure'
					});
					res.status(400).send('Invalid');
				} catch(e) {
					res.status(500).send(e);
				}
			}
		}
	} catch(e) {
		res.send(e);
	}

};


async function generatePairCode(userId) {
	try {
		const randomPairCode = Math.floor(Math.random()*90000) + 10000;
		const pairCode = await PairingCode.create({user: userId, code: randomPairCode});
		return pairCode;
	} catch(e) {
		return e;
	}
}
