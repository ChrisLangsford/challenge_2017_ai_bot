module.exports = function fire(state, grid) {
  //console.log("grid"+JSON.stringify(grid));
  var xCoordinate;
  var yCoordinate;
  if (state.Round == 1 || grid.Probability == 0) {
    xCoordinate = Math.floor(Math.random() * state.MapDimension);
    yCoordinate = Math.floor(Math.random() * state.MapDimension);
  } else {
    xCoordinate = grid.X;
    yCoordinate = grid.Y;
  }
  return "1" + "," + xCoordinate + "," + yCoordinate + "\n";
};
