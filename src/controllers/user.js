const models = require('../models');

const { User } = models;

module.exports = async function(req, res) {
  const user = await User.create(req.body);
  res.json(user)
}

