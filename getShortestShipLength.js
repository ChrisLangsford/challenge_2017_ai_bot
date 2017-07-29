module.exports = function(state) {
var shortestLength=2;
var lengths = [];

  state.OpponentMap.Ships.forEach((ship)=>{
    if (ship.Destroyed ==false) {
    switch (ship.ShipType) {
      case ("Destroyer"):
      lengths.push(2);
        break;
      case ("Submarine"):
      lengths.push(3);
        break;
      case ("Cruiser"):
      lengths.push(3);
        break;
      case ("Battleship"):
      lengths.push(4);
        break;
      case ("Carrier"):
      lengths.push(5);
        break;
    }
  }
  shortestLength = Math.min.apply(null, lengths);
  });
  
  return shortestLength;
}
