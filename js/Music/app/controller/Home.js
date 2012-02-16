/**
 * @class Music.controller.Home
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The home controller
 */
Ext.define('Music.controller.Home', {
    extend: 'Ext.app.Controller',
    models: ['Article', 'Genre'],
    stores: ['Articles', 'Genres'],
    views: [
        'landscape.Home', 'ArticlePreview', 'Article','Donate', 'MainFlow','Drawer',
        'AboutPanel','Search','Controls','Player'
    ],
    
    config: {
        apiUrl: 'http://api.npr.org/query',
        apiKey: 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
        numResults: 10,

        refs: {
            home: {
                xtype: 'home',
                selector: 'home',
                autoCreate: true
            },
            drawer : {
                xtype: 'drawer',
                selector: 'drawer',
                autoCreate: true
            },
            search : {
                xtype: 'search',
                selector: 'search',
                autoCreate: true
            },
            article : {
                xtype: 'article',
                selector: 'article',
                autoCreate: true
            },
            about   : {
                xtype: 'aboutpanel',
                selector: 'aboutpanel',
                autoCreate: true
            },
            mainFlow : {
                xtype: 'mainflow',
                selector: 'home mainflow'
            }
        },
        control: {
            'articlepreview': {
                readarticle : 'onArticlePreviewReadArticle'
            },
            'drawer'  : {
                itemtap       : 'showGenre',
                favoritestap  : 'onFavoritesTap',
                searchtap     : 'onSearchTap'
            }
        }
    },

    loadMask: undefined,
    

    init: function () {
        var me = this,
            drawer = me.getDrawer();

        me.db = Ext.create('Ext.util.MixedCollection');

        me.loadMask = Ext.create('Ext.LoadMask', {
            message: ''
        });
        Ext.Viewport.add(me.loadMask);
        me.loadMask.show();

        drawer.getStore().load(me.onTopicsLoaded,me);
    },

    startApp: function () {
        var me = this,
            home = me.getHome(),
            drawer = me.getDrawer(),
            mainFlow = me.getMainFlow();

        //adding all the articles to the main flow
        drawer.getStore().each(function (genre) {
            mainFlow.addArticles(genre,me.db.get(genre.getId()));
        });
        mainFlow.setRandomCover();

        Ext.Viewport.add(home);
        Ext.Viewport.add(me.getDrawer());
        Ext.Viewport.add(me.getSearch());
        Ext.Viewport.add(me.getArticle());
        Ext.Viewport.add(me.getAbout());

        drawer.addArticles();

        me.loadMask.hide();
    },

    onTopicsLoaded    : function(){
        var me = this,
            drawer = me.getDrawer();

        drawer.getStore().each(function(record) {
            if(record.get('key') !== 'featured'){
                me.loadData(record.getId());
            }
        },me);
    },

    loadData: function (topic) {
        var me = this,
            ts = localStorage.getItem('timestamp-' + topic);
            needRefresh = !ts || (parseInt(Ext.Date.format(new Date(), 'ymd'),10) > parseInt(ts,10));


        if (needRefresh) {
            Ext.util.JSONP.request({
                url: me.getApiUrl(),
                callback: Ext.Function.pass(me.saveData, [topic]),
                scope: me,
                callbackKey: 'callback',
                params: {
                    apiKey: me.getApiKey(),
                    id: topic,
                    requiredAssets: 'audio,image',
                    numResults: me.getNumResults(),
                    transform: 'source',
                    output: 'JSON'
                }
            });
        } else {
            me.importDataToStore(topic);
        }
    },

    saveData: function (topic, success ,data) {
        var list = data.list.story,
            drawer = this.getDrawer(),
            category = drawer.getStore().getById(topic);

        for (var i = 0, len = list.length; i < len; i++) {
            list[i].genre = category.get('name');
            list[i].genreKey = category.get('key');
        }

        localStorage.setItem('timestamp-' + topic, Ext.Date.format(new Date(), 'ymd'));
        localStorage.setItem('articles-' + topic, Ext.encode(data.list.story));

        this.importDataToStore(topic, data.list.story);
    },

    importDataToStore: function (topic, data) {
        var me = this,
            store, records,
            drawer = me.getDrawer();

        if (!data) {
            data = Ext.decode(localStorage.getItem('articles-' + topic));
        }

        if (!me.db.containsKey(topic)) {
            store = Ext.create('Music.store.Articles');
            me.db.add(topic, store);
        } else {
            store = me.db.get(topic);
        }

        store.setData(data);

        //Start the app when the last genre is loaded
        if (me.db.getCount() === drawer.getStore().getCount()) {
            me.startApp();
        }
    },

    // when user taps on any genre from the drawer
    showGenre: function(id, genre) {
        var me = this,
            home = me.getHome(),
            genreKey = genre.get('key') || genre.get('genreKey'),
            view = home.down('#' + genreKey);
        
        home.getLayout().setAnimation({
                duration: 300,
                easing: 'ease-in',
                type: 'slide',
                direction: 'up'
        });
        home.setActiveItem(view);
    },

    // when a user taps on the "Read & Listen"
    onArticlePreviewReadArticle: function(record) {
        var me = this,
            home = me.getHome(),
            article = me.getArticle();

        home.getLayout().setAnimation({
            type: 'fade',
            duration: 300
        });

        article.setModel(record);
        home.setActiveItem(article);
    },

    onFavoritesTap: function(){
        Ext.Msg.alert('Favorites','Please show my favorites!!');
    },

    onSearchTap: function(){
        var me = this,
        home = me.getHome();
        home.getLayout().setAnimation({
            duration: 300,
            easing: 'ease-in',
            type: 'slide',
            direction: 'up'
        });
        home.setActiveItem(me.getSearch());
    }
});
