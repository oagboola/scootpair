const mongoose = require('mongoose');

const user = new mongoose.Schema({
	phone: 'Number',
	vin: 'Number',
	locked: {
		type: 'Boolean',
		default: true
	},
	paired: {
		type: 'Boolean',
		default: false
	},
	disabled: {
		type: 'Boolean',
		default: false
	}
}, {timestamps: true});

module.exports =  mongoose.model('User', user);
