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
            url  : 'http://ec2-23-20-142-242.compute-1.amazonaws.com:9090/search'
//            url  : 'http://localhost:9090/search'
        }
    }

});