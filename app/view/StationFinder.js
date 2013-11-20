Ext.define('Music.view.StationFinder', {
    extend   : 'Ext.Panel',
    xtype    : 'stationfinder',
    requires : [
        'Music.view.StationDetail',
        'Ext.dataview.NestedList',
        'Ext.TitleBar'
    ],
    config   : {
        displayField : 'name',
        layout       : 'fit',
        cls          : 'stationfinder',
        height       : 90,
        width        : 350,


        items        : [
            {
                xtype  : 'component',
                docked : 'top',
                height : 25,
                cls    : 'stationfinder-title',
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
                        xtype  : 'container',
                        itemId : 'searchContainer',
                        items  : [
                            {
                                xtype       : 'textfield',
                                width       : 200,
                                placeHolder : 'Zip code',
                                itemId      : 'zipCode',
                                style       : 'float: left; margin-right: 10px; -webkit-border-radius: 10px; min-height: 1.5em !important;',
                                value       : '10001',
                                readOnly    : true
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
                        width  : 290
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

        me.on({
            scope   : me,
            painted : me.onPaintedInitViewportTapEvent,
            buffer  : 1000
        });
    },

    onSearchGeoLocation : function() {
        this.fireEvent('searchgeo', this);
    },

    onSearchZipCodeBtn : function(btn) {
        var zip = btn.getParent().down('#zipCode').getValue();
        if (zip.length == 5) {
            this.fireEvent('searchzip', this, zip);
        }
        else {
            Ext.Msg.alert('Please enter a valid Zip Code.');
        }
    },

    showStations : function(data) {
        var me = this;

        me.unmask();

        me.list = me.add({
            xtype        : 'nestedlist',
            title        : 'Stations',
            itemTpl      : '{name}, {location}',
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
        nestedList.getDetailCard().setData(record.getData());
        this.selectedRecord = record;
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
        me.setHeight(530);
    },

    onPaintedInitViewportTapEvent : function(view) {
        var me = this;
        Ext.getBody().on({
            scope : me,
            touchstart : me.onViewportTouchStart
        });
    },

    onViewportTouchStart : function(evtObj) {
        var me = this;
        if (!evtObj.getTarget('.stationfinder') && me.isPainted()) {
            me.hide();

            Ext.getBody().un({
                scope : me,
                tap   : me.onViewportTouchStart
            });

        }
    }
});