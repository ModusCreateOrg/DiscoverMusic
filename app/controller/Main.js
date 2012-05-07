/**
 * @class Music.controller.Main
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The main controller
 */
Ext.define('Music.controller.Main', {
    extend : 'Ext.app.Controller',

    loadMask : undefined,

    config : {
        audioHasPlayed : false,
        apiUrl         : 'http://api.npr.org/query',
        apiKey         : 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
        genresToLoad   : [],
        numErrors      : 0,
        numResults     : 10,

        models : [
            'Article',
            'Genre'
        ],

        stores : [
            'Articles',
            'Genres'
        ],

        views : [
            'Main',
            'ArticlePreview',
            'Article',
            'GenreToc',
            'GlobalToc',
            'Drawer',
            'Search',
            'Player',
            'Favorites',
            'ArticlePreview'
        ],

        refs : {
            main      : {
                xtype      : 'main',
                selector   : 'main',
                autoCreate : true
            },
            drawer    : {
                xtype      : 'drawer',
                selector   : 'drawer',
                autoCreate : true
            },
            favorites : {
                xtype      : 'favorites',
                selector   : 'favorites',
                autoCreate : true
            },
            search    : {
                xtype      : 'search',
                selector   : 'search',
                autoCreate : true
            },
            about     : {
                xtype      : 'aboutpanel',
                selector   : 'aboutpanel',
                autoCreate : true
            },
            player    : {
                selector : 'main player'
            }
        },

        routes : {
            'article/:id' : 'onArticleActive'
        },

        control : {
            'main' : {
                titletap         : 'onShowGlobalToc',
                activeitemchange : 'onArticleActive'
            },

            'main toolbar button[action=favorites]' : {
                tap : 'onFavoritesTap'
            },

            'main toolbar button[action=findstations]' : {
                tap : 'onFindStations'
            },

            'main toolbar button[action=search]' : {
                tap : 'onSearchTap'
            },

            'genretoc' : {
                featuredtap : 'onShowArticle',
                storytap    : 'onShowArticle'
            },

            'articlepreview' : {
                readarticle : 'onShowArticle'
            },

            'drawer' : {
                itemtap      : 'showGenre',
                searchtap    : 'onSearchTap',
                favoritestap : 'onFavoritesTap'
            },

            'globaltoc' : {
                storytap : 'onShowArticle'
            }
        }

    },

    init : function() {
        var me = this,
            drawer = me.getDrawer();

        Ext.Viewport.add(me.getMain());

        me.db = Ext.create('Ext.util.MixedCollection');

        me.loadMask = Ext.Viewport.add({
            xtype   : 'loadmask',
            message : 'Curating content...'
        });

        me.loadMask.show();

        drawer.getStore().load(me.onGenresLoaded, me);

        me.getApplication().on({
            scope       : me,
            playAudio   : 'onAppPlayAudio',
            showarticle : 'onShowArticle'
        });
    },

    startApp : function() {
        var me = this,
            drawer = me.getDrawer(),
            main = me.getMain(),
            viewport = Ext.Viewport;

        me.loadMask.hide();
        me.loadMask.destroy();

        delete me.loadMask;

        //adding all the articles to the main
        drawer.getStore().each(function(genre) {
            var articles = me.db.get(genre.getId());

            genre.set('image', articles.getAt(0).get('image'));
            main.addArticles(genre, articles);
        });

        main.setFeatured();
        viewport.add(me.getDrawer());

        Ext.Function.defer(function() {
            main.add(me.getFavorites());
            main.add(me.getSearch());

            drawer.addArticles();

        }, 1000);

        //custom event fired when articles are loaded
        viewport.fireEvent('loaded');
    },

    onGenresLoaded : function() {
        var me = this,
            data;

        me.getDrawer().getStore().each(function(record) {
            if (record.get('key') !== 'featured') {
                data = record.getData();
                me.parseGenreData(data);
            }
        }, me);

        //        var start = new Date().getTime();
        //        console.log('DOM start', start);
        me.startApp();
        //        var end = new Date().getTime();
        //        console.log('DOM end', end, ' ' , (end - start) / 1000 , 's')
    },

    parseGenreData : function(rawGenreObject) {
        var me = this,
            genreId = rawGenreObject.id,
            data = rawGenreObject.data,
            story = data.story;

        localStorage.setItem('timestamp-' + genreId, Ext.Date.format(new Date(), 'ymd'));
        localStorage.setItem('articles-' + genreId, Ext.encode(story));

        me.importDataToStore(genreId, story);
    },

    importDataToStore : function(genreId, data) {
        var me = this,
            store,
            db = me.db;

        if (!data) {
            data = Ext.decode(localStorage.getItem('articles-' + genreId));
        }

        if (!db.containsKey(genreId)) {
            store = Ext.create('Music.store.Articles');
            db.add(genreId, store);
        }
        else {
            store = me.db.get(genreId);
        }

        store.setData(data);

        //remove articles without primary image
        var toRemove = [];
        store.each(function(article) {
            if (!article.get('image')) {
                toRemove.push(article);
            }
        });
        store.remove(toRemove);
    },

    onFindStations : function(btn) {
        this.getApplication().fireEvent('findstations', btn);
    },

    // when user taps on any genre from the drawer
    showGenre      : function(id, genre) {
        var me = this,
            main = me.getMain(),
            genreKey = genre.get('key') || genre.get('genreKey'),
            view = main.down('#' + genreKey);

        main.setActiveItem(view);
    },

    // when a user taps on the "Read & Listen"
    onShowArticle  : function(record) {
        var me = this,
            id = record.getId ? record.get('articleId') : record,
            main = me.getMain(),
            article = main.down('#article-' + id);

        main.setActiveItem(article);
    },

    onFavoritesTap : function() {
        var me = this,
            main = me.getMain(),
            fav = main.down('favorites');

        main.setActiveItem(fav);
    },

    onSearchTap : function() {
        var me = this,
            main = me.getMain(),
            search = main.down('search');

        main.setActiveItem(search);
    },

    onShowGlobalToc : function() {
        var me = this,
            main = me.getMain(),
            view = main.down('globaltoc');

        main.setActiveItem(view);
    },

    onArticleActive : function(id, item, oldItem) {
        var me = this;

        //if item is not null we need to update
        //the browser's URL HASH
        if (item && item.xtype === 'article') {
            me.redirectTo(item.getModel());
        }
        else {
            //if main is null means the user is
            //getting to the app for the first time
            if (!me.getMain()) {
                //we need to wait until all articles are loaded
                //and then activate the given article
                Ext.Viewport.on('loaded', function() {
                    var view = me.getMain().down('#article-' + id);
                    me.getMain().setActiveItem(view);
                }, me);
            }
        }
    },

    onAppPlayAudio : function(musicData) {
        var me = this,
            player = me.getPlayer();

        if (musicData.audioFile && musicData.audioFile.match('\.pls')) {
            //            console.log('audio file has pls.')

            Ext.util.JSONP.request({
                url         : 'http://discovermusic.moduscreate.com/getMp3File.jst',
                callbackKey : 'callback',
                params      : { url : musicData.audioFile },
                callback    : function(success, data) {
                    var obj = Ext.clone(musicData);
                    if (success) {
                        obj.audioFile = data.file;

                        player.setData(obj);
                    }
                }
            });

        }
        else {
            if (!me.getAudioHasPlayed()) {
                var tmpObj = Ext.clone(musicData);

                // this is to fix the IOS auto-start audio issue!
                tmpObj.audioFile = 'resources/sounds/s.mp3';
                player.setData(tmpObj);

                Ext.Function.defer(function() {
                    player.setData(musicData);
                }, 550);
                me.setAudioHasPlayed(true);
            }
            else {
                player.setData(musicData);
            }
        }
    }
});
