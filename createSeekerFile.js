module.exports = function () {
var fs = require('fs');

var myData = {};
var outputFilename = "seekerShots.json";

if (fs.existsSync(outputFilename)) {
    try {
        fs.unlinkSync(outputFilename);
        console.log("Old seeker file deleted successfully!");
    } catch (err) {
        return console.error(err);
    }
} else {
    console.log("Seeker file does not exist!");
}

var dataToWrite = JSON.stringify(myData);//,null,4);
try {
    fs.writeFileSync(outputFilename, dataToWrite);
    console.log("New Seeker file saved to " + outputFilename);
} catch (err) {
    return console.log(err);
}
};
