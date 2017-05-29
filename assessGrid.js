module.exports = function assessGrid(state){
  "use strict";
  var grid = state.OpponentMap.Cells;
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
              if (grid[i+10] && !(grid[i+10].Damaged || grid[i+10].Missed)) {
                grid[i+10].Probability += 1;
              }
              if (grid[i-10] && !(grid[i-10].Damaged || grid[i-10].Missed)) {
                grid[i-10].Probability += 1;
              }
            }

            if (grid[i].Missed) {
              grid[i].Probability = -1;
            }
          }
          grid.sort(function(a, b) {
            return parseFloat(a.Probability) - parseFloat(b.Probability);
          });
          //console.log("Assessor Grid: "+ JSON.stringify(grid.reverse()));
          return grid.reverse()[0];
        };
