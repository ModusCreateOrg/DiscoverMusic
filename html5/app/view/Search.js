/**
 * @class Music.view.Search
 * @extends Ext.Panel
 * @author Crysfel Villa<crysfel@moduscreate.com>
 *
 * Search page view.
 */

Ext.define('Music.view.Search', {
    extend   : 'Ext.Panel',
    alias    : 'widget.search',
    requires : [
        'Ext.form.Checkbox',
        'Ext.form.FieldSet',
        'Ext.field.Search'
    ],

    config : {
        layout : 'hbox',
        cls    : 'music-search',
        items  : [
            {
                xtype      : 'panel',
                width      : 285,
                padding    : 15,
                cls        : 'music-genre-filters',
                scrollable : {
                    direction     : 'vertical',
                    directionLock : true
                },
                items      : [
                    {
                        xtype    : 'fieldset',
                        title    : 'Filter by Genre',
                        defaults : {
                            xtype      : 'checkboxfield',
                            labelWidth : '70%',
                            checked    : true
                        },
                        items    : [
                            {
                                "value" : 135408474,
                                "name"  : "electronicDance",
                                "label" : "Electronic"
                            },
                            {
                                "value" : 10005,
                                "name"  : "hipHop",
                                "label" : "Hip-Hop"
                            },
                            {
                                "value" : 139998808,
                                "name"  : "rnb",
                                "label" : "R&B / Soul"
                            },
                            {
                                "value" : 10001,
                                "name"  : "rock",
                                "label" : "Rock"
                            },
                            {
                                "value" : 139997200,
                                "name"  : "pop",
                                "label" : "Pop"
                            },
                            {
                                "value" : 10002,
                                "name"  : "jazzBlues",
                                "label" : "Jazz & Blues"
                            },
                            {
                                "value" : 10004,
                                "name"  : "world",
                                "label" : "World"
                            },
                            {
                                "value" : 92792712,
                                "name"  : "country",
                                "label" : "Country"
                            },
                            {
                                "value" : 139996449,
                                "name"  : "latinAlternative",
                                "label" : "Latin"
                            },
                            {
                                "value" : 10003,
                                "name"  : "classical",
                                "label" : "Classical"
                            }
                        ]
                    }
                ]
            },
            {
                xtype      : 'dataview',
                flex       : 1,
                store      : {
                    type : 'search'
                },
                itemTpl    : [
                    '<div class="music-result-article" style="background-image:url(http://src.sencha.io/300/{image})">',
                        '<h2>{title}</h2>',
                    '</div>'
                ],
                scrollable : {
                    direction     : 'vertical',
                    directionLock : true
                },
                items      : {
                    xtype  : 'toolbar',
                    docked : 'top',
                    items  : [
                        {
                            xtype       : 'searchfield',
                            flex        : 1,
                            placeHolder : 'Search Artist, Genres, Songs...'
                        },
                        {
                            xtype  : 'button',
                            text   : 'Search',
                            action : 'search'
                        }
                    ]
                }

            }
        ],
        control : {
            'dataview' : {
                itemtap : 'onDataViewItemTap'
            }
        }
    },

    initialize : function() {
        var me = this,
            viewport = Ext.Viewport;

        me.callParent();

        viewport.on('orientationchange', me.onOrientationChange, me);
        viewport.fireEvent('orientationchange', Ext.Viewport, Ext.Viewport.orientation);
    },

    onOrientationChange : function(viewport, orientation) {
        var me = this,
            filters = me.down('panel[cls=music-genre-filters]'),
            width;

        width = ( orientation === Ext.Viewport.PORTRAIT) ? 275 : 285;
        filters.setWidth(width);
    },

    onDataViewItemTap : function(view, index, target, record) {
        this.fireEvent('storytap', record);
    }
});