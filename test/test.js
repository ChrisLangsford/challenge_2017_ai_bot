var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    to = chai.to,
    not = chai.not,
    have = chai.have;

var blankState = require('../state_files/eg_state1.json');
var uninitBattleMap = require('../mapReader.js');
var blankBattleMap = uninitBattleMap(blankState);
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

var potentialShipFinder = require('../potentialShipFinder.js');
var getRowShapes = require('../heatmap/identifyRowShapes.js');
var getColumnShapes = require('../heatmap/identifyColumnShapes.js');
var row_split_once_hit = require('../state_files/test_state_row_split_once_hit.json');
var row_split_once_miss = require('../state_files/test_state_row_split_once_miss.json');

describe('potentialShipFinder', ()=>{
  describe('it should iterate over all rows in the blankBattleMap', function () {
    it('Should return 1 shape per row', function () {
      assert.equal(getRowShapes(blankBattleMap, blankState).length, blankState.MapDimension);
    });
    it('split a row into 2 shapes on a hit cell', function () {
      assert.equal(getRowShapes(uninitBattleMap(row_split_once_hit),row_split_once_hit).length, row_split_once_hit.MapDimension + 1);
    });
    it('split a row into 2 shapes on a missed cell', function () {
      assert.equal(getRowShapes(uninitBattleMap(row_split_once_miss), row_split_once_miss).length, row_split_once_miss.MapDimension + 1);
    });
  });
  describe('it should iterate over all columns in the blankBattleMap', function () {

  });
});
