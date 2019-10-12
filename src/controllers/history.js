const models = require('../models');
const log = require('../log');

const { Log } = models;

module.exports = async function(req, res) {
  try {
    //check if user trying to access activity history is a Customer Agent
    const { auth } = req.headers;
    if( auth === 'admin') {
      const logs = await Log.find();
      res.send(logs);
    } else {
      res.send('Only admins are allowed to view activity')
    }
  } catch(e) {
    res.send(e);
  }
}
