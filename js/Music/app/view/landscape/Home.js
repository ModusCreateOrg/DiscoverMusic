/**
 * @class Music.view.Home
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */
Ext.define('Music.view.landscape.Home',{
	extend	: 'Ext.Panel',
	xtype	: 'home',

	config	: {
		fullscreen	: true,
		layout		: 'card',
		items		: [{
			xtype	: 'toolbar',
			docked	: 'top',
			cls		: 'music-app-title',
			layout	: 'hbox',
			items	: [{
				xtype	: 'title',
				title	: '<span class="app-title">Discover Music</span>',
				width	: 252
			},{
				xtype	: 'player',
				flex	: 1
			}]
		},{
			xtype : 'mainflow'
		}]
	},
	 
	initialize: function() {
		this.callParent();
		this.element.on('tap', this.onTitleTap, this);
	},

	onTitleTap : function(eventObject) {
		var target = Ext.get(eventObject.target);
		if (target.hasCls('app-title')) {
			this.fireEvent('titletap', this);
		}
	}

});