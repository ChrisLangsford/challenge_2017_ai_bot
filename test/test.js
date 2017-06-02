var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    to = chai.to,
    not = chai.not,
    have = chai.have;

var blankState = require('../state_files/eg_state1.json');
var battleMap = require('../mapReader.js')(blankState);
