module.exports = function potentialShipFinder(state) {
    var battleMap = require('./mapReader.js')(state);
    var potentialShips = [];
    var returnVal;

//TODO: find a better way of creating potential ship objects made of cells.
        for (var j = 0; j < state.MapDimension; j++) {
            var shape = [];
            var row = battleMap.getRow(j);
            for (var i = 0; i < row.length; i++) {
                if (row[i].Missed || row[i].Damaged) {
                    potentialShips.push(shape);
                    i++;
                } else {
                    shape.push(row[i]);
                }
              };
              potentialShips.push(shape);
        }

        for (var j = 0; j < state.MapDimension; j++) {
            var shape = [];
            var row = battleMap.getColumn(j);
            for (var i = 0; i < row.length; i++) {
                if (row[i].Missed || row[i].Damaged) {
                    potentialShips.push(shape);
                    i++;
                } else {
                    shape.push(row[i]);
                }
              };
              potentialShips.push(shape);
        }

        var unique = potentialShips.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        })


    return returnVal;
}
