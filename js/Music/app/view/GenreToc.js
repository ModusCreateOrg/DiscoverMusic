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
      cls: 'genre-toc',
		items	: [{
			xtype	: 'container',
			layout	: {
				type : 'hbox',
				align: 'stretch'
			},
			position: 'top',
			height	: 305,
			items	: [{
				xtype	: 'component',
				itemId	: 'featured',
				data	: {},
				flex	: 2,
				tpl		: [
					'<div class="genre-toc-featured genre-toc-featured-{genreKey}" data-id="{id}" style="background-image:url(http://src.sencha.io/1024/{image});">',
							'<h2>{title}</h2>',
							'<h3>{genre}</h3>',
					'</div>'
				]
			}]
		},{
			xtype	: 'container',
			layout	: 'hbox',
			flex	: 1,
			itemId	: 'stories'
		}]
    },

    initialize   : function(){
        var me = this,
			container = me.down('#stories'),
			featured = me.down('#featured'),
			genre = me.getGenre(),
			articles = me.getArticles().getRange(0,4),
			top = me.down('container[position=top]');
        
        me.callParent();

        featured.setData(articles.shift().getData());
        me.insertArticle(top,articles.shift());


        Ext.each(articles,function(article,i){
			me.insertArticle(container,article);
        },me);
        
        me.registerEvents();
    },

    insertArticle	: function(container,article) {
		container.add({
			xtype	: 'component',
			cls		: 'genre-toc-story',
			flex	: 1,
			data	: article.getData(),
			tpl		: [
				'<div class="genre-toc-story genre-toc-story-image-{genreKey}" data-id="{id}" style="background-image:url(http://src.sencha.io/300/{image})">',
					'<h3>{title}</h3>',
				'</div>'
			]
		});
    },

    registerEvents	: function(){
		var me          = this,
            el          = me.renderElement;

        el.on('tap', me.onTap, me);
    },

    onTap: function(event) {
        var me = this,
			target = event.getTarget('.genre-toc-featured') || event.getTarget('.genre-toc-story');

        if (target){
			var id = +target.getAttribute("data-id");

            return me.fireEvent('storytap', me.getArticles().getById(id));
        }
    }
});