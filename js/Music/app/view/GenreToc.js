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
			xtype	: 'container',
			layout	: 'hbox',
			position: 'top',
			items	: [{
				xtype	: 'component',
				itemId	: 'featured',
				height	: 310,
				data	: {},
				flex	: 2,
				tpl		: [
					'<div class="genre-toc-featured genre-toc-featured-{genreKey}" style="background-image:url(http://src.sencha.io/1024/{image});">',
							'<h2>{title}</h2>',
							'<h3>{genre}</h3>',
					'</div>'
				]
			}]
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
			articles = me.getArticles().getRange(0,4);
        
        me.callParent();

        featured.setData(articles.pop().getData());

        Ext.each(articles,function(article,i){
			container.add({
				xtype	: 'component',
				cls		: 'genre-toc-story',
				flex	: 1,
				padding	: 5,
				data	: article.getData(),
				tpl		: [
					'<div class="genre-toc-story genre-toc-story-image-{genreKey}" data-id="{id}" style="background-image:url(http://src.sencha.io/300/{image})">',
						'<h3>{title}</h3>',
					'</div>'
				]
			});
        },me);
        
        me.registerEvents();
    },

    registerEvents	: function(){
		var me          = this,
            el          = me.renderElement;

        el.on('tap', me.onTap, me);
    },

    onTap: function(event) {
        var me = this;
        if (event.getTarget('.genre-toc-featured')){
            return me.fireEvent('featuredtap', me.getArticles().getAt(0));
        }
        if (event.getTarget('.genre-toc-story')){
			var el = Ext.get(event.getTarget('.genre-toc-story')),
				id = +el.getAttribute("data-id");

            return me.fireEvent('storytap', me.getArticles().getById(id));
        }
    }
});