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
        placeShips(workingDirectory);
    }
    if(phase == 2) {
        fireOrDoNothing(workingDirectory);
    }
}

function placeShips(workingDirectory) {
    // Hardcoded ship placement
    var payload =
      "Carrier 1 0 North" + "\n" +
      "Battleship 2 0 North" + "\n" +
      "Cruiser 4 0 North" + "\n" +
      "Submarine 6 0 North" + "\n" +
      "Destroyer 8 0 North" + "\n";

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
    console.log(workingDirectory + '/' + stateFile);
    console.log("Round: "+stateFile.Round);
    var target = require('./assessGrid.js')(stateFile);

    var fire = 1;
    if (stateFile.Round == 1) {
      var xCoordinate = Math.floor(Math.random() * 10);
      var yCoordinate = Math.floor(Math.random() * 10);
    } else {
        //console.log('Target:'+ JSON.stringify(target));
        xCoordinate = target.X;
        yCoordinate = target.Y;
    }

    var payload = fire + "," + xCoordinate + "," + yCoordinate + "\n";
    fs.writeFile(workingDirectory + '/' + commandFileName, payload, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("A shot was fired");
    });
}
