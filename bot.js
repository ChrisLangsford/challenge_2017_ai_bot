var fs = require('fs');

var commandFileName = "command.txt";
var placeShipFileName = "place.txt";
var stateFileName = "state.json";

// This will be set in initBot function
var key = "";
var workingDirectory = "";

// Capture the arguments
initBot(process.argv.slice(2));

function initBot(args) {
    key = args[0];
    workingDirectory = args[1];

    // Read the current state and choose an action
    var stateFile = require(workingDirectory + '/' + stateFileName);
    var phase = stateFile.Phase;

    if(phase == 1) {
        placeShips(workingDirectory, stateFile);
    }
    if(phase == 2) {
        fireOrDoNothing(workingDirectory);
    }
}

function placeShips(workingDirectory, state) {
    // Hardcoded ship placement
    var payload = '';
    var mapDimension = state.MapDimension || 10;
    switch (mapDimension) {
      case 7:
      payload =
      "Carrier 0 6 East" + "\n"+
      "Battleship 4 0 North" + "\n"+
      "Cruiser 6 2 North" + "\n"+
      "Submarine 1 2 North" + "\n"+
      "Destroyer 0 0 East" + "\n";
        break;
      case 10:
      payload =
        "Carrier 1 0 North" + "\n"+
        "Battleship 2 8 East" + "\n"+
        "Cruiser 5 4 North" + "\n"+
        "Submarine 7 1 North" + "\n"+
        "Destroyer 9 9 South" + "\n";
        break;
      case 14:
      payload =
      "Carrier 1 0 North" + "\n"+
      "Battleship 2 8 East" + "\n"+
      "Cruiser 5 4 North" + "\n"+
      "Submarine 7 1 North" + "\n"+
      "Destroyer 9 9 South" + "\n";
        break;
    }


    fs.writeFile(workingDirectory + '/' + placeShipFileName, payload,
    function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Ships were placed");
    });
}

function fireOrDoNothing(workingDirectory) {
    var stateFile = require(workingDirectory + '/' + stateFileName);
    var target = require('./selectFiringMethod.js')(stateFile);

    var xCoordinate = target.X;
    var yCoordinate = target.Y;
    var weapon = target.Weapon;

    var payload = weapon+ "," + xCoordinate + "," + yCoordinate + "\n";

    fs.writeFile(workingDirectory + '/' + commandFileName, payload, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("A shot was fired");
    });
}
