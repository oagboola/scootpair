const models = require('../models');
const log = require('../log');

const { User } = models;

module.exports = async function(req, res) {
  const { user } = req.body;
  try {

    const activeUser = await User.findById(user);
    if(activeUser && activeUser.paired) {
      res.send('Unlock');
    } else {
      res.send('User not paired')
    }
  } catch(e) {
    res.send(e);
  }
}
