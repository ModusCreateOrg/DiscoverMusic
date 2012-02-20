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
			height	: 310,
			data	: {},
			tpl		: [
				'<div class="genre-toc-featured genre-toc-featured-{key}" style="background-image:url({image});">',
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
					id		: article.getId(),
					key		: genre.get('key'),
					title	: article.get('title'),
					image	: article.get('image'),
					content	: Ext.String.ellipsis(article.get('content'), 175, true)
				};

				container.add({
					xtype	: 'component',
					cls		: 'genre-toc-story',
					flex	: 1,
					padding	: 5,
					data	: data,
					tpl		: [
						'<div class="genre-toc-story genre-toc-story-image-{key}" data-id="{id}" style="background-image:url({image})">',
							'<h3>{title}</h3>',
						'</div>',
					]
				});
			}
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