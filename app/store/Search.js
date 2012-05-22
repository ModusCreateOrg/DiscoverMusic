/**
 * @class Music.store.Search
 * @extends Ext.data.Store
 * @author Dave Ackerman
 *
 * Description: Search page store
 */

Ext.define('Music.store.Search', {
    extend : 'Ext.data.Store',
    alias    : 'store.search',
    requires : ['Ext.data.proxy.JsonP'],
    config : {
        model : 'Music.model.Article',

        proxy : {
            type : 'jsonp',
            url  : 'http://discovermusic.moduscreate.com/search.jst'
//            url  : 'http://localhost:9090/search.jst'
        }
    }

});