'use strict';
module.exports = function makePowersModule(stateFile) {
  var powersModule = {
    name: 'module name',
    // battleMap: require('../mapReader.js')(stateFile),
    availableAttacks: require('./findAvailableAttacks.js')(stateFile),
    crossShotCells: require('./crossShotCells.js')(stateFile),
    diagonalCrossShotCells: require('./diagonalCrossShotCells.js')(stateFile),
    cornerShotCells: require('./cornerShotCells.js')(stateFile),
    doubleShotCells: require('./doubleShotCells.js')(stateFile)
  }
  return powersModule;
}
