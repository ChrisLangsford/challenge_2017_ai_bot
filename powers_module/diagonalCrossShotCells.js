module.exports = function crossShotCellsMaker(state) {
  var diagonalCrossShotCells = [];
  var battleMap = require('../mapReader.js')(state);

  battleMap.forEach((cell)=>{
    if(battleMap.getNeighbours(cell.X, cell.Y).length == 8){
      if (!battleMap.get(cell.X, cell.Y).Damaged && !battleMap.get(cell.X, cell.Y).Missed && battleMap.get(cell.X, cell.Y).Checkered) {
            var possibleCrossShot = true;
            battleMap.getNeighbours(cell.X, cell.Y).forEach((e)=>{
              var counter = 0;
              if (possibleCrossShot && (counter == 0 || counter == 2 || counter == 5 || counter == 7)) {
                if (e.Damaged || e.Missed) {
                  possibleCrossShot = false;
                }
              }
              counter++;
            });
            if (possibleCrossShot && !((cell.X % 2 == 0 && cell.Y % 2 ==0) || (cell.X % 2 == 1 && cell.Y % 2 == 1))) {
              diagonalCrossShotCells.push(cell);
            }
          }
      }
    });

  return diagonalCrossShotCells;
}
