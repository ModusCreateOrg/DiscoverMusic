var getStationUrl = function(genreId) {
    return "http://api.npr.org/query"
        + "?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001"
        + '&id=' + genreId
        + '&requiredAssets=audio,image'
        + '&numResults=5'
        + '&fields=title,teaser,storyDate,text,audio,image,artist'
        + '&transform=source'
        + '&output=JSON';
};

var imageGarbageRegex = /\.jpg.*/g;

var cleanupGenre = function(genreData) {
    genreData = genreData.list;
    debugger;
    delete genreData.miniTeaser;
    delete genreData.link;

    genreData.title = genreData.title.$text;
    genreData.teaser = genreData.teaser.$text;

    genreData.story.each(function(story) {

        console.log('Cleaning up ' + story.title.$text);

        delete story.link;
        story.title = story.title.$text;
        story.teaser = story.teaser.$text;
        story.storyDate = story.storyDate.$text;

        if (story.audio) {
            story.audio.each(function(audio) {
                delete audio.duration;
                delete audio.rightsHolder;
                delete audio.permissions;
                delete audio.downloadExpirationDate;
                delete audio.stream;

                audio.title = audio.title.$text;
                audio.description = audio.description.$text;

                if (audio.format.mp3) {
                    audio.format.mp3.each(function(audioFormat) {
                        if (audioFormat.type == 'm3u' || audioFormat.type == 'mp3') {
                            audio.m3u = audioFormat.$text;
                            delete audio.type;
                            delete audio.description;

                            story.audio = audio;
                            return false;
                        }
                    });
                }

                delete audio.format;
            });

//            console.log('Fetching audio file for ' + story.title);
            story.audio = getMp3File(story.audio.m3u, true);
        }
//        else {
//            console.log('NO AUDIO FOR STORY ' + story.name);
//        }

        var foundImage;

        if (story.image) {

            story.image.each(function(image) {

                delete image.id;
                delete image.width;
                delete image.hasBorder;
                delete image.link;
                delete image.producer;
                delete image.provider;
                delete image.enlargement;
                delete image.crop;
                delete image.copyright;

                image.title = image.title.$text;
                image.caption = image.caption.$text;

                if (!image.type == 'primary') {
                    foundImage = image;
                    delete image.caption;
                    return false;
                }
            });
            if (foundImage) {
                story.image = foundImage;
            }
            else {
                story.image = story.image[0];
            }
            delete story.image.type;
            delete story.image.caption;

            story.image.src = story.image.src.replace(imageGarbageRegex, '.jpg');
        }
//        else {
//            console.log('NO IMAGE FOR STORY ' + story.name);
//        }

        var newParagraphs = [];
        story.text.paragraph.each(function(paragraph) {
            newParagraphs.push(paragraph.$text);
        });

        story.text = newParagraphs;
    });

    return genreData;
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

    var currentJDate = new Date().getJulian(),
        url,
        data;

    genres = fetchGenres(currentJDate, true) || genres;
    genres.each(function(genre) {

        if (!genre.lastUpdate || genre.lastUpdate !== currentJDate) {
            url = getStationUrl(genre.id);
            data = doCurlRequest(url);

            if (data) {
                console.log('cURL :: ' + genre.id + ' ' + genre.name);
                genre.data = Json.decode(data);

                genre.data = cleanupGenre(genre.data);
                addUpdateGenre(genre);
            }
        }
//        else {
//            console.log('cache ::  ' + genre.id + ' ' + genre.name);
//        }
    });


    var response = Json.encode(genres);
    if (req.data.callback) {
        response = req.data.callback + '(' + response + ')';
    }

    console.log('>>>>>>>> DONE >>>>>>> ' + new Date().toLocaleString());
    //    Json.success({ data : data });
    return true;//response;
    //    Json.success(genres);
};
