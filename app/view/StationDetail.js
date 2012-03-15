Ext.define('Music.view.StationDetail', {
    extend : 'Ext.Container',
    config : {
        data : { name : 'No station selected!' },
        tpl : [
            '<div>',
                '{name}',
            '</div>'
        ]
    }
});