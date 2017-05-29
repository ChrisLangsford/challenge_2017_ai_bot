var sampleState = require('./eg_state1.json');
var sampleState2 = require('./eg_state2.json');
var gridAssessor = require('./assessGrid.js')(sampleState2);

var target = gridAssessor;
console.log(gridAssessor);
