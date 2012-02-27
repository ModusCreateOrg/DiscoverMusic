/**
 * @class Music.view.MainFlow
 * @extends Ext.dataview.DataView
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * This view display all the articles, TOCs, favorites, search and the about
 */

Ext.define('Music.view.MainFlow',{
    extend      : 'Ext.carousel.Carousel',
    alias       : 'widget.mainflow',
    
    requires	: [
		'Music.view.GlobalToc',
		'Music.view.GenreToc'
    ],

    config		: {
		indicator:false,
		articles: []
    },

    addArticles	: function(genre,articles){
		var me = this,
			collection = me.getArticles();

		//adding the TOC's
		if(Ext.isEmpty(me.globalToc)){
			me.globalToc = Ext.create('Music.view.GlobalToc');
			me.add(me.globalToc);
		}
		
		me.add({
			xtype	: 'genretoc',
			itemId	: genre.get('key'),
			genre	: genre,
			articles: articles
		});
		me.globalToc.addGenre(genre,articles);

		//Adding the articles preview to the main flow
		articles.each(function(article){
            var tmp = me.add({
                xtype   : 'article',
                itemId	: 'article-'+article.getId(),
                model   : article,
                data    : article.getData(),
                genre   : genre
            });
            collection.push(tmp);
        },me);
    },

    setFeatured	: function(){
		var me = this,
			articles = me.getArticles(),
			cover = articles[Math.floor(Math.random()*articles.length)];
		me.globalToc.setFeatured(cover.getModel());
    }
    
});