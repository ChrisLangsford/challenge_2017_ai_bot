module.exports = function mapReader(stateFile) {
  var grid_array = require('fixed-2d-array');
  var dim = stateFile.MapDimension;
  var cell_template = {
        "X": 0,
        "Y": 0,
        "Damaged": false,
        "Misssed": false,
        "Probability": 0,
        "Checkered": false
  };

  var battleMap = new grid_array(dim,dim,cell_template);

  for (var i = 0; i < stateFile.OpponentMap.Cells.length; i++) {
    battleMap.set(
      stateFile.OpponentMap.Cells[i].X,
      stateFile.OpponentMap.Cells[i].Y,
      {
        X: stateFile.OpponentMap.Cells[i].X,
        Y: stateFile.OpponentMap.Cells[i].Y,
        Damaged: stateFile.OpponentMap.Cells[i].Damaged,
        Missed: stateFile.OpponentMap.Cells[i].Missed,
        Probability: 0,
        Checkered: assignParity(stateFile,stateFile.OpponentMap.Cells[i].X, stateFile.OpponentMap.Cells[i].Y)
    });
  };

  function assignParity(state,x,y){
    var shortestShip = require('./getShortestShipLength.js')(state);
    if (((x+y)%shortestShip) == 0) {
      return false;
    }else {
      return true;
    }
  }

  return battleMap;
};
