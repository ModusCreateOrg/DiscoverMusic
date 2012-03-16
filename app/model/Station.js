Ext.define('Music.model.Station', {
    extend : 'Ext.data.Model',
    config : {
        fields : [
            'band',
            'callLeters',
            'frequency',
            'marketCity',
            'name',
            'state',
            'tagline',
            {
                name    : 'image',
                mapping : 'image.content'
            },
            {
                name    : 'urls',
                mapping : 'url'
            }
        ]
    }
});