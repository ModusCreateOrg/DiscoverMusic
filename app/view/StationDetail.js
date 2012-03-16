Ext.define('Music.view.StationDetail', {
    extend : 'Ext.Container',
    xtype : 'stationdetail',
    config : {
        scrollable : true,
        tpl        : [
            '<div style="padding: 10px;">',
                '<h1 style="font-weight: bold;">{name}</h1>',
                '<div>{tagLine}</div>',
                '<div>Frequency: {band} {frequency}</div>',
                '<div>Location: {marketCity} {state}</div>',
                '<tpl for="urls">',
                    '<div>',
                        '{type}',
                    '</div>',
                '</tpl>',
                '<tpl if=" ! values.urls">',
                    '<div>No online streams available</div>',
                '</tpl>',
            '</div>'
        ]
    }
});