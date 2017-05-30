module.exports = function acquireTarget(state) {
  "use strict";
  var grid = state.OpponentMap.Cells;
  var dim = state.MapDimension;
  grid.forEach((e)=>{e.Probability =0});
  //console.log(JSON.stringify(grid));
  var cell = {};
  for (var i = 0; i < grid.length; i++) {

    if (grid[i].Damaged) {
        grid[i].Probability = -1;
      if (grid[i+1] && !(grid[i+1].Damaged || grid[i+1].Missed)) {
        grid[i+1].Probability += 1;
      }
      if (grid[i-1] && !(grid[i-1].Damaged || grid[i-1].Missed)) {
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
  grid.sort(function(a, b) {
    return parseFloat(a.Probability) - parseFloat(b.Probability);
  });
  return grid;
};
