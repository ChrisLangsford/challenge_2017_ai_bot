module.exports = function seekerShotCellsMaker(state) {
  var fs = require('fs');
  //read seeker shot file
  var seekerState = JSON.parse(fs.readFileSync('./seekerShots.json', 'utf8'));
  var seekerShotCells = [];
  var battleMap = require('../mapReader.js')(state);
  var x = getRandomInt(2,state.MapDimension-3);
  var y = getRandomInt(2,state.MapDimension-3);

seekerShotCells.push(battleMap.get(x,y));
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  return seekerShotCells;
}
