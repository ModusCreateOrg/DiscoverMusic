Ext.define('Music.controller.Stations', {
    extend : 'Ext.app.Controller',

    config : {

        views       : [
            'StationFinder'
        ],
        stores      : [
            'Stations'
        ],
        refs : {
            stationFinder  : 'stationfinder'
        },
        control     : {
            stationfinder : {
                searchgeo : 'onSearchGeo',
                searchzip : 'onSearchZip'
            },
            stationdetail : {
                stationurlselect : 'onStationUrlSelect'
            }
        }
    },

    launch : function() {
        this.getApplication().on({
            scope        : this,
            findstations : 'onAppFindStations'
        });
    },

    onAppFindStations : function(btn) {
        var me = this,
            view = me.view;

        if (!me.view) {
            view = me.view = Ext.create('Music.view.StationFinder');
            me.getGeoLocation();

        }
        view.showBy(btn);
        view.show();

    },

    onSearchZip : function(view, zip) {
        this.queryStations({zip : zip});
    },

    onSearchGeo : function() {
        this.queryStations(this.coords);
    },

    onStationUrlSelect : function(detailCard, urlObj) {
        var app     = this.getApplication();

        urlObj = Ext.clone(urlObj);

        urlObj.audioFile = urlObj.content;
        app.fireEvent('playAudio', urlObj);

        this.getStationFinder().hide();
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
        var me = this;
        me.getFriendlyGeoName(me.coords = geoPosition.coords);
    },

    queryStations : function(params) {
        var me = this;

        me.view.showMask();

//        Ext.data.JsonP.request({
//            url         : 'http://discovermusic.moduscreate.com/stationFinder',
//            scope       : me,
//            callbackKey : 'callback',
//            callback    : me.onAfterQueryStations,
//            params      : params
//        });

        Ext.Ajax.request({
            url     : 'data/stations.json',
            success : me.onAfterQueryStations,
            scope   : me
        });
    },

//    Deprecated JSONP Callback
//    onAfterQueryStations : function(success, data) {
//        if (success) {
//            this.view.showStations(data);
//        }
//    },

    onAfterQueryStations : function(response, opts) {
        var data = JSON.parse(response.responseText);

        if (data) {
            this.view.showStations(data);
        }
    },


    getFriendlyGeoName : function(coords) {
        var me = this;

        Ext.data.JsonP.request({
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

//        if (success) {
//            var postalCodeItem = data.postalCodes[0];
//            text = 'Use : ' + postalCodeItem.adminName2 + ', ' + postalCodeItem.adminCode1;
            text = 'Use : New York, NY';
            locationBtn = view.down('#searchGeoLocationBtn');
            view.setHeight(130);
            locationBtn.setText(text);
            locationBtn.show();
//        }
    }
});