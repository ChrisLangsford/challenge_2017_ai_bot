module.exports = function chasingShot(state) {
var getProbabilitySpread = require('./getProbabilitySpread.js')(state);
var targetCell =
  getProbabilitySpread.sort((a,b)=>{return parseFloat(a.Probability) - parseFloat(b.Probability);}).reverse();

return targetCell[0];
};
