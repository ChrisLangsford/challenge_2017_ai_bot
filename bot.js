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
      "Battleship 2 8 East" + "\n" +
      "Cruiser 5 4 North" + "\n" +
      "Submarine 7 1 North" + "\n" +
      "Destroyer 9 9 South" + "\n";

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
    var target =  require('./targetSelector.js')(require('./acquireTarget.js')(stateFile));
    console.log(workingDirectory + '/' + stateFile);
    console.log("Round: "+stateFile.Round);

    var shot = require('./fire.js')(stateFile, target);
    var payload = "1" + "," + shot.X + "," + shot.Y + "\n";
    fs.writeFile(workingDirectory + '/' + commandFileName, payload, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("A shot was fired");
    });
}
