Ext.define('Music.view.StationFinder', {
    extend : 'Ext.Panel',
    xtype  : 'stationfinder',
    requires : [
        'Music.view.StationDetail',
        'Ext.dataview.NestedList',
        'Ext.TitleBar'
    ],
    config : {
        displayField  : 'name',
        layout        : 'fit',
        height        : 100,
        width         : 350,
        hideOnMaskTap : true,
        items         : [
            {
                xtype  : 'component',
                docked : 'top',
                height : 25,
                style  : 'color: #FFF; text-align: center; font-size: 1.25em;',
                html   : 'Station finder'
            },
            {
                xtype  : 'container',
                docked : 'top',
                style  : 'padding: 10px;',
                layout : {
                    type  : 'vbox',
                    align : 'center',
                    pack  : 'center'
                },
                items  : [
                    {
                        xtype : 'container',
                        items : [
                            {
                                xtype       : 'textfield',
                                width       : 200,
                                placeHolder : 'Zip code',
                                itemId      : 'zipCode',
                                style       : 'float: left; margin-right: 10px; -webkit-border-radius: 10px; min-height: 1.5em !important;'
                            },
                            {
                                xtype  : 'button',
                                text   : 'Search',
                                itemId : 'searchZipCodeBtn',
                                style  : 'position: relative; top: 5px;'
                            }
                        ]
                    },
                    {
                        xtype  : 'button',
                        itemId : 'searchGeoLocationBtn',
                        style  : 'margin-top: 10px;',
                        hidden : true,
                        width  : 260
                    }
                ]
            }
        ]
    },

    initialize : function() {
        var me = this;

        me.on({
            tap : {
                scope    : me,
                delegate : 'container > #searchGeoLocationBtn',
                fn       : me.onSearchGeoLocation
            }
        });

        me.on({
            tap : {
                scope    : me,
                delegate : 'container > #searchZipCodeBtn',
                fn       : me.onSearchZipCodeBtn
            }
        });
        me.callParent();
    },

    onSearchGeoLocation : function() {
        this.fireEvent('searchgeo', this);
    },

    onSearchZipCodeBtn : function() {
        this.fireEvent('searchzip', this, 21703);
    },

    showStations : function(data) {
        var me = this;

        me.unmask();

        me.list = me.add({
            xtype        : 'nestedlist',
            title        : 'Stations',
            displayField : 'name',
            backText     : 'Back',
            store        : {
                type                : 'tree',
                model               : 'Music.model.Station',
                defaultRootProperty : 'items',
                root                : {
                    text  : '',
                    items : data
                }
            },
            detailCard   : {
                xtype : 'stationdetail'
            },
            listeners    : {
                scope   : this,
                itemtap : 'onListItemTap'
            }
        });

    },

    onListItemTap : function(nestedList, list, index, target, record) {
        console.log('onListItemTap', record.getData());
        nestedList.getDetailCard().setData(record.getData());
    },
    showMask      : function() {
        var me = this;
        me.setMasked({
            xtype   : 'loadmask',
            message : 'Searching'
        });

        if (me.list) {
            me.remove(me.list);
            delete me.list;
        }
        me.setHeight(550);
    }
});