var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    to = chai.to,
    not = chai.not,
    have = chai.have;

var blankState = require('./test_states/blank_state.json');
var selectFiringMethod = require('../selectFiringMethod.js');
var huntingShot = require('../huntingShot.js')(blankState);

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
var getAttacks = require('../powers_module/findAvailableAttacks.js');


describe('Powers', function () {
  describe('', function () {
    it('should only return powers for surviving ships', function () {
      assert.equal(getAttacks(destroyedShipState).length, 4);
    });
    it('should only return powers requiring <= energy available', function () {
      assert.equal(getAttacks(energyLevelState).length, 2);
    });
  });
});

var powersModule = require('../powers_module/powers_module.js');
describe('powers module', function () {
  describe('the module', function () {
    it('should call a factory that returns the module as an object', function () {
      assert.typeOf(powersModule(blankState), 'Object');
    });
  });
  describe('the module should have the following attributes', function () {
    it('should use the state file to determine possible attack options', function () {
      expect(powersModule(blankState)).to.have.property('availableAttacks')
    });
    it('should have a list of potential cross shots', function () {
      expect(powersModule(blankState)).to.have.property('crossShotCells');
    });
    it('should have a list of potential diagonal cross shots', function () {
      expect(powersModule(blankState)).to.have.property('diagonalCrossShotCells');
    });
    it('should have a list of potential corner shots', function () {
      expect(powersModule(blankState)).to.have.property('cornerShotCells');
    });
    it('should have a list of potential double shots', function () {
      expect(powersModule(blankState)).to.have.property('doubleShotCells');
    });
  });
  describe('The cross shot should potential cross shot target cells', function () {
    it('should return 32 protential targets for a blank 10x10 map', function () {
      assert.equal(32, powersModule(blankState).crossShotCells.length);
    });
    it('should return 32 protential targets for a blank 10x10 map', function () {
      assert.equal(32, powersModule(blankState).diagonalCrossShotCells.length);
    });
  });
  describe('The corner shot should be identical except the centre cell is touched', function () {
    it('should return no options for a blank state', function () {
      assert.equal(0, powersModule(blankState).cornerShotCells.length);
    });
  });

});

var getShortestShipLength = require('../getShortestShipLength.js');
var destroyerRemainingState = require('./test_states/ship_length_states/only_destroyer_remaining.json');
var subRemainingState = require('./test_states/ship_length_states/only_sub_remaining.json');
var battleshipRemainingState = require('./test_states/ship_length_states/only_battleship_remaining.json');
var carrierRemainingState = require('./test_states/ship_length_states/only_carrier_remaining.json');

describe('ShortestShip', function () {
  describe('getShortestShipLength', function () {
    it('should return 2 when the destroyer is the shortest ship left', function () {
      assert.equal(getShortestShipLength(destroyerRemainingState),2);
    });
    it('should return 3 when the sub is the shortest ship left', function () {
      assert.equal(getShortestShipLength(subRemainingState),3);
    });
    it('should return 4 when the cruiser his the shortest ship left', function () {
      assert.equal(getShortestShipLength(battleshipRemainingState),4);
    });
    it('should return 5 when the carrier is the shortest ship left', function () {
      assert.equal(getShortestShipLength(carrierRemainingState),5);
    });
  });
});
