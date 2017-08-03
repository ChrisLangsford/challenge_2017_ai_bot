module.exports = function seekerShotCellsMaker(state) {
  var fs = require('fs');
  //read seeker shot file
  //TODO: Fix this to never go for same seeker shot more than once
  //only push seeker cell if none of the potential cells surrounding are hits?
  var seekerState = JSON.parse(fs.readFileSync('./seekerShots.json', 'utf8'));
  var seekerShotCells = [];
  var battleMap = require('../mapReader.js')(state);
  var notNeighbours = [0,1,3,4,5,9,14,18,19,20,22,23];

battleMap.forEach((cell)=>{
  var cellNeighbours = battleMap.getNeighbours(cell.X, cell.Y, 2);
  var cellEligibleForSeekerShot = true;

  if (!cell.Damaged && !cell.Missed && cellNeighbours.length == 24 && cell.X >=2 && cell.X <= state.MapDimension-2 && cell.Y >=2 && cell.Y <= state.MapDimension-2) {
    var counter = 0;
    cellNeighbours.forEach((neighbour)=>{
      if (neighbour.Damaged && !notNeighbours.includes(counter)) {
        cellEligibleForSeekerShot = false;
      }
      counter++;
    });
  } else {
    cellEligibleForSeekerShot = false;
  }

  if (cellEligibleForSeekerShot) {
    seekerShotCells.push(battleMap.get(cell.X,cell.Y))
  }
});
  return seekerShotCells;
}
