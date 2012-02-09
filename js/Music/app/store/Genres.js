/**
 * @class Music.store.Categories
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The Genres store
 */
Ext.define('Music.store.Genres', {
    extend: 'Ext.data.Store',

    config		: {
		model		: 'Music.model.Genre',
		storeId		: 'Categories',
		
		proxy		: {
			type	: 'ajax',
			url		: 'serverside/categories.json',
			reader	: {
				type			: 'json',
				rootProperty	: 'data'
			}
		}
	}

});