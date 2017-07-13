module.exports = function heatmapPrinter(state) {
  var row = "";
  var map = require('./potentialShipFinder.js')(state);
  for (var i = 0; i < state.MapDimension; i++) {
    for (var j = 0; j < map.getRow(i).length; j++) {
      var prob = " "+ String(map.get(i,j).Probability)
      if (prob.length <=2) {
        prob = " "+prob;
      }
      row += prob;
    }
    row +='\r\n';
    //console.log(row);
  }

  return row;
}
