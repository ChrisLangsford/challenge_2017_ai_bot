module.exports = function potentialShipFinder(state) {
    var battleMap = require('./mapReader.js')(state);
    var potentialShips = [];
    var returnVal;

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

        var remainingShips = [];
        state.OpponentMap.Ships.filter((ship)=>{
          if (!ship.Destroyed){
            switch (ship.ShipType) {
              case "Submarine":
              remainingShips.push(3);
              break;
              case "Destroyer":
              remainingShips.push(2);
              break;
              case "Battleship":
              remainingShips.push(4);
              break;
              case "Carrier":
              remainingShips.push(5);
              break;
              case "Cruiser":
              remainingShips.push(3);
              break;
            };
          }
        });

        unique.forEach((e)=>{
          remainingShips.forEach((length)=>{
            if (remainingShips.includes(length) && e.length >= length){
              e.forEach((cell)=>{
                battleMap.get(cell.X, cell.Y).Probability++;
              });
          }
        });
        });
// TODO: Return battleMap and sort by Probability for hunting shot. Apply parity rule to resulting shot
    return returnVal;
}
