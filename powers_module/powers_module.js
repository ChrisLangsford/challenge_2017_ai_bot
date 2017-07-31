'use strict';
module.exports = function makePowersModule(stateFile) {
  var powersModule = {
    availableAttacks: require('./findAvailableAttacks.js')(stateFile),
    crossShotCells: require('./crossShotCells.js')(stateFile),
    diagonalCrossShotCells: require('./diagonalCrossShotCells.js')(stateFile),
    cornerShotCells: require('./cornerShotCells.js')(stateFile),
    doubleShotCells: require('./doubleShotCells.js')(stateFile),
    seekerShotCells: require('./seekerShotCells.js')(stateFile)
  }
  return powersModule;
}
