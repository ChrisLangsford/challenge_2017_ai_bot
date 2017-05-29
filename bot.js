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
    // var target = acquireTarget(stateFile);
    // console.log(target);

    // var fire = 1;
    // if (stateFile.Round == 1) {
    //   var xCoordinate = Math.floor(Math.random() * 10);
    //   var yCoordinate = Math.floor(Math.random() * 10);
    // } else {
    //     //console.log('Target:'+ JSON.stringify(target));
    //     xCoordinate = target.X;
    //     yCoordinate = target.Y;
    // }
    //
    // var payload = fire + "," + xCoordinate + "," + yCoordinate + "\n";
    var payload = require('./fire.js')(stateFile, acquireTarget(stateFile));
    fs.writeFile(workingDirectory + '/' + commandFileName, payload, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("A shot was fired");
    });
}

function acquireTarget(state){
  "use strict";
  var grid = state.OpponentMap.Cells;
  grid.forEach((e)=>{e.Probability =0});
  //console.log(JSON.stringify(grid));
  var cell = {};
  for (var i = 0; i < grid.length; i++) {

    if (grid[i].Damaged) {
        grid[i].Probability = -1;
      if (grid[i+1] && !(grid[i+1].Damaged || grid[i+1].Missed)) {
        grid[i+1].Probability += 1;
      }
      if (grid[i-1] && !(grid[i-1].Damaged || grid[i-1].Missed)) {
        grid[i-1].Probability += 1;
      }
      if (grid[i+10] && !(grid[i+10].Damaged || grid[i+10].Missed)) {
        grid[i+10].Probability += 1;
      }
      if (grid[i-10] && !(grid[i-10].Damaged || grid[i-10].Missed)) {
        grid[i-10].Probability += 1;
      }
    }

    if (grid[i].Missed) {
      grid[i].Probability = -1;
    }
  }
  grid.sort(function(a, b) {
    return parseFloat(a.Probability) - parseFloat(b.Probability);
  });
  //console.log("Assessor Grid: "+ JSON.stringify(grid.reverse()[0]));
  return grid.reverse()[0];
}

function fire(state, grid) {
  //console.log("grid"+JSON.stringify(grid));
  var xCoordinate;
  var yCoordinate;
  if (state.Round == 1 || grid.Probability == 0) {
    xCoordinate = Math.floor(Math.random() * state.MapDimension);
    yCoordinate = Math.floor(Math.random() * state.MapDimension);
  } else {
    xCoordinate = grid.X;
    yCoordinate = grid.Y;
  }
  return "1" + "," + xCoordinate + "," + yCoordinate + "\n";
}
