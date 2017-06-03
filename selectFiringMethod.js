module.exports = function selectFiringMethod(state) {
var targetCell;
var battleMap = require('./mapReader.js')(state);
//hunt or chase
do {
  targetCell = require('./chasingShot.js')(state.MapDimension);
  targetOnMap = battleMap.get(targetCell.X, targetCell.Y);
} while (targetOnMap.Damaged || targetOnMap.Missed);

return targetCell;
};
