module.exports = function huntingShot(dim) {
  var targetCell = {
    "X": 0,
    "Y":0
  };
  targetCell.X = Math.floor(Math.random() * dim);
  targetCell.Y = Math.floor(Math.random() * dim);
return targetCell;
};
