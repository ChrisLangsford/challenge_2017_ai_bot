module.exports = function crossShotCellsMaker(state) {
  var cornerShotCells = [];
  var battleMap = require('../mapReader.js')(state);

  battleMap.forEach((cell)=>{
    //console.log(battleMap.getNeighbours(cell.X, cell.Y));
  });

  return cornerShotCells;
}