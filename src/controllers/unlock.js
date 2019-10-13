const models = require('../models');
const log = require('../log');

const { User } = models;

module.exports = async function(req, res) {
  const { user } = req.body;
  try {

    const activeUser = await User.findById(user);
    if(activeUser && activeUser.paired) {
      log({
        user: user,
        action: 'unlock',
        result: 'success'
      });
      activeUser.update({locked: false});
      activeUser.save();
      res.send('Unlocked');
    } else {
      log({
        user: user,
        action: 'unlock',
        result: 'failure'
      });
      res.status(400).send('User not paired');
    }
  } catch(e) {
    res.status(500).send(e);
  }
}
