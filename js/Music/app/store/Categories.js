/**
 * @class Music.store.Categories
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The categories store
 */

Ext.define('Music.store.Categories',{
    extend      : 'Ext.data.Store',

    config		: {
		model		: 'Music.model.Category',
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