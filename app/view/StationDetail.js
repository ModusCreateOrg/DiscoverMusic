Ext.define('Music.view.StationDetail', {
    extend : 'Ext.Container',
    xtype : 'stationdetail',
    config : {
        scrollable : true,
        tpl        : [
            '<div class="stationfinder-title-block">',
                '<tpl if="tagline">',
                    '<div class="stationfinder-tagline">"{tagline}"</div>',
                '</tpl>',
                '<div>Frequency: {band} {frequency}</div>',
                '<div>Location: {marketCity} {state}</div>',
            '</div>',
            '<tpl if="urls">',
                '<tpl for="urls">',
                    '<div class="station-url-container index_{[ xindex - 1 ]}">',
                        '<div class="station-play-icon"></div>',
//                        '<span class="station-url">',
                            '{title}',
//                        '</span>',
                    '</div>',
                '</tpl>',
            '</tpl>'
        ]
    },

	initialize: function() {
	    var me = this;

        me.callParent();

        me.element.on({
            scope      : me,
            delegate   : 'div.station-url-container',
            touchend   : me.onUrlElTouchEnd,
            touchstart : me.onUrlElTouchStart,
            tap        : me.onUrlElTap
        });
	},

    onUrlElTouchStart : function(evtObj) {
        var target = evtObj.getTarget();
        Ext.get(target).addCls('station-selected');
    },
    onUrlElTouchEnd : function (evtObj) {
        var target = evtObj.getTarget();
        Ext.get(target).removeCls('station-selected');
    },
    onUrlElTap : function(evtObj) {
        var target     = evtObj.target,
            classNames = target.className.split(' '),
            index      = classNames[1].split('_')[1];

        this.fireEvent('stationurlselect', this, index);
    }
});