module.exports = function selectFiringMethod(state) {
var targetCell;
var battleMap = require('./mapReader.js')(state);
//hunt or chase

targetCell = require('./chasingShot.js')(state);
if (!(targetCell.Probability && targetCell.Probability > 0)) {
  do {
    targetCell = require('./huntingShot.js')(state.MapDimension);
    targetOnMap = battleMap.get(targetCell.X, targetCell.Y);
  } while (targetOnMap.Damaged || targetOnMap.Missed);
};

return targetCell;
};
