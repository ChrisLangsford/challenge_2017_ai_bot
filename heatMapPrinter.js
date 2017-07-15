module.exports = function heatmapPrinter(state) {
  var row = "";
  var map = require('./potentialShipFinder.js')(state);
  for (var i = 0; i < state.MapDimension; i++) {
    for (var j = 0; j < state.MapDimension; j++) {

      var cell = map.get(j,i);
      if (cell.Damaged) {
        row+=' * ';
      } else if (cell.Missed) {
        row+=' ! ';
      }
       else {
        var prob = " " + String(map.get(j,i).Probability)

        if (prob.length <= 2) {
          prob = " "+prob;
        }
        row += prob;
      }
    }
    row +='\r\n';
  }

  return row;
}
