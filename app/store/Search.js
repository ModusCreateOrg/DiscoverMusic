/**
 * @class Music.store.Search
 * @extends Ext.data.Store
 * @author Dave Ackerman
 *
 * Description: Search page store
 */

Ext.define('Music.store.Search', {
    extend  : 'Ext.data.Store',
    alias   : 'store.search',
    requires: ['Ext.data.proxy.JsonP'],
    config	: {
		model   : 'Music.model.Article',
		proxy   : {
            type    : 'jsonp',
            url     : 'http://api.npr.org/query',
            callbackKey: 'callback',
            reader  : {
                type    : 'json',
                rootProperty : 'list.story'
            },
            extraParams: {
                apiKey: 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
                requiredAssets: 'image',
                numResults: 10,
                dateType:'story',
                sort:'dateDesc',
                action:'Or',
                output:'JSON'
            }
        }
    }
});