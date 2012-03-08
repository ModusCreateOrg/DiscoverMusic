/**
 * @class Music.store.Favorites
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The favorites store use a localstorage proxy to persist articles
 */

Ext.define('Music.store.Favorites',{
	extend      : 'Ext.data.Store',
	requires	: [
		'Ext.data.proxy.LocalStorage'
	],

	config		: {
		autoSync: true,
		model	: 'Music.model.Article',
		storeId	: 'favorites',
		autoLoad: true,
		proxy	: {
			type	: 'localstorage',
			id		: 'favorites'
		}
	}

});