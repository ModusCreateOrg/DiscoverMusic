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
		layout	: 'hbox',
		items	: [{
			xtype	: 'container',
			itemId	: 'featured',
			cls		: 'global-toc-featured-story',
			flex	: 1,
			tpl		: [
				'<div class="global-toc-featured-image" style="background-image:url({image})">',
					'<div>Featured story</div>',
					'<h2>{title}</h2>',
				'</div>',
				'<div class="global-toc-featured-content">{content}</div>',
				'<div class="global-toc-about"><p>This app was developed using the open content API provided by NPR. All content and images copyright NPR and respective properties. App development sponsored by Sencha Inc. and application developed by Modus Create Inc.</p></div>'
			]
		},{
			xtype	: 'container',
			width	: 350
		}]
    },

    addGenre	: function(genre,articles){
		
    },

    setFeatured	: function(data){
		var me = this,
			featured = me.down('#featured');
		data.content = Ext.util.Format.ellipsis(data.content,330,true);
		featured.setData(data);
    }
});