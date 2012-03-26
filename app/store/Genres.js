/**
 * @class Music.store.Categories
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The Genres store
 */
Ext.define('Music.store.Genres', {
    extend : 'Ext.data.Store',

    config : {
        model : 'Music.model.Genre',

        proxy : {
            type : 'jsonp',
            url  : 'http://23.21.152.214/getGenres.jst'
        }
    }

});