
var getStationUrl = function(genreId) {
    return "http://api.npr.org/query"
        + "?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001"
        + '&id=' + genreId
        + '&requiredAssets=audio,image'
        + '&numResults=10'
        + '&fields=title,teaser,storyDate,text,audio,image,artist'
        + '&transform=source'
        + '&output=JSON';
};


exports = function() {
    var genres = [
        {
            "id"   : 135408474,
            "key"  : "electronicDance",
            "name" : "Electronic"
        },
        {
            "id"   : 10005,
            "key"  : "hipHop",
            "name" : "Hip-Hop"
        },
        {
            "id"   : 139998808,
            "key"  : "rnb",
            "name" : "R&B / Soul"
        },
        {
            "id"   : 10001,
            "key"  : "rock",
            "name" : "Rock"
        },
        {
            "id"   : 139997200,
            "key"  : "pop",
            "name" : "Pop"
        },
        {
            "id"   : 10002,
            "key"  : "jazzBlues",
            "name" : "Jazz & Blues"
        },
        {
            "id"   : 10004,
            "key"  : "world",
            "name" : "World"
        },
        {
            "id"   : 92792712,
            "key"  : "country",
            "name" : "Country"
        },
        {
            "id"   : 139996449,
            "key"  : "latinAlternative",
            "name" : "Latin"
        },
        {
            "id"   : 10003,
            "key"  : "classical",
            "name" : "Classical"
        }
    ];

    var currentJDate = new Date().getJulian() + 9,
        fileName = 'genres.json',
        url,
        data;

    genres = getFileData(fileName) || genres;

    genres.each(function(genre) {

        if (! genre.lastUpdate || genre.lastUpdate !== currentJDate) {
            url  = getStationUrl(genre.id);
            data = doCurlRequest(url);

            if (data) {
//                console.log('cURL :: ' + genre.id + ' ' + genre.name);
                genre.data = Json.decode(data);
                genre.lastUpdate = currentJDate;
            }
        }
//        else {
//            console.log('cache ::  ' + genre.id + ' ' + genre.name);
//        }
    });


    writeFileData(fileName, genres);



    var response = Json.encode(genres);
    if (req.data.callback) {
        response = req.data.callback + '(' + response + ')';
    }

//    Json.success({ data : data });
    return response;
//    Json.success(genres);
};
