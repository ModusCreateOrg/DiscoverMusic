/**
 * @class Music.view.Home
 * @extends Ext.Panel
 * @author Crysfel Villa
 *
 * Description
 */
Ext.define('Music.view.landscape.Home',{
	extend	: 'Ext.Panel',
	alias	: 'widget.home',

	config	: {
		fullscreen	: true,

		layout		: "card",
		
		items		: [{
			xtype	: 'toolbar',
			docked	: 'top',
			items	: [{
				xtype	: 'title',
				title	: 'Discover Music',
				cls		: 'music-app-title'
			}]
		}]
	}
});