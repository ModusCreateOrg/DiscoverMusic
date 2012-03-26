Config.documentRoot = 'actions';
Config.numChildren = 25;
Config.port = 80;

var curl       = require('builtin/curl'),
    fs         = require('builtin/fs'),
    getGenres  = require('actions/getGenres.js'),
    getMp3File = require('actions/getMP3File.js');

// Add julian calendar method
Date.prototype.getJulian = function() {
    return Math.floor((this / 86400000) - (this.getTimezoneOffset()/1440) + 2440587.5);
};

var doCurlRequest = function(url) {
    var handle  = curl.init(url),
        success = curl.perform(handle),
        text    = curl.getResponseText(handle);

    curl.destroy(handle);

    return success === 0 ? text : false;
};

var getFileData = function(fileName) {
    var data  = fs.readFile(fileName);
    return data ? Json.decode(data) : false;
};

var writeFileData = function(fileName, data) {
    return fs.writeFile(fileName, Json.encode(data));
};


