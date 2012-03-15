/**
 * @class Music.view.Main
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */
Ext.define('Music.view.landscape.Main', {
    extend : 'Ext.Container',
    xtype  : 'main',

    config : {
        fullscreen : true,
        layout     : 'card',
        items      : [
            {
                xtype  : 'toolbar',
                docked : 'top',
                cls    : 'music-app-title',
                layout : 'hbox',
                defaults : {
                    margin : '9  0 0 0',
                    height : 40,
                    iconMask : true,
                    xtype : 'button'
                },
                items  : [
                    {
                        xtype : 'title',
                        title : '<span class="app-title">Discover Music</span>',
                        width : 252,
                        margin : null,
                        height : null
                    },
                    {
                        xtype   : 'player',
                        flex    : 1,
                        margin  : null,
                        height : null
                    },
//                    {
//                        action   : 'globaltoc',
//                        iconCls  : 'toc-icon'
//                    },
                    {
                        action   : 'findstations',
                        iconCls  : 'find-stations-icon'
                    },
                    {
                        iconCls  : 'favorite-icon',
                        action   : 'favorites'
                    },
                    {
                        action   : 'search',
                        iconCls  : 'search-icon'
                    }
                ]
            },
            {
                xtype : 'mainflow'
            }
        ]
    },

    initialize : function() {
        var me = this;

        me.callParent();

        me.renderElement.on('tap', 'onTap', me);
    },

    onTap : function(event) {
        if (event.getTarget('.app-title')) {
            this.fireEvent('titletap');
        }
    }
});