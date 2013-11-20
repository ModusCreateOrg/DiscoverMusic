var request = require('request'),
    fs      = require('fs'),
    url     = require('url'),
    path    = require('path'),
    mkdirp  = require('mkdirp');

var Pull = {
    init      : function () {
        this.getGenres();
    },
    getGenres : function () {
        var me = this,
            genreData;

        request('http://discovermusic.moduscreate.com/getGenres', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                genreData = JSON.parse(body);                    
                me.scrapeMediaData(genreData);             
            }
        });
    },
    scrapeMediaData : function (json) {
        var genreLength    = json.length,
            audioFilePaths = [],
            imageFilePaths = [],
            genre,
            articles,
            articlesLength,
            article,
            articleAudio,
            articleAudioMedia,
            articleImage,
            articleImageMedia,
            i, j;

        for (i = 0; i < genreLength; i++) {
            genre          = json[i];
            articles       = genre.data.story;
            articlesLength = articles.length;

            for (j = 0; j < articlesLength; j++) {
                article      = articles[j];
                articleAudio = article.audio;
                articleImage = article.image;

                if (articleImage) {
                    articleImageMedia = this.getMediaInfo(articleImage);
                    articleImage.src  = 'data/image' + articleImageMedia.path;
                    
                    imageFilePaths.push(articleImageMedia);
                    this.buildDirectories(articleImageMedia.path, 'image');
                }

                if (articleAudio) {
                    articleAudioMedia = this.getMediaInfo(articleAudio);
                    articleAudio.src  = 'data/audio' + articleAudioMedia.path;

                    audioFilePaths.push(articleAudioMedia);
                    this.buildDirectories(articleAudioMedia.path, 'audio');
                }
            }
        }
        
        this.writeMediaFiles(imageFilePaths, 'image');
        this.writeMediaFiles(audioFilePaths, 'audio');
        this.writeFile('data/genres.json', JSON.stringify(json));
    },
    getMediaInfo : function (articleMedia) {
        var fileSrc = articleMedia.src;

        return {
            src  : fileSrc,
            path : url.parse(fileSrc).path
        }
    },
    buildDirectories : function (directoryPath, mediaType) {
        mkdirp.sync('data/' + mediaType + path.dirname(directoryPath));
    },
    writeMediaFiles : function (mediaFiles, mediaType) {
        var length = mediaFiles.length,
            media,
            i;

        for (i = 0; i < length; i++) {
            media = mediaFiles[i];
            console.log('Ripping file', media);
            request(media.src).pipe(fs.createWriteStream('data/' + mediaType + media.path));
        }
    },
    writeFile : function (path, data) {
        fs.writeFile(path, data, function (err) {
            if (err) {
                console.log('failed writing file');
                process.exit(1);
            }
            console.log('Genre data file written successfully');
        });
    }
};

Pull.init();