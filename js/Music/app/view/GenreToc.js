/**
 * @class Music.view.GenreToc
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The genre table of content
 */

Ext.define('Music.view.GenreToc',{
    extend      : 'Ext.Container',
    xtype       : 'genretoc',

    config		: {
		layout	: 'vbox',
		genre	: null,
		articles: null,
		items	: [{
			xtype	: 'component',
			itemId	: 'featured',
			height	: 250,
			data	: {},
			tpl		: [
				'<div class="genre-toc-featured-{key}" style="background-image:url({image});">',
						'<h2>{title}</h2>',
						'<h3>{name}</h3>',
				'</div>'
			]
		},{
			xtype	: 'container',
			layout	: 'hbox',
			flex	: 1,
			padding	: 5,
			itemId	: 'stories'
		}]
    },

    initialize   : function(){
        var me = this,
			container = me.down('#stories'),
			featured = me.down('#featured'),
			genre = me.getGenre(),
			articles = me.getArticles();
        
        me.callParent();

        featured.setData(Ext.apply({
			title	: articles.getAt(0).get('title')
        },genre.getData()));

        articles.each(function(article,i){
			if(i > 0 && i < 5){
				var data = {
					key		: genre.get('key'),
					title	: article.get('title'),
					image	: article.get('image'),
					content	: Ext.String.ellipsis(article.get('content'),120,true)
				};

				container.add({
					xtype	: 'component',
					cls		: 'genre-toc-story',
					flex	: 1,
					padding	: 5,
					data	: data,
					tpl		: [
						'<div class="genre-toc-story-image-{key}" style="background-image:url({image})">',
							'<h3>{title}</h3>',
						'</div>',
						'<p>{content}</p>'
					]
				});
			}
        },me);
        
    }
});