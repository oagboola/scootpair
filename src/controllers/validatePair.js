const moment = require('moment');

const models = require('../models');
const log = require('../log');

const { PairingCode } = models;

module.exports = async function(req, res) {
  const { user } = req.body;

  try {
     const pairingCode = await PairingCode.findOne({user: user}).populate('user');
     const codeCreatedDate = moment(pairingCode.createdAt);
     const currentDate = moment();
     if(currentDate.minute() - codeCreatedDate.minute() > 2) {
       try {
         await pairingCode.user.update({disabled: true});
         await pairingCode.save();
         log({
            user: user,
            action: 'validate_pair',
            result: 'failure'
          });
         res.send('Two minutes exceeded! Account disabled');
       } catch(e) {
         res.send(e)
       }
     }

     if(pairingCode && pairingCode.user._id.toString() === user) {
       try {
         await pairingCode.user.update({paired: true});
         await pairingCode.save();
         log({
           user: user,
           action: 'validate_pair',
           result: 'success'
         });
         res.send('Pairing Successful');
       } catch(e) {
         res.send(e)
       }
     }
  } catch(e) {
    res.send(e);
  }
}

function validatePair(pairingCode) {}
