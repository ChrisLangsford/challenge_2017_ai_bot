var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    to = chai.to,
    not = chai.not,
    have = chai.have;

var blankState = require('../state_files/eg_state1.json');
var battleMap = require('../mapReader.js')(blankState);
var selectFiringMethod = require('../selectFiringMethod.js');
var huntingShot = require('../huntingShot.js')(10);

describe('selectFiringMethod', () => {
  describe('should return target cell object', () => {
    it('should have an x coordinate', function () {
      expect(selectFiringMethod(blankState)).to.have.property('X');
    });
    it('should have a y coordinate', function () {
      expect(selectFiringMethod(blankState)).to.have.property('Y');
    });
  });
});

describe('huntingShot', () => {
  describe('it must be within the bounds of the map', () => {
    it('should return x value within map', function () {
      assert.equal((huntingShot.X >=0 && huntingShot.X <=9), true);
    });
    it('should return y value within map', function () {
      assert.equal((huntingShot.Y >=0 && huntingShot.Y <=9), true);
    });
  });
});

var destroyedShipState = require('./test_states/destroyed_ships_state.json');
var energyLevelState = require('./test_states/energy_level_state.json');
var getAttacks = require('../findAvailableAttacks.js');
describe('Powers', function () {
  describe('', function () {
    it('should only return powers for surviving ships', function () {
      assert.equal(getAttacks(destroyedShipState).length, 3);
    });
    it('should only return powers requiring <= energy available', function () {
      assert.equal(getAttacks(energyLevelState).length, 1);
    });
  });
});
