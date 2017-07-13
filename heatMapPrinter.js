module.exports = function heatmapPrinter(state) {
  var map = require('./potentialShipFinder.js')(state);
  for (var i = 0; i < state.MapDimension; i++) {
    var row = "";
    for (var j = 0; j < map.getRow(i).length; j++) {
      row += " "+map.get(i,j).Probability;
    }
    row +='\n';
  }
}
