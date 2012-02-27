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
				xtype	: 'container',
				flex	: 1,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },           
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
			content = me.down('component[cls=music-article-content]'),
			controls = me.down('controls');

		header.setData(model.getData());
		content.setData(model.getData());
		controls.setModel(model);

		me.onOrientationChange(Ext.Viewport,Ext.Viewport.orientation);

		return model;
    },

    onOrientationChange	: function(viewport,orientation){
		var me = this;

        me.element.addCls(orientation);
        if(orientation === Ext.Viewport.PORTRAIT){
            me.element.removeCls(Ext.Viewport.LANDSCAPE);
            me.down('donate').hide();
        }else{
            me.element.removeCls(Ext.Viewport.PORTRAIT);
            me.down('donate').show();
        }
    }
});