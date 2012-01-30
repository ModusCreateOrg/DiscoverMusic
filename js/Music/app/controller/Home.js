/**
 * @class Music.controller.Home
 * @extends Ext.app.Controller
 * @author Crysfel Villa
 *
 * The home controller
 */
Ext.define('Music.controller.Home', {
    extend: 'Ext.app.Controller',
    models: ['Article', 'Category'],
    stores: ['Articles', 'Categories'],
    views: ['landscape.Home', 'Category', 'ArticlePreview', 'Article', 'MainMenu','Drawer'],
    
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
        

        this.control({
            'articlepreview': {
                readarticle: this.onArticlePreviewReadArticle
            }
        });
    },

    startApp: function () {
        var me = this,
            home = me.getHome(),
            drawer = me.getDrawer();

        drawer.getStore().each(function (record) {
            home.add({
                xtype: 'category',
                store: me.db.get(record.getId()),
                topic: record
            });
        });

        Ext.Viewport.add(home);
        Ext.Viewport.add(drawer);

        drawer.getStore().add();

        me.loadMask.hide();
    },

    onTopicsLoaded    : function(){
        var me = this,
            drawer = me.getDrawer();

        drawer.getStore().each(function(record) {
            me.loadData(record.getId());
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
                    transform: 'source',
                    output: 'JSON'
                }
            });
        } else {
            me.importDataToStore(topic);
        }
    },

    saveData: function (topic, data) {
        var list = data.list.story;
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].category = data.list.title.$text;
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
        if (me.db.getCount() === drawer.getStore().getCount()) {
            me.startApp();
        }
    },

    // when a user taps on the "Read & Listen"
    onArticlePreviewReadArticle: function(record) {
        var me = this, 
            home = me.getHome(),
            myNewPanel = home.add({ 
                xtype: 'article',
                data: record.data
            });
            
        home.setActiveItem(myNewPanel);
    }
});