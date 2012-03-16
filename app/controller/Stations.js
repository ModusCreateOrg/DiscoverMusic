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
        Ext.create('Music.view.StationFinder', {
            height : 400,
            width  : 300
        }).showBy(btn);
    },
    onStationTap        : function() {

    }
});