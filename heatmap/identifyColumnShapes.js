module.exports = function identifyRowfoundShapes(battleMap, state) {
var foundShapes = [];

for (var j = 0; j < state.MapDimension; j++) {
    var shape = [];
    var row = battleMap.getRow(j);
    for (var i = 0; i < row.length; i++) {
        if (row[i].Missed || row[i].Damaged) {
            foundShapes.push(shape);
            i++;
        } else {
            shape.push(row[i]);
        }
      };
      foundShapes.push(shape);
}

return foundShapes;
}
