/**
 * @class Music.store.Search
 * @extends Ext.data.Store
 * @author Dave Ackerman
 *
 * Description: Search page store
 */
//
//Ext.define('Music.store.Search', {
//    extend   : 'Ext.data.Store',
//    alias    : 'store.search',
//    config   : {
//        model : 'Music.model.Article',
//        proxy : {
//            type        : 'jsonp',
//            url         : 'http://api.npr.org/query',
//            callbackKey : 'callback',
//            reader      : {
//                type         : 'json',
//                rootProperty : 'list.story'
//            },
//            extraParams : {
//                apiKey         : 'MDA4ODE2OTE5MDEzMjYwODI4NDdiOGU5Yw001',
//                id             : '10001,10003,10002,10004,10005',
//                requiredAssets : 'image,audio',
//                fields         : 'parent,title,teaser,storyDate,text,audio,image,artist',
//                numResults     : 20,
//                dateType       : 'story',
//                sort           : 'dateDesc',
//                action         : 'Or',
//                output         : 'JSON'
//            }
//        }
//    }
//});



Ext.define('Music.store.Search', {
    extend : 'Ext.data.Store',
    alias    : 'store.search',
    config : {
        model : 'Music.model.Article',

        proxy : {
            type : 'jsonp',
//            url  : 'http://discovermusic.moduscreate.com/search.jst'
            url  : 'http://localhost:9090/search.jst'
        }
    }

});