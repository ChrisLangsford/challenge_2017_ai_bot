module.exports = function huntingShot(state) {
  var availableAttacks = require('./powers_module/findAvailableAttacks.js')(state);
  var powersModule = require('./powers_module/powers_module.js')(state);
  var battleMap = require('./mapReader.js')(state);
  var targetCell = {
    "X": 0,
    "Y": 0,
    "Weapon": 1
  };

  availableAttacks.forEach((weapon)=>{
    if (weapon.WeaponType == "SeekerMissle" && powersModule.seekerShotCells.length > 0) {
      targetCell.X = powersModule.seekerShotCells[0].X;
      targetCell.Y = powersModule.seekerShotCells[0].Y;
      targetCell.Weapon = 7;
    }
    if (weapon.WeaponType == "DiagonalCrossShot" && powersModule.diagonalCrossShotCells.length > 0) {
      targetCell.X = powersModule.diagonalCrossShotCells[0].X;
      targetCell.Y = powersModule.diagonalCrossShotCells[0].Y;
      targetCell.Weapon = 5;
    }
    if (weapon.WeaponType == "CrossShot" && powersModule.crossShotCells > 0) {
      targetCell.X = powersModule.crossShotCells[0].X;
      targetCell.Y = powersModule.crossShotCells[0].Y;
      targetCell.Weapon = 6;
    }
    if (weapon.WeaponType == "CornerShot" && powersModule.cornerShotCells > 0) {
      targetCell.X = powersModule.cornerShotCells[0].X;
      targetCell.Y = powersModule.cornerShotCells[0].Y;
      targetCell.Weapon = 4;
    }
    if (weapon.WeaponType == "SingleShot") {
      do {
        targetCell.X = Math.floor(Math.random() * state.MapDimension);
        targetCell.Y = Math.floor(Math.random() * state.MapDimension);
      } while (!(battleMap.get(targetCell.X, targetCell.Y).Checkered));
      targetCell.Weapon = 1;
    }
  });

return targetCell;
};
