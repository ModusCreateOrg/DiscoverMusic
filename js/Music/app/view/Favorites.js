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
		itemTpl	: [
			'<div class="music-favorites-article" style="background-image:url(http://src.sencha.io/300/{image})">',
				'<h2>{title}</h2>',
			'</div>'
		],
		items	: [{
			dock	: 'top',
			xtype	: 'toolbar',
			ui		: 'transparent',
			items	: [{
				xtype	:'title',
				title	: 'Your favorites'
			},{
				text	: 'Edit'
			}]
		}]
    }
});