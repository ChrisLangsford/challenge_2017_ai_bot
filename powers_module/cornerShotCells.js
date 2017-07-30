module.exports = function crossShotCellsMaker(state) {
  var cornerShotCells = [];
  var battleMap = require('../mapReader.js')(state);

  battleMap.forEach((cell)=>{
    if(battleMap.getNeighbours(cell.X, cell.Y).length == 8){
      if (battleMap.get(cell.X, cell.Y).Damaged || battleMap.get(cell.X, cell.Y).Missed && battleMap.get(cell.X, cell.Y).Checkered) {
            var possibleCornerShot = true;
            battleMap.getNeighbours(cell.X, cell.Y).forEach((e)=>{
              var counter = 0;
              if (possibleCornerShot && (counter == 1 || counter == 3 || counter == 4 || counter == 6)) {
                if (e.Damaged ||e.Missed) {
                  possibleCornerShot = false;
                }
              }
              counter++;
            });
            if (possibleCornerShot && !((cell.X % 2 == 0 && cell.Y % 2 ==0) || (cell.X % 2 == 1 && cell.Y % 2 == 1))) {
              cornerShotCells.push(cell);
            }
          }
      }
    });

  return cornerShotCells;
}
