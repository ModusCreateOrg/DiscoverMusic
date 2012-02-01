/**
 * @class Music.controller.Home
 * @extends Ext.app.Controller
 * @author Crysfel Villa
 *
 * The home controller
 */
Ext.define('Music.controller.Home', {
    extend: 'Ext.app.Controller',
    models: ['Article', 'Genre'],
    stores: ['Articles', 'Genres'],
    views: ['landscape.Home', 'Genre', 'ArticlePreview', 'Article', 'MainMenu','Drawer', 'AboutPanel','Search'],
    
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

        me.control({
            'articlepreview': {
                readarticle : this.onArticlePreviewReadArticle
            },
            'drawer'  : {
                itemtap       : this.showGenre,
                favoritestap  : this.onFavoritesTap,
                searchtap     : this.onSearchTap
            },
            'home': {
                titletap: this.onHomeTitleTap
            }
        });
    },

    startApp: function () {
        var me = this,
            home = me.getHome(),
            drawer = me.getDrawer();
            search = me.getSearch();

        drawer.getStore().each(function (record) {
            home.add({
                xtype: 'genrecarousel',
                itemId: record.get('key'),
                store: me.db.get(record.getId()),
                model: record
            });
        });

        Ext.Viewport.add(home);
        Ext.Viewport.add(drawer);
        Ext.Viewport.add(search);

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
            needRefresh = !ts || (Ext.util.Date.format(new Date(), 'ymd') < ts);

        if (needRefresh) {
            Ext.util.JSONP.request({
                url: me.getApiUrl(),
                callback: Ext.Function.pass(me.saveData, [topic]),
                scope: me,
                callbackKey: 'callback',
                params: {
                    apiKey: me.getApiKey(),
                    id: topic,
                    requiredAssets: 'image,audio',
                    numResults: me.getNumResults(),
                    //sort:'dateDesc',
                    transform: 'source',
                    output: 'JSON'
                }
            });
        } else {
            me.importDataToStore(topic);
        }
    },

    saveData: function (topic, data) {
        var list = data.list.story,
            drawer = this.getDrawer(),
            category = drawer.getStore().getById(topic);

        for (var i = 0, len = list.length; i < len; i++) {
            list[i].genre = category.get('name');
            list[i].genreKey = category.get('key');
        }

        localStorage.setItem('timestamp-' + topic, Ext.util.Date.format(new Date(), 'ymd'));
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

        //Start the app when the last topic is loaded
        if (me.db.getCount() === (drawer.getStore().getCount() - 1)) {
            //Populating the 'featured' store
            var featuredStore = Ext.create('Music.store.Articles'),
                featuredId;
            drawer.getStore().each(function(genre){
                if(genre.get('key') !== 'featured'){
                    var store = me.db.getByKey(genre.getId()),
                        article,i=0;
                    do{
                        article = store.getAt(i);
                        i++;
                    }while(!article.get('image'));

                    featuredStore.add(article);
                    genre.set('image',article.get('image'));
                }else{
                    featuredId = genre.get('id');
                }
            });

            me.db.insert(0,featuredId,featuredStore);
            me.startApp();
        }
    },

    // when user taps on any genre from the drawer
    showGenre   : function(id,genre){
        var me = this,
            view = me.getHome().down('#'+genre.get('key'));
        
        me.getHome().setActiveItem(view);
    },

    // when a user taps on the "Read & Listen"
    onArticlePreviewReadArticle: function(record) {
        var me = this,
            home = me.getHome(),
            myNewPanel = home.add({
                xtype: 'article',
                data: record.data
            });

        // not sure if this is the correct way to do this, but we'll do it!
        home.getLayout().setAnimation({
            type: 'fade',
            duration: 300
        });
        home.setActiveItem(myNewPanel);
    },

    // when a user taps the "Discover Music" logo, show the about panel
    onHomeTitleTap: function() {
        Ext.create('Music.view.AboutPanel', {}).show();
    },

    onFavoritesTap: function(){
        Ext.Msg.alert('Favorites','Please show my favorites!!');
    },

    onSearchTap: function(){
        var me = this,
        home = me.getHome();
        home.setActiveItem(me.getSearch());
    }
});