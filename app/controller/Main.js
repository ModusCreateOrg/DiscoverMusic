/**
 * @class Music.controller.Main
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The main controller
 */
Ext.define('Music.controller.Main', {
    extend : 'Ext.app.Controller',
    config : {
        apiUrl     : 'http://api.npr.org/query',
        apiKey     : 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
        numResults : 10,
        models     : [
            'Article',
            'Genre'
        ],
        stores     : [
            'Articles',
            'Genres'
        ],
        views      : [
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

        refs    : {
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
            }
        },
        routes  : {
            'article/:id' : 'onArticleActive'
        },
        control : {
            'main'  : {
                titletap : 'onShowGlobalToc'
            },
            'mainflow' : {
                activeitemchange : 'onArticleActive'
            },

            'main toolbar button[action=globaltoc]' : {
                tap : 'onShowGlobalToc'
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

    loadMask : undefined,

    init : function() {
        var me = this,
            drawer = me.getDrawer();

        me.db = Ext.create('Ext.util.MixedCollection');

        me.loadMask = Ext.create('Ext.LoadMask', {
            message : 'Curating content...'
        });
        Ext.Viewport.add(me.loadMask);
        me.loadMask.show();

        drawer.getStore().load(me.onGenresLoaded, me);
    },

    startApp : function() {
        var me = this,
            main = me.getMain(),
            drawer = me.getDrawer(),
            mainFlow = me.getMainFlow();

        //adding all the articles to the main flow
        drawer.getStore().each(function(genre) {
            var articles = me.db.get(genre.getId());
            genre.set('image', articles.getAt(0).get('image'));
            mainFlow.addArticles(genre, articles);
        });
        mainFlow.setFeatured();

        mainFlow.add(me.getFavorites());
        mainFlow.add(me.getSearch());

        Ext.Viewport.add(main);
        Ext.Viewport.add(me.getDrawer());

        drawer.addArticles();

        me.loadMask.hide();

        //custom event fired when articles are loaded
        Ext.Viewport.fireEvent('loaded');
    },

    onGenresLoaded : function() {
        var me = this,
            drawer = me.getDrawer();

        drawer.getStore().each(function(record) {
            if (record.get('key') !== 'featured') {
                me.loadData(record.getId());
            }
        }, me);
    },

    loadData : function(genreId) {
        var me = this,
            ts = localStorage.getItem('timestamp-' + genreId);
        needRefresh = !ts || (parseInt(Ext.Date.format(new Date(), 'ymd'), 10) > parseInt(ts, 10));

        if (needRefresh) {
            Ext.util.JSONP.request({
                url         : me.getApiUrl(),
                callback    : Ext.Function.pass(me.saveData, [genreId]),
                scope       : me,
                callbackKey : 'callback',
                params      : {
                    apiKey         : me.getApiKey(),
                    id             : genreId,
                    requiredAssets : 'audio,image',
                    numResults     : me.getNumResults(),
                    fields         : 'title,teaser,storyDate,text,audio,image,artist',
                    transform      : 'source',
                    output         : 'JSON'
                }
            });
        } else {
            me.importDataToStore(genreId);
        }
    },

    saveData : function(genreId, success, data) {
        var list = data.list.story,
            drawer = this.getDrawer(),
            genre = drawer.getStore().getById(genreId);

        for (var i = 0, len = list.length; i < len; i++) {
            var images = list[i].image,
                primary;

            list[i].genre = genre.get('name');
            list[i].genreKey = genre.get('key');
            list[i].image = null;

            if (images) {
                //search for the primary image
                for (var j = 0, size = images.length; j < size; j++) {
                    primary = images[j];
                    if (primary.type === 'primary' && primary.enlargement) {
                        list[i].image = primary.enlargement.src;
                        break;
                    }
                }
                //if not primary image found, we use the default image provided
                if(!list[i].image && primary && primary.src){
                    list[i].image = primary.src;
                }
            }
        }

        localStorage.setItem('timestamp-' + genreId, Ext.Date.format(new Date(), 'ymd'));
        localStorage.setItem('articles-' + genreId, Ext.encode(data.list.story));

        this.importDataToStore(genreId, data.list.story);
    },

    importDataToStore : function(genreId, data) {
        var me = this,
            store, records,
            drawer = me.getDrawer();

        if (!data) {
            data = Ext.decode(localStorage.getItem('articles-' + genreId));
        }

        if (!me.db.containsKey(genreId)) {
            store = Ext.create('Music.store.Articles');
            me.db.add(genreId, store);
        } else {
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

        //Start the app when the last genre is loaded
        if (me.db.getCount() === drawer.getStore().getCount()) {
            me.startApp();
        }
    },

    // when user taps on any genre from the drawer
    showGenre         : function(id, genre) {
        var me = this,
            main = me.getMain(),
            mainFlow = me.getMainFlow(),
            genreKey = genre.get('key') || genre.get('genreKey'),
            view = mainFlow.down('#' + genreKey);

        main.setActiveItem(mainFlow);
        mainFlow.setActiveItem(view);
    },

    // when a user taps on the "Read & Listen"
    onShowArticle     : function(record) {
        var me = this,
            id = record.getId ? record.getId() : record,
            mainFlow = me.getMainFlow(),
            article = mainFlow.down('#article-' + id);

        mainFlow.setActiveItem(article);
    },

    onFavoritesTap : function() {
        var me = this,
            mainFlow = me.getMainFlow(),
            fav = mainFlow.down('favorites');

        mainFlow.animateActiveItem(fav, Ext.fx.layout.card.Fade);
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
        if (item) {
            if (item.xtype === 'article') {
                me.redirectTo(item.getModel());
            }
        } else {
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
    }
});
