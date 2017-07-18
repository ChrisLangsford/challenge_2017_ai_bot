module.exports = function chasingShot(state) {
var getProbabilitySpread = require('./getProbabilitySpread.js')(state);
var targetCell =
  getProbabilitySpread.sort((a,b)=>{return parseFloat(a.Probability) - parseFloat(b.Probability);}).reverse();
  targetCell[0]["Weapon"] = 1;
return targetCell[0];
};
