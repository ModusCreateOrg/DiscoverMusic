/**
 * @class Music.store.Articles
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */

Ext.define('Music.store.Articles', {
    extend  : 'Ext.data.Store',

    config	: {
		model   : 'Music.model.Article',

		proxy   : {
            type    : 'memory',
            reader  : {
                type    : 'json'
            }
        }
    }
});