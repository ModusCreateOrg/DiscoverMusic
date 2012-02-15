/**
 * @class Music.view.MainFlow
 * @extends Ext.dataview.DataView
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * This view display all the covers and TOCs
 */

Ext.define('Music.view.MainFlow',{
    extend      : 'Ext.carousel.Carousel',
    alias       : 'widget.mainflow',

    config		: {
		ui		: 'light',
		articles: []
    },

    addArticles	: function(genre,store){
		var me = this,
			collection = me.getArticles();

		if(collection.length === 0){
			me.add({
				xtype	: 'globaltoc'
			});
		}else{
			me.add({
				xtype	: 'genretoc',
				genre	: genre
			});
		}

		//Adding the articles preview to the main flow
		store.each(function(article){
            if(article.get('image')){
                var tmp = me.add({
                    xtype   : 'articlepreview',
                    model   : article,
                    data    : article.getData(),
                    genre   : genre
                });
                collection.push(tmp);
            }
        },me);
    },

    //set a random cover for the first card
    setRandomCover	: function(){
		var me = this,
			articles = me.getArticles(),
			cover = articles[Math.floor(Math.random()*articles.length)];
		
		me.insert(0,{
            xtype   : 'articlepreview',
            model   : cover.getModel(),
            data    : cover.getModel().getData(),
            genre   : cover.getGenre()
		});
		me.setActiveItem(0);
    },

    addGlobalToc	: function(){

    }
    
});