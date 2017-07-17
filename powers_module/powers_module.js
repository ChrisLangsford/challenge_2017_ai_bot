'use strict';
module.exports = function makePowersModule(stateFile) {
  var powersModule = {
    name: 'module name',
    battleMap: require('../mapReader.js')(stateFile),
    availableAttacks: require('./findAvailableAttacks.js')(stateFile),
    crossShotCells: [],
    diagonalCrossShotCells: [],
    cornerShotCells: [],
    doubleShotCells: []
  }
  return powersModule;
}
