// TODO: Find out why (round 12) fired on 0,9, 1,9 & 2,9 on replay 2017-06-03 08-31-46-557
// TODO: Add tests for chasing shot
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
