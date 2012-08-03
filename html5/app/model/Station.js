Ext.define('Music.model.Station', {
    extend : 'Ext.data.Model',
    config : {
        fields : [
            'band',
            'callLeters',
            'frequency',
            'marketCity',

            'state',
            'tagline',
            {
                name    : 'name',
                mapping : 'name',
                convert : function(v, record) {
                    // inject leaf for the detail card
                    record.data.leaf = !!v;
                    return v;
                }
            },

            {
                name    : 'urls',
                mapping : 'url',
                convert : function(value, record) {
//                    console.log('record.data', record.data)
                    var urls = [],
                        i = 0,
                        len,
                        item,
                        type;

                    if (value instanceof Array) {
                        len = value.length;

                        for (; i < len; ++i) {
                            item = value[i];
                            type = item.type;
                            item.name = record.data.name;
                            item.content && urls.push(item);
                        }
                        return urls;
                    }

                    return value;
                }
            }
        ]
    }
});