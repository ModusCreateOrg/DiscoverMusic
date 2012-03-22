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
            type : 'memory',
            data : [
                {
                    "id"   : 135408474,
                    "key"  : "electronicDance",
                    "name" : "Electronic"
                },
                {
                    "id"   : 10005,
                    "key"  : "hipHop",
                    "name" : "Hip-Hop"
                },
                {
                    "id"   : 139998808,
                    "key"  : "rnb",
                    "name" : "R&B / Soul"
                },
                {
                    "id"   : 10001,
                    "key"  : "rock",
                    "name" : "Rock"
                },
                {
                    "id"   : 139997200,
                    "key"  : "pop",
                    "name" : "Pop"
                },
                {
                    "id"   : 10002,
                    "key"  : "jazzBlues",
                    "name" : "Jazz & Blues"
                },
                {
                    "id"   : 10004,
                    "key"  : "world",
                    "name" : "World"
                },
                {
                    "id"   : 92792712,
                    "key"  : "country",
                    "name" : "Country"
                },
                {
                    "id"   : 139996449,
                    "key"  : "latinAlternative",
                    "name" : "Latin"
                },
                {
                    "id"   : 10003,
                    "key"  : "classical",
                    "name" : "Classical"
                }
            ]

        }
    }

});