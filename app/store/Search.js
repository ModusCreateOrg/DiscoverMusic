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
    config : {
        model : 'Music.model.Article',

        proxy : {
            type : 'jsonp',
            url  : 'http://discovermusic.moduscreate.com/search.jst'
        }
    }

});