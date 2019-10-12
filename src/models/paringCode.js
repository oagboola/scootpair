const mongoose = require('mongoose');

const pairingCode = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  code: Number
}, {timestamps: true});

module.exports =  mongoose.model('PairingCode', pairingCode);
