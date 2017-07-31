module.exports = function seekerShotCellsMaker(state) {
  var seekerShotCells = [];
  var battleMap = require('../mapReader.js')(state);
    do {
      let x = Math.floor(Math.random() * state.MapDimension);
      let y = Math.floor(Math.random() * state.MapDimension);
    } while ((x >=2 && y <= state.MapDimension-2));
    seekerShotCells.push(battleMap.get(x,y));

  return seekerShotCells;
}
