Ext.define('Music.view.StationFinder', {
    extend : 'Ext.Panel',

    config              : {
        displayField : 'name',
        layout       : 'fit',
        items        : [
            {
                xtype  : 'container',
                docked : 'top',
                layout : {
                    type  : 'vbox',
                    align : 'center',
                    pack  : 'center'
                },
                items  : [
                    {
                        xtype  : 'button',
                        itemId : 'currentLocation',
                        text   : 'Use current location',
                        width  : 200
                    },
                    {
                        xtype : 'container'
                    }

                ]
            }
        ]
    },
    initialize          : function() {

    },
    onAppFindStations   : function(btn) {
        this.findStationsBtn = btn;
        Ext.device.Geolocation.getCurrentPosition({
            scope   : this,
            success : this.onGeoLocationFind
        });

        var view = Ext.create('Music.view.StationFinder', {
            title  : 'Stations',
            store  : store,
            height : 400,
            width  : 300
        });

        view.showBy(this.findStationsBtn);
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
            var datItems = data.query.results.stations.station;
            console.log('NPR data:', datItems);
            var store = Ext.create('Ext.data.TreeStore', {
                model               : 'Music.model.Station',
                defaultRootProperty : 'items',
                root                : {
                    text  : '',
                    items : datItems
                }
            });
            //            store.applyData(root);

        }
    },

});