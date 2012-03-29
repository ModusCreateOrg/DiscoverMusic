Ext.define('Music.controller.Stations', {
    extend : 'Ext.app.Controller',

    config : {
        views       : [
            'StationFinder'
        ],
        stores      : [
            'Stations'
        ],
        control     : {
            stationfinder : {
                searchgeo : 'onSearchGeo',
                searchzip : 'onSearchZip'
            },
            stationdetail : {
                stationurlselect : 'onStationUrlSelect'
            }
        },
        queryApiTpl : Ext.create('Ext.Template',
            'select * from xml where url="http://23.21.152.214/stationFinder.jst?lat={latitude}&lon={longitude}&zip={zip}"'
        )
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

    },

    onSearchZip : function(view, zip) {
        this.queryStations({zip : zip});
    },

    onSearchGeo : function() {
        this.queryStations(this.coords);
    },

    onStationUrlSelect : function(detailCard, urlObj) {
        var content = urlObj.content,
            app     = this.getApplication();

        urlObj = Ext.clone(urlObj);

        if (content && content.match('\\\.mp3')) {
            app.fireEvent('playAudio', urlObj);
        }
        else if (content.match('\\\.pls')) {
            Ext.util.JSONP.request({
                url         : 'http://moduscreate.com/api/npr/plsProxy.php',
                callbackKey : 'callback',
                params      : { url : urlObj.content },
                callback    : function(success, data) {
                    if (success) {

                        urlObj.content = data.file;
                        urlObj.title = urlObj.name + ' ' + urlObj.title;
                        app.fireEvent('playAudio', urlObj);
                    }
                    else {
                        Ext.Msg.alert('We Apologize!', urlObj.title + ' is currently unavailable.');
                    }
                }
            });
        }
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
            view.setHeight(130);
            locationBtn.setText(text);
            locationBtn.show();
        }
    }
});