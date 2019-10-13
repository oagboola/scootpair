const chai = require('chai');
const chaiHttp = require('chai-http');
const models = require('../models');
const server = require('../../app');

const expect = chai.expect;
const { User, Log, PairingCode, OTP } = models;

chai.use(chaiHttp);

// router.post('/initiate-pair', initatePair);
// router.post('/validate-otp', validateOTP);
// router.post('/validate-pair', validatePair);
// router.post('/unlock', unlock);
// router.get('/history', history);
// router.post('/reset', reset);

before(async function() {
  await User.create({
    _id: '5da2182ba308cc206d2a2f1a',
    phone: 12345678,
    vin: 1234,
    locked: false,
    paired: false,
    disabled: false
  });
});

after(async function() {
  await User.remove();
  await OTP.remove();
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

describe('', function() {
  it('', async function() {});
})

describe('', function() {
  it('', async function() {});
})

describe('', function() {
  it('', async function() {});
})

describe('', function() {
  it('', async function() {});
})
