const mongoose = require('mongoose');

const log = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  result: {
    type: 'String',
    enum: ['success', 'failure']
  },
  action: {
    type: 'String',
    enum: [ 'initiate_pair', 'validate_otp', 'validate_pair', 'unlock']
  }
}, {timestamps: true});

module.exports =  mongoose.model('Log', log);
