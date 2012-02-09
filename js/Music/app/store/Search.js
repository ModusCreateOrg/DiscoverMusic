/**
 * @class Music.store.Search
 * @extends Ext.data.Store
 * @author Dave Ackerman
 *
 * Description: Search page store
 */

Ext.define('Music.store.Search', {
    extend  : 'Ext.data.Store',
    config	: {
		model   : 'Music.model.Article',
		proxy   : {
            type    : 'jsonp',
            url     : 'http://api.npr.org/query',
            callbackKey: 'callback'
            reader  : {
                type    : 'json'
            },
            extraParams: {
                apiKey: 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
                requiredAssets: 'image',
                numResults: 10
                transform: 'source',
                output: 'JSON'                
            }
        }
    }
});