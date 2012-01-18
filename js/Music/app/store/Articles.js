/**
 * @class Music.store.Articles
 * @extends Ext.data.Store
 * @author Crysfel Villa
 *
 * Description
 */

Ext.define('Music.store.Articles', {
    extend  : 'Ext.data.Store',
    model   : 'Music.model.Article',

    proxy   : {
        type    : 'memory',
        reader  : {
            type    : 'json'
        }
    }
});