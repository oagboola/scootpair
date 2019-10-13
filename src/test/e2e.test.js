const chai = require('chai');
const chaiHttp = require('chai-http');
const models = require('../models');
const server = require('../../app');
const moment = require('moment');

const expect = chai.expect;
const { User, Log, PairingCode, OTP } = models;

chai.use(chaiHttp);

before(async function() {
  await User.create({
    _id: '5da2182ba308cc206d2a2f1a',
    phone: 12345678,
    vin: 1234,
    locked: false,
    paired: false,
    disabled: false
  });
  const user = await User.create({
    _id: '5da21477c8988c54e62b6e7b',
    phone: 3432423432,
    vin: 23432,
    locked: false,
    paired: false,
    disabled: true
  });
});

after(async function() {
  await User.remove();
  await OTP.remove();
  await PairingCode.remove();
  await Log.remove();
})


describe('Initiate pair', function() {
  it('should initiate validation process', async function() {
    let res = await chai.request(server)
        .post('/initiate-pair')
        .send({user: '5da2182ba308cc206d2a2f1a' });
    expect(res.status).to.be.equal(200)
  });
});

describe('Validate OTP', function() {
  let user, otp;
  beforeEach(async function(){
     otp = await OTP.findOne({user: '5da2182ba308cc206d2a2f1a'}).populate('user');
  })
  it('Should confirm valid OTP', async function() {
    let res = await chai.request(server)
      .post('/validate-otp')
      .send({user: '5da2182ba308cc206d2a2f1a', code: otp.otp});
    expect(res.status).to.be.equal(200);
    expect(res.text).to.be.equal('Valid');
  });
  it('Should confirm invalid OTP', async function() {
    let res = await chai.request(server)
      .post('/validate-otp')
      .send({user: '5da2182ba308cc206d2a2f1a', code: 'xys'});
    expect(res.status).to.be.equal(400);
    expect(res.text).to.be.equal('Invalid');
  });
  it('should block user 3 OTP attempts', async function() {
    let res;
    for(let i = 0; i <= 3; i++) {
      res = await chai.request(server)
        .post('/validate-otp')
        .send({user: '5da2182ba308cc206d2a2f1a', code: 'xys'});
    }
    expect(res.status).to.be.equal(400);
    expect(res.text).to.be.equal('OTP tried more than 3 times, account has been locked');
  });
})

describe('Validate pair', function() {
  let pairingCode1, pairingCode2;
  beforeEach(async function() {
    pairingCode1 = PairingCode.findOne({user: '5da2182ba308cc206d2a2f1a'}).populate('user');
    pairingCode2 = PairingCode.findOne({user: '5da21477c8988c54e62b6e7b'}).populate('user');
  });
  it('Should validate pairing code', async function() {
    let res = await chai.request(server)
      .post('/validate-pair')
      .send({user: '5da2182ba308cc206d2a2f1a', code: pairingCode1.code});
    expect(res.status).to.be.equal(200);
    expect(res.text).to.be.equal('Pairing Successful');
  });
})

describe('Unlock', function() {
  it('Should unlock on Successful pairing', async function() {
    let res = await chai.request(server)
      .post('/unlock')
      .send({user: '5da2182ba308cc206d2a2f1a'});
    expect(res.status).to.be.equal(200);
    expect(res.text).to.be.equal('Unlocked');
  });
  it('should not unlock unpaired devices', async function() {
    let res = await chai.request(server)
      .post('/unlock')
      .send({user: '5da21477c8988c54e62b6e7b'});
    expect(res.status).to.be.equal(400);
    expect(res.text).to.be.equal('User not paired');
  })
})

describe('reset', function() {
  it('Customer agent should be able to reset account', async function() {
    let res = await chai.request(server)
      .post('/reset')
      .send({user: '5da21477c8988c54e62b6e7b'})
      .set('auth', 'admin');
    let user = await User.findById('5da21477c8988c54e62b6e7b');
      expect(res.status).to.be.equal(200);
      expect(res.text).to.be.equal('Account Reset');
      expect(user.disabled).to.be.equal(false)
  });

  it('should prevent non Customer agents from resetting account', async function() {
    let res = await chai.request(server)
      .post('/reset')
      .send({user: '5da21477c8988c54e62b6e7b'})
    expect(res.status).to.be.equal(401);
    expect(res.text).to.be.equal('Customer Agents only');
  })
})

