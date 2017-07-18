module.exports = function getProbabilitySpread(state) {
var dim = state.MapDimension;
var battleMap = require('./mapReader.js')(state);
var grid = [];
battleMap.forEach((e=>{grid.push(e)}));

var cell = {};
  for (var i = 0; i < grid.length; i++) {

    if (grid[i].Damaged) {
        grid[i].Probability = -1;
      if (grid[i+1] && !(grid[i+1].Damaged || grid[i+1].Missed)) {
        grid[i+1].Probability += 1;
      }
      if (grid[i-1] && grid[i-1].Y !=(dim-1) && !(grid[i-1].Damaged || grid[i-1].Missed)) {
        grid[i-1].Probability += 1;
      }
      if (grid[i+dim] && !(grid[i+dim].Damaged || grid[i+dim].Missed)) {
        grid[i+dim].Probability += 1;
      }
      if (grid[i-dim] && !(grid[i-dim].Damaged || grid[i-dim].Missed)) {
        grid[i-dim].Probability += 1;
      }
    }
    if (grid[i].Missed) {
      grid[i].Probability = -1;
    }
  }

return grid;
};
