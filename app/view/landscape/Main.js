/**
 * @class Music.view.Main
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */
Ext.define('Music.view.landscape.Main',{
	extend	: 'Ext.Panel',
	xtype	: 'main',

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
				iconCls : 'toc-icon',
				margin	: '6 5 10 5',
				height	: 40
			},{
				xtype	: 'button',
				iconCls	: 'favorite-icon',
				action	: 'favorites',
				iconMask: true,
				margin	: '6 5 10 5',
				height	: 40
			},{
				xtype	: 'button',
				action	: 'search',
				iconCls	: 'search-icon',
				iconMask: true,
				margin	: '6 5 10 5',
				height	: 40
			}]
		},{
			xtype : 'mainflow'
		}]
	}
});