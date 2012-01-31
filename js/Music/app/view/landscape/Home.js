/**
 * @class Music.view.Home
 * @extends Ext.Panel
 * @author Crysfel Villa
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
			xtype	: 'title',
			docked	: 'top',
			title	: '<span class="app-title">Discover Music</span>',
			cls		: 'music-app-title',
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