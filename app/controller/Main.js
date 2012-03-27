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
        apiUrl       : 'http://api.npr.org/query',
        apiKey       : 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
        genresToLoad : [],
        numErrors    : 0,
        numResults   : 10,

        models : [
            'Article',
            'Genre'
        ],

        stores : [
            'Articles',
            'Genres'
        ],

        views : [
            'landscape.Main',
            'ArticlePreview',
            'Article',
            'MainFlow',
            'Drawer',
            'AboutPanel',
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
            mainFlow  : {
                xtype    : 'mainflow',
                selector : 'main mainflow'
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
                titletap : 'onShowGlobalToc'
            },

            'mainflow' : {
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
                itemtap   : 'showGenre',
                searchtap : 'onSearchTap'
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
            scope     : me,
            playAudio : 'onAppPlayAudio'
        });
    },

    startApp : function() {
        var me       = this,
            drawer   = me.getDrawer(),
            mainFlow = me.getMainFlow(),
            viewport = Ext.Viewport;

        //adding all the articles to the main flow
        drawer.getStore().each(function(genre) {
            var articles = me.db.get(genre.getId());

            genre.set('image', articles.getAt(0).get('image'));
            mainFlow.addArticles(genre, articles);
        });

        mainFlow.setFeatured();

        mainFlow.add(me.getFavorites());
        mainFlow.add(me.getSearch());

        me.loadMask.hide();
        me.loadMask.destroy();

        delete me.loadMask;

        viewport.add(me.getDrawer());
        drawer.addArticles();


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
            drawer = me.getDrawer(),
            genreId = rawGenreObject.id,
            data = rawGenreObject.data,
            list = data.list.story,
            genre = drawer.getStore().getById(genreId),
            listLength = list.length,
            primaryStr = 'primary',
            i = 0,
            listItem,
            images,
            primary;

        for (; i < listLength; i++) {
            listItem = list[i];

            images = listItem.image;

            listItem.genre = genre.get('name');
            listItem.genreKey = genre.get('key');
            listItem.image = null;

            if (images) {
                //search for the primary image
                for (var j = 0, size = images.length; j < size; j++) {
                    primary = images[j];
                    if (primary.type === primaryStr && primary.enlargement) {
                        listItem.image = primary.enlargement.src;
                        break;
                    }
                }
                //if not primary image found, we use the default image provided
                if (!listItem.image && primary && primary.src) {
                    listItem.image = primary.src;
                }
            }
        }

        localStorage.setItem('timestamp-' + genreId, Ext.Date.format(new Date(), 'ymd'));
        localStorage.setItem('articles-' + genreId, Ext.encode(data.list.story));

        me.importDataToStore(genreId, data.list.story);
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
            mainFlow = me.getMainFlow(),
            genreKey = genre.get('key') || genre.get('genreKey'),
            view = mainFlow.down('#' + genreKey);

        main.setActiveItem(mainFlow);
        mainFlow.setActiveItem(view);
    },

    // when a user taps on the "Read & Listen"
    onShowArticle  : function(record) {
        var me       = this,
            id       = record.getId ? record.getId() : record,
            mainFlow = me.getMainFlow(),
            article  = mainFlow.down('#article-' + id);

        mainFlow.setActiveItem(article);
    },

    onFavoritesTap : function() {
        var me = this,
            mainFlow = me.getMainFlow(),
            fav = mainFlow.down('favorites');

        mainFlow.setActiveItem(fav);
    },

    onSearchTap : function() {
        var me = this,
            mainFlow = me.getMainFlow(),
            search = mainFlow.down('search');

        mainFlow.setActiveItem(search);
    },

    onShowGlobalToc : function() {
        var me = this,
            mainFlow = me.getMainFlow(),
            view = mainFlow.down('globaltoc');

        mainFlow.setActiveItem(view);
    },

    onArticleActive : function(id, item, oldItem) {
        var me = this;

        //if item is not null we need to update
        //the browser's URL HASH
        if (item && item.xtype === 'article') {
            me.redirectTo(item.getModel());
        }
        else {
            //if mainFlow is null means the user is
            //getting to the app for the first time
            if (!me.getMainFlow()) {
                //we need to wait until all articles are loaded
                //and then activate the given article
                Ext.Viewport.on('loaded', function() {
                    var view = me.getMainFlow().down('#article-' + id);
                    me.getMainFlow().setActiveItem(view);
                }, me);
            }
        }
    },

    onAppPlayAudio : function(musicData) {
        var me = this,
            player = me.getPlayer();

        if (Ext.browser.is.Chrome && musicData.audioFile.match('\.m3u')) {
            Ext.util.JSONP.request({
                url         : 'http://23.21.152.214/getMp3File.jst',
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
            player.setData(musicData);
        }
    }
});
