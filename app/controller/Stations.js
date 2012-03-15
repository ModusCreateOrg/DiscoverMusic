Ext.define('Music.controller.Stations', {
    extend              : 'Ext.app.Controller',
    config              : {
        stationFinderApiUrl : 'http://api.npr.org/stations.php',
        queryApiTpl         : Ext.create('Ext.Template',
            'select * from xml where url="http://moduscreate.com/nprStationFinderProxy.php?lat={latitude}&lon={longitude}"'
        ),

        views   : [
        ],
        stores  : [
            'Stations'
        ],
        control : {

        }
    },
    launch              : function() {
        this.getApplication().on({
            scope        : this,
            findstations : 'onAppFindStations'
        })
    },
    onAppFindStations   : function(btn) {
        this.findStationsBtn = btn;
        Ext.device.Geolocation.getCurrentPosition({
            scope   : this,
            success : this.onGeoLocationFind
        });
    },
    onGeoLocationFind   : function(geoPosition) {
        console.log('Coordinates', geoPosition.coords);
        var me = this,
            coords = geoPosition.coords,
            query = this.getQueryApiTpl().apply(coords);

        Ext.util.JSONP.request({
            url         : 'http://query.yahooapis.com/v1/public/yql',
            scope       : me,
            callbackKey : 'callback',
            callback    : me.onAfterJsonpRequest,
            params      : {
                q      : query,
                format : 'json'
            }
        });
    },
    onAfterJsonpRequest : function(success, data) {
        var me = this;
        if (success) {
            var root = data.query.results.stations.station;
            console.log('NPR data:', root);
            var store = Ext.create('Music.store.Stations');
            store.applyData(root);
            console.log(store);
        }
    },
    onStationTap        : function() {

    }
});