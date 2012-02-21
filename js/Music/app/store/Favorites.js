/**
 * @class Music.store.Favorites
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */

Ext.define('Music.store.Favorites',{
	extend      : 'Ext.data.Store',

	config		: {
		model	: 'Music.model.Article',

		proxy	: {
			type	: 'localstorage',
			id		: 'favorites'
		}
	}

});