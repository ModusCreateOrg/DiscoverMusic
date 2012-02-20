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
		cls		: 'global-toc',
		layout	: 'vbox',
		items	: [{
			xtype	: 'container',
			position: 'top',
			height	: 300,
			layout	: 'hbox',
			cls		:'global-toc-featured-story',
			items	: [{
				xtype	: 'component',
				itemId	: 'featured',
				flex	: 3,
				data	: {},
				tpl		: [
					'<div class="global-toc-featured-image" style="background-image:url({image});">',
						'<div>Featured story</div>',
						'<h2>{title}</h2>',
					'</div>'
				]
			}]
		},{
			xtype	: 'container',
			position: 'bottom',
			layout	: 'hbox',
			flex	: 1
		}]
    },

    addGenre	: function(genre,articles){
		var me = this,
			data = {
				name : genre.get('name'),
				key	 : genre.get('key'),
				articles : []
			},
			container = me.getFirst()?me.down('container[position=top]'):me.down('container[position=bottom]');
		
		articles.each(function(article,i){
			if(i < 4){
				data.articles.push(article.getData());
			}
		});

		container.add({
			xtype	: 'component',
			flex	: 1,
			data	: data,
			tpl		: [
				'<div class="global-toc-genre-{key}">',
					'<h3>{name}</h3>',
					'<tpl for="articles">',
					'<p data-id="{id}">{title}</p>',
					'</tpl>',
				'</div>'
			]
		});
		me.setFirst(false);
    },

    setFeatured	: function(data){
		var me = this,
			featured = me.down('#featured');
		
		featured.setData(data);
    }
});