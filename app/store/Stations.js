Ext.define('Music.store.Stations', {
    extend   : 'Ext.data.TreeStore',
    requires : ['Music.model.Station'],
    config   : {
        model : 'Music.model.Station'
    }
});