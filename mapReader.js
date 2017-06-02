module.exports = function mapReader(stateFile) {
  var grid_array = require('fixed-2d-array');
  var cell_template = {
        "X": 0,
        "Y": 0,
        "Damaged": false,
        "Misssed": false,
        "Probability": 0
  };

  var battleMap = new grid_array(10,10,cell_template);

  for (var i = 0; i < stateFile.OpponentMap.Cells.length; i++) {
    battleMap.set(
      stateFile.OpponentMap.Cells[i].X,
      stateFile.OpponentMap.Cells[i].Y,
      {
        X: stateFile.OpponentMap.Cells[i].X,
        Y: stateFile.OpponentMap.Cells[i].Y,
        Damaged: stateFile.OpponentMap.Cells[i].Damaged,
        Missed: stateFile.OpponentMap.Cells[i].Missed,
        Probability: 0
    });
  };

  return battleMap;
};
