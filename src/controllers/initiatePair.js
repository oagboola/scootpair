const models = require('../models');
const log = require('../log');

const { OTP } = models;

module.exports = async function (req, res) {
  const { user } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000);
  try {
    const otp =  await OTP.create({user: user, otp: code});
    log({
      user: user,
      action: 'initiate_pair',
      result: 'success'
    });
    res.send('Initiation started');
  } catch(e) {
    log({
      user: user,
      action: 'initiate-pair',
      result: 'failure'
    });
    res.send(e);
  }
}


