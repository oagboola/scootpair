const models = require('../models');

const { User } = models;

module.exports = async function(req, res) {
	try {
		//check if user trying to access activity history is a Customer Agent
		const { auth } = req.headers;
		const { user } = req.body;
		if( auth === 'admin') {
			await User.findByIdAndUpdate(user, {$set: {disabled: false}});
			res.send('Account Reset');
		} else {
			res.status(401).send('Customer Agents only');
		}
	} catch(e) {
		res.status(500).send(e);
	}
};
