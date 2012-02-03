/**
 * @class Music.view.Article
 * @extends Ext.Component
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
				xtype	: 'component',
				width	: 150,
				html	: 'Controls here'
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

    initialize	: function(){
		var me = this;

		me.callParent();

		Ext.Viewport.on('orientationchange',me.onOrientationChange,me);
    },

    applyModel	: function(model){
		var me = this,
			header = me.down('component[cls=music-article-header]'),
			content = me.down('component[cls=music-article-content]');

		header.setData(model.getData());
		content.setData(model.getData());

		return model;
    },

    onOrientationChange	: function(viewport,width,height){
		if(orientation === 1024){
			Ext.Msg.alert('landscape');
		}else{
			Ext.Msg.alert('portrait');
		}
    }
});