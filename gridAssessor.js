module.exports = function gridAssessor(grid){
  var sortedGrid = grid.sort(function(a, b) {
    return parseFloat(a.Probability) - parseFloat(b.Probability);
  });

  return sortedGrid.reverse()[0];
};
