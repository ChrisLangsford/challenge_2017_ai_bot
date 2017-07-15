module.exports = function potentialShipFinder(state) {
    var battleMap = require('./mapReader.js')(state);
    var getRowShapes = require('./heatmap/identifyRowShapes.js');
    var getColumnShapes = require('./heatmap/identifyColumnShapes.js');
    var potentialShips = [];
    var returnVal;

    potentialShips = getRowShapes(battleMap, state)
                    .concat(getColumnShapes(battleMap, state));

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



    return returnVal = battleMap;
}
