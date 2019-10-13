const mongoose = require('mongoose');

const otp = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		index: true
	},
	otp: 'Number',
	valid: {
		type: 'Boolean',
		default: true
	},
	entry_count: {
		type: 'Number',
		default: 0
	}
}, {timestamps: true});

module.exports =  mongoose.model('OTP', otp);
