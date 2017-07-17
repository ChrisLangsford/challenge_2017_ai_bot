module.exports = function crossShotCellsMaker(state) {
  var cornerShotCells = [];
  var battleMap = require('../mapReader.js')(state);

  battleMap.forEach((cell)=>{
    if(battleMap.getNeighbours(cell.X, cell.Y).length == 8){
      if (battleMap.get(cell.X, cell.Y).Damaged || battleMap.get(cell.X, cell.Y).Missed) {
            var possibleCornerShot = true;
            battleMap.getNeighbours(cell.X, cell.Y).forEach((e)=>{
              var counter = 0;
              if (counter == 1 || counter == 3 || counter == 4 || counter == 6) {
                if (e.Damaged ||e.Missed) {
                  possibleCornerShot = false;
                }
              }
              counter++;
            });
            if (possibleCornerShot) {
              cornerShotCells.push(cell);
            }
          }
      }
    });

  return cornerShotCells;
}
