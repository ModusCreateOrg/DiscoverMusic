Config.documentRoot = 'docroot';
Config.numChildren = 25;
Config.port = 9090;

Config.mysql = {
    host   : 'localhost',
    user   : 'root',
    passwd : '',
    db     : 'npr'
};

SQL = new MySQL();
SQL.connect();

//Include libraries
Server = require('Server');
Schema = require('Schema');

Schema.add({
    name       : 'genres',
    primaryKey : 'dbid',

    fields : [
        {
            name          : 'dbid',
            type          : 'int',
            autoIncrement : true
        },
        {
            name : 'db_key',
            type : 'varchar',
            size : 32
        },
        {
            name : 'id',
            type : 'varchar',
            size : 32
        },
        {
            name : 'lastUpdate',
            type : 'int'
        },
        {
            name : 'name',
            type : 'varchar',
            size : 32
        },
        {
            name : 'data',
            type : 'longtext'
        }
    ]
});

// Add required built in & custom modules
var curl = require('builtin/curl'),
    fs = require('builtin/fs'),
    updateGenres = require('actions/updateGenres.js'),
    getGenres = require('actions/getGenres.js'),
    stationFinder = require('actions/stationFinder.js'),
    getMp3File = require('actions/getMp3File.js'),
    search = require('actions/search.js');


// Add julian calendar method
Date.prototype.getJulian = function() {
    return Math.floor((this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5);
};

var addUpdateGenre = function(genre) {
    var today      = new Date().getJulian(),
        query      = 'SELECT * FROM genres WHERE lastUpdate="' + today + '" AND db_key="' +  genre.key + '"',
        row        = SQL.getDataRow(query);

//
    if (row) {
        return row;
    }
    else {
        console.log('Schema.putOne > ' + genre.name);
        genre.data = Json.encode(genre.data);
        genre.db_key = genre.key;
        genre.lastUpdate = today;
        delete genre.key;
        return Schema.putOne('genres', genre);
    }
};

var fetchGenres = function(requestDate) {
    var today = new Date().getJulian(),
        query = 'SELECT * from genres where lastUpdate=' + (requestDate || today) + '',
        data;

    data = SQL.getDataRows(query);
    if (data && data.length > 0) {
        data.each(function(genre) {
            genre.db = genre.db_key;
            delete genre.db_key;
            genre.data = Json.decode(genre.data);
        });
        return data;
    }

    else {
        return false;
    }
};



//TODO: Make this the public fetchGenres
var fetchGenresExternal = function(requestDate, returnFalse) {
    var today = new Date().getJulian(),
        query = 'SELECT * from genres where lastUpdate=' + (requestDate || today) + '',
        data;

    if (requestDate && (requestDate < (today - 50) ||  requestDate > (today + 50))) {
        return { msg : 'no data' };
    }

    console.log(new Date().toString() + ' fetching for ' + requestDate);

    data = SQL.getDataRows(query);
    if (data && data.length > 0) {
        data.each(function(genre) {
            genre.key = genre.db_key;
            delete genre.db_key;
            genre.data = Json.decode(genre.data);
        });
        return data;
    }
    else if (requestDate && requestDate > today) {
        return fetchGenres(requestDate - 1)
    }
    else if (requestDate && requestDate <= today) {

        return { msg : 'no data' };
    }
    else {
        return returnFalse ? false : { msg : 'no data' };
    }
};


// utils
var doCurlRequest = function(url) {
    var handle = curl.init(url),
        success = curl.perform(handle),
        text = curl.getResponseText(handle);

    curl.destroy(handle);

    return success === 0 ? text : false;
};

var getFileData = function(fileName) {
    var data = fs.readFile(fileName);
    return data ? Json.decode(data) : false;
};

var writeFileData = function(fileName, data) {
    return fs.writeFile(fileName, Json.encode(data));
};
//

