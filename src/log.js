const Logs = require('./models/log');

// log every user activity
module.exports = async function(log) {
	try {
		const newLog = await Logs.create(log);
		return newLog;
	} catch (e){
		return e;
	}
};
