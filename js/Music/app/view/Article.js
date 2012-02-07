/**
 * @class Music.view.Article
 * @extends Ext.Container
 * @author Dave Ackerman
 *
 * The full article view
 */

Ext.define('Music.view.Article', {
    extend: 'Ext.Container',
    alias : 'widget.article',

    config : {
		model		: null,
		layout		: 'hbox',
        scrollable	: 'auto',
	    items		: [{
			xtype	: 'container',
			flex	: 1,
			layout	: 'hbox',
			items	: [{
				xtype	: 'component',
				cls		: 'music-article-header',
				height	: 370,
				docked	: 'top',
				data	: null,
				tpl		: [
					'<div class="music-article-header-image" style="background-image:url(http://src.sencha.io/662/{image});">',
						'<h1>{title}</h1>',
					'</div>'
				]
			},{
				xtype	: 'controls',
				width	: 150
			},{
				xtype	: 'component',
				flex	: 1,
				cls		: 'music-article-content',
				tpl		: '{content}'
			}]
		},{
			xtype	: 'donate',
			width	: 340
		}]
    },

    applyModel	: function(model){
		var me = this,
			header = me.down('component[cls=music-article-header]'),
			content = me.down('component[cls=music-article-content]');

		header.setData(model.getData());
		content.setData(model.getData());

		return model;
    }
});