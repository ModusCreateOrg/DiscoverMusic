Ext.define('Music.controller.Stations', {
    extend : 'Ext.app.Controller',

    config : {
        views   : [
            'StationFinder'
        ],
        stores  : [
            'Stations'
        ],
        control : {
            stationfinder : {
                searchgeo : 'onSearchGeo',
                searchzip : 'onSearchZip'
            }
        },
        queryApiTpl   : Ext.create('Ext.Template',
            'select * from xml where url="http://moduscreate.com/nprStationFinderProxy.php?lat={latitude}&lon={longitude}&zip={zip}"'
        )
    },

    launch : function() {
        this.getApplication().on({
            scope        : this,
            findstations : 'onAppFindStations'
        })
    },

    onAppFindStations : function(btn) {
        var me = this,
            view = me.view;

        if (!me.view) {
            view = me.view = Ext.create('Music.view.StationFinder');
            view.showBy(btn);
            me.getGeoLocation();
        }
    },

    onSearchZip : function(view, zip) {
        console.log('onSearchZip');
        this.queryStations({zip : 21703})
    },

    onSearchGeo  : function(view) {
        console.log('onSearchGeo');

        this.queryStations(this.coords);

    },
    onStationTap : function() {

    },

    getGeoLocation : function() {
        var me = this;
        Ext.device.Geolocation.getCurrentPosition({
            scope   : me,
            success : me.onGeoLocationFind,
            failure : me.onAfterGetFriendlyGeoName
        });
    },

    onGeoLocationFind : function(geoPosition) {
        var me = this,
            coords = me.coords = geoPosition.coords;

        me.getFriendlyGeoName(coords);
    },

    queryStations : function(params) {
        var me = this,
            query = me.getQueryApiTpl().apply(params);

        me.view.showMask();

        Ext.util.JSONP.request({
            url         : 'http://query.yahooapis.com/v1/public/yql',
            scope       : me,
            callbackKey : 'callback',
            callback    : me.onAfterQueryStations,
            params      : {
                q      : query,
                format : 'json'
            }
        });
    },

    onAfterQueryStations : function(success, data) {
        if (success) {
            var dataItems = data.query.results.stations.station;
             console.log('NPR data:', dataItems);
             this.view.showStations(dataItems);
        }
    },

    getFriendlyGeoName : function(coords) {
        var me = this;

        Ext.util.JSONP.request({
            url         : 'http://ws.geonames.org/findNearbyPostalCodesJSON',
            scope       : me,
            callbackKey : 'callback',
            callback    : me.onAfterGetFriendlyGeoName,
            params      : {
                lat : coords.latitude,
                lng : coords.longitude
            }
        });

    },

    onAfterGetFriendlyGeoName : function(success, data) {

        var me = this,
            view = me.view,
            text,
            locationBtn;

        if (success) {
            var postalCodeItem = data.postalCodes[0];
            text = 'Use : ' + postalCodeItem.adminName2 + ', ' + postalCodeItem.adminCode1;

            locationBtn = view.down('#searchGeoLocationBtn');
            view.setHeight(140);
            locationBtn.setText(text);
            locationBtn.show();
        }
    }
});