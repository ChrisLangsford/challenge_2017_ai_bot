module.exports = function fire(state, grid) {
  //console.log("grid"+JSON.stringify(grid));
  var xCoordinate;
  var yCoordinate;
  var shot;
  var target;
  if (state.Round == 1 || grid.Probability == 0) {
  do {
    shot=randomShot(state.MapDimension);
  } while ((shot.x%2 == 0 && shot.y%2 == 0) || (shot.x%2 == 1 && shot.y%2 == 1));
    xCoordinate = shot.x;
    yCoordinate = shot.y;
  } else {
    xCoordinate = grid.X;
    yCoordinate = grid.Y;
  }
  return {
    X: xCoordinate,
    Y: yCoordinate
  };
};

function randomShot(dim) {
var shot = {
  x: 0,
  y: 0
};

shot.x = Math.floor(Math.random() * dim);
shot.y =  Math.floor(Math.random() * dim);

return shot;

}
