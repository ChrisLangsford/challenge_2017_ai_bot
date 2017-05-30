var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    to = chai.to,
    not = chai.not;
var state1 = {MapDimension: 10};
var state2 = require('../state_files/eg_state2.json');
var grid1 = {"Damaged":false,"Missed":false,"X":0,"Y":0,"Probability":0};
var grid2 = {"Damaged":false,"Missed":false,"X":1,"Y":1,"Probability":1};
var acquireTarget = require('../acquireTarget.js');

var fire = require('../fire.js');

describe('firing', ()=>{
  it('Must return the fire command for the injected cell object', ()=>{
    assert.equal(fire(state1,grid2), '1,1,1\n');
  });
});

describe('Acquiring target', ()=>{
  describe('Damaged Cells',()=>{
    it('Should have a Probability of -1', function () {
      assert.equal(acquireTarget(state2)[0].Probability, -1);
    });
  });
  describe('Missed Cells',()=>{
    it('Should have a Probability of -1', function () {
      assert.equal(acquireTarget(state2)[1].Probability, -1);
    });
  });
  describe('Untouched cells', () => {
    it('should not have a Probability of -1', function () {
      expect(acquireTarget(state2)[2].Probability).to.not.equal(-1);
    });
  });
});
