/**
 * @class Music.view.GlobalToc
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The global table of content
 */

Ext.define('Music.view.GlobalToc',{
    extend      : 'Ext.Container',
    xtype       : 'globaltoc',

    config		: {
		first	: true,
		featuredArticle: null,
		cls		: 'global-toc',
		layout	: 'hbox',
		items	: [{
			xtype	: 'container',
			itemId	: 'featuredstory',
			cls		: 'global-toc-featured-story',
			flex	: 1,
			data	: {},
			tpl		: [
				'<div class="global-toc-featured-image" style="background-image:url(http://src.sencha.io/600/{image})">',
					'<div>Featured story</div>',
					'<h2>{title}</h2>',
				'</div>',
				'<div class="global-toc-featured-content">{content}</div>',
				'<div class="global-toc-about"><p>This app was developed using the open content API provided by NPR. All content and images copyright NPR and respective properties. App development sponsored by Sencha Inc. and application developed by Modus Create Inc.</p></div>'
			]
		},{
			xtype	: 'container',
			itemId	: 'genres',
			scrollable : true,
			width	: 350
		}]
    },

    initialize	: function(){
		var me = this;

		me.callParent();

		me.registerEvents();
    },

    addGenre	: function(genre,articles){
		var me = this,
			container = me.down('#genres'),
			range = articles.getRange(1,4),
			list = [];

		Ext.each(range,function(article){
			list.push(article.getData());
		});

		var component = {
			xtype	: 'component',
			cls		: 'global-toc-genre-'+genre.get('key'),
			data	: {
				genre	: Ext.apply(genre.getData(),articles.getAt(0).getData()),
				articles: list
			},
			tpl		: [
				'<div class="global-toc-genre-image" data-id="{genre.id}" style="background-image:url(http://src.sencha.io/350/{genre.image})">',
					'<h2>{genre.name}</h2>',
					'<h3>{genre.title}</h3>',
				'</div>',
				'<tpl for="articles">',
					'<p class="global-toc-article" data-id="{id}">{title}</p>',
				'</tpl>'
			]
		};

		container.add(component);
    },

    setFeatured	: function(model){
		var me = this,
			featured = me.down('#featuredstory'),
			data = model.getData();

		data.content = Ext.util.Format.ellipsis(data.content,300,true).replace(/<(\/)?p>/g,' ');
		featured.setData(data);
		me.setFeaturedArticle(model);
    },

    registerEvents	: function(){
		var me    = this,
            el    = me.renderElement;

        el.on('tap', me.onTap, me);
    },

    onTap	: function(event){
		var me = this,
			el,id;

		if (event.getTarget('.global-toc-featured-image')){
            return me.fireEvent('storytap', me.getFeaturedArticle());
        }
        if (event.getTarget('.global-toc-article')){
			el = Ext.get(event.getTarget('.global-toc-article'));
			id = +el.getAttribute("data-id");

            return me.fireEvent('storytap', id);
        }
        if (event.getTarget('.global-toc-genre-image')){
			el = Ext.get(event.getTarget('.global-toc-genre-image'));
			id = +el.getAttribute("data-id");

            return me.fireEvent('storytap', id);
        }
    }
});