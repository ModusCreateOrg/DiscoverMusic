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


var getStationUrl = function(genreId, searchTerm) {
    return "http://api.npr.org/query"
        + "?apiKey=MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001"
        + '&id=' + genreId
        + '&requiredAssets=audio,image'
        + '&numResults=' + 20
        + '&fields=all'
        + '&transform=source'
        + '&action=Or'
        + '&output=JSON'
        + '&searchTerm=' + searchTerm;
};

var imageGarbageRegex = /\.jpg.*/g;

var cleanupGenre = function(genreData) {
    var genre;

    genreData = genreData.list;
    delete genreData.miniTeaser;
    delete genreData.link;

    genreData.title = genreData.title.$text;
    genreData.teaser = genreData.teaser.$text;
    var stories = [];

    genreData.story.each(function(story) {
        if (! story.text ) {
            return;
        }

        story.title = story.title.$text;
        story.teaser = story.teaser.$text;
        story.storyDate = story.storyDate.$text;


        var genreString = 'genre';
        if (story.parent) {
            story.parent.each(function(parentObj) {

                if (parentObj.type == genreString) {

                    genres.each(function(g) {
                        if (g.id == parentObj.id) {
                            genre = g;
                            return false;
                        }

                    });

                    return false;
                }
            });
        }

        if (story.audio) {
            story.audio.each(function(audio) {
                delete audio.duration;
                delete audio.rightsHolder;
                delete audio.permissions;
                delete audio.downloadExpirationDate;
                delete audio.stream;

                audio.title = audio.title.$text || story.title;
                audio.description = audio.description.$text;


                if (audio.description == 'null' || ! audio.description) {
                    audio.description = audio.title;
                }

                if (audio.format.mp3) {
                    audio.format.mp3.each(function(audioFormat) {
                        if (audioFormat.type == 'm3u' || audioFormat.type == 'mp3') {

                            delete audioFormat.type;
                            audio.src = getMp3File(audioFormat.$text, true);
                            story.audio = audio;
                            return false;
                        }
                    });
                }

                delete audio.format;
            });
//            debugger;
        }

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

        var itemsToDelete = [
            'artist',
            'byline',
            'collection',
            'relatedLink',
            'container',
            'externalAsset',
            'product',
            'fullText',
            'keywords',
            'lastModifiedDate',
            'link',
            'member',
            'miniTeaser',
            'organization',
            'parent',
            'performance',
            'priorityKeywords',
            'pubDate',
            'pullQuote',
            'shortTitle',
            'show',
            'slug',
            'song',
            'subtitle',
            'textWithHtml',
            'transcript',
            'thumbnail'
        ];

        itemsToDelete.each(function(item) {
            delete story[item];
        });

        var newParagraphs = '';

        story.text.paragraph.each(function(paragraph) {
            newParagraphs += '<p>' + paragraph.$text +'</p>';
        });

        story.genreKey = genre.key;
        story.genre = genre.name;
        story.text = newParagraphs;
        stories.push(story)
    });

    return stories;
};

global.search_action = function() {
    var ids        = [],
        searchTerm = req.data.searchTerm,
        url,
        data;

    if (! searchTerm) {
        Json.failure('You must include a searchTerm!');
    }

    genres.each(function(genre) {
        ids.push(genre.id);
    });

    url = getStationUrl(req.data.genres || ids.toString(), searchTerm);
//    console.log(url);
    data = doCurlRequest(url);
    data = Json.decode(data);

    if (data && data.list && data.list.story) {
        data = cleanupGenre(data);
    }
    else {
        data = [];
    }



    var response = Json.encode(data);
    if (req.data.callback) {
        res.contentType = 'text/javascript';
        response = req.data.callback + '(' + response + ')';
    }

    res.write(response);
    res.stop();
    return true;//response;
};
