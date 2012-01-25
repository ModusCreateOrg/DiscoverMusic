/**
 * @class Music.controller.Home
 * @extends Ext.app.Controller
 * @author Crysfel Villa
 *
 * The home controller
 */

Ext.define('Music.controller.Home',{
	extend	: 'Ext.app.Controller',
	models	: [
		'Article',
		'Category'
	],
	stores	: [
		'Articles',
		'Categories'
	],
	views	: [
		'landscape.Home',
		'Category',
		'ArticlePreview',
		'Article',
		'MainMenu'
	],
	config	: {
		refs	: {
			home	: {
				xtype		: 'home',
				selector	: 'home',
				autoCreate	: true
			}
			
		}
	},
	

    loadMask: undefined,
    
    apiKey	: 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
    topics	: {
		featured	: 1039,//1107,
		rockPopFolk	: 10001,
		classical	: 10003,
		jazzBlues	: 10002,
		world		: 10004,
		hipHopRB	: 10005
	},
	numResults	: 10,

    init	: function(){
		var me = this;

		me.db = Ext.create('Ext.util.MixedCollection');

		me.loadMask = Ext.create('Ext.LoadMask',{message:''});
		Ext.Viewport.add(me.loadMask);
        me.loadMask.show();

        Ext.Object.each(me.topics,function(key,value){
			me.loadData(value);
		});
        
    },

    startApp	: function(){
		var me = this,
			home = me.getHome();
		
		Ext.Object.each(me.topics,function(key,value){
			home.add({
				xtype	: 'category',
				store	: me.db.get(value),
				topic	: key,
				topicId	: value
			});
		});

		Ext.Viewport.add(home);

		me.loadMask.hide();
    },

	loadData	: function(topic,numResults){
		var me = this,
			ts = localStorage.getItem('timestamp-'+topic);
			needRefresh = !ts || ( Ext.util.Date.format(new Date(), 'ymd') < ts );
		
		if(needRefresh){
			Ext.util.JSONP.request({
				url             : 'http://api.npr.org/query',
				callback        : Ext.Function.pass(me.saveData,[topic]),
				scope           : me,
				callbackKey     : 'callback',
				params: {
					apiKey			: me.apiKey,
					id				: topic,
					requiredAssets	:'image,audio',
					numResults		: me.numResults,
					transform		: 'source',
					output			: 'JSON'
				}
			});
		}else{
			me.importDataToStore(topic);
		}
    },

	saveData	: function(topic,data){
		var list = data.list.story;
		for(var i=0,len=list.length;i<len;i++){
			list[i].category = data.list.title.$text;
		}

		localStorage.setItem('timestamp-'+topic, Ext.util.Date.format(new Date(), 'ymd'));
		localStorage.setItem('articles-'+topic, Ext.encode(data.list.story));

		this.importDataToStore(topic,data.list.story);
	},

	importDataToStore	: function(topic,data){
		var me = this,
			store,records;

		if (!data){ data = Ext.decode(localStorage.getItem('articles-'+topic));}
		
		if(!me.db.containsKey(topic)){
			store = Ext.create('Music.store.Articles');
			me.db.add(topic,store);
		}else{
			store = me.db.get(topic);
		}

		store.setData(data);

		//Start the app when the last topic is loaded
		if(me.db.getCount() === Ext.Object.getSize(me.topics)){
			me.startApp();
		}
	}
});