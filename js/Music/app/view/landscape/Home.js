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
				xtype	: 'container',
				flex	: 1,
				padding	: 3,
				items	: [{
					xtype	: 'player'
				}]
			},{
				xtype	: 'button',
				action	: 'globaltoc',
				iconMask: true,
				iconCls : 'toc-mask',
				margin	: '10 5 10 5',
				height	: 40
			},{
				xtype	: 'button',
				iconCls	: 'favorite',
				action	: 'favorites',
				iconMask: true,
				margin	: '10 5 10 5',
				height	: 40
			},{
				xtype	: 'button',
				action	: 'search',
				iconCls	: 'search3',
				iconMask: true,
				margin	: '10 5 10 5',
				height	: 40
			}]
		},{
			xtype : 'mainflow'
		}]
	}
});