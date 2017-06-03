module.exports = function huntingShot(dim) {
  var targetCell = {
    "X": 0,
    "Y": 0
  };

  do {
    targetCell.X = Math.floor(Math.random() * dim);
    targetCell.Y = Math.floor(Math.random() * dim);
  } while (!((targetCell.X % 2 == 0 && targetCell.Y % 2 ==0) || (targetCell.X % 2 == 1 && targetCell.Y % 2 == 1)));
return targetCell;
};
