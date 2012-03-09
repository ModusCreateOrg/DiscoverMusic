/**
 * @class Music.view.Favorites
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The favorites view
 */

Ext.define('Music.view.Favorites',{
    extend      : 'Ext.dataview.DataView',
    alias       : 'widget.favorites',

    config		: {
		store	: 'favorites',
		cls		: 'music-favorites',
		editing	: false,
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
		itemTpl	: [
			'<div class="music-result-article" style="background-image:url(http://src.sencha.io/300/{image})">',
				'<tpl if="editable == true">',
				'<div class="music-favorites-remove"></div>',
				'</tpl>',
				'<h2>{title}</h2>',
			'</div>'
		],
		items	: [{
			docked	: 'top',
			xtype	: 'toolbar',
			ui		: 'transparent',
			items	: [{
				xtype	:'title',
				title	: 'Your favorites'
			},{
				text	: 'Edit',
				action	: 'edit'
			}]
		}]
    }
});