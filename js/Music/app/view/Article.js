/**
 * @class Music.view.Article
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The full article view
 */

Ext.define('Music.view.Article', {
    extend: 'Ext.Container',
    alias : 'widget.article',

    config : {
		model		: null,
		genre		: null,
		layout		: 'hbox',
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
	    items		: [{
			xtype	: 'container',
			flex	: 1,
			layout	: 'hbox',
			items	: [{
				xtype	: 'component',
				cls		: 'music-article-header',
				height	: 280,
				docked	: 'top',
				data	: null,
				tpl		: [
					'<div class="music-article-header-image" style="background-image:url(http://src.sencha.io/662/{image});">',
						'<h1>{title}</h1>',
					'</div>'
				]
			},{
				xtype	: 'controls',
				width	: 100
			},{
				xtype	: 'container',
				flex	: 1,
				cls		: 'music-article-content',
				tpl		: '{content}'
			}]
		}]
    },


    applyModel	: function(model){
		var me = this,
			header = me.down('component[cls=music-article-header]'),
			content = me.down('component[cls=music-article-content]'),
			controls = me.down('controls');

		header.setData(model.getData());
		content.setData(model.getData());
		controls.setModel(model);


		return model;
    }
});