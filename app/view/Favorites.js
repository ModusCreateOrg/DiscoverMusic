/**
 * @class Music.view.Favorites
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The favorites view
 */

Ext.define('Music.view.Favorites', {
    extend : 'Ext.dataview.DataView',
    alias  : 'widget.favorites',

    config : {
        store      : 'favorites',
        cls        : 'music-favorites',
        editing    : false,
        emptyText  : 'To add favorites, please visit an article and press the "Add to favorites" button.',
        scrollable : {
            direction     : 'vertical',
            directionLock : true
        },
        itemTpl    : [
            '<div class="music-result-article" style="background-image:url({image})">', // 300
                '<tpl if="editable == true">',
                    '<div class="music-favorites-remove">X</div>',
                '</tpl>',
                '<h2>{title}</h2>',
            '</div>'
        ],
        items      : [
            {
                docked : 'top',
                xtype  : 'toolbar',
                ui     : 'transparent',
                items  : [
                    {
                        xtype : 'title',
                        title : 'Your Favorites'
                    },
                    {
                        text   : 'Edit',
                        action : 'edit',
                        margin : '10 0 0 0'
                    }
                ]
            }
        ]
    }
});