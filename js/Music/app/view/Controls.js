/**
 * @class Music.view.ArticlePreview
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The article view
 */
Ext.define('Music.view.Controls', {
    extend: 'Ext.Container',
    alias: 'widget.controls',
    config: {
        cls     : 'music-article-controls',
        model   : null,
        bodyPadding:{top:30},
        defaults:{iconMask: true,width:50},
        items   : [{
            xtype   : 'button',
            iconCls : 'play',
            action  : 'play'
        },{
            xtype   : 'button',
            iconCls : 'favorites',
            action  : 'favorites'
        },{
            xtype   : 'button',
            iconCls : 'action',
            action  : 'twitter'
        }]
        /*html: [
            '<div class="music-article-controls-content">',
                '<div class="music-article-controls-button music-article-controls-play"></div>',
                '<div class="music-article-controls-button music-article-controls-favorites"></div>',
                '<div class="music-article-controls-button music-article-controls-twitter"></div>',
            '</div>'
        ].join('')
        */
    },

    initialize: function () {
        var me = this,
            el  = me.renderElement;

        me.callParent();

        el.on('tap', me.onTap, me);
    },

    onTap   : function(event){
        var me = this;
        if (event.getTarget('.music-article-controls-play')){
            return this.fireEvent('play', this.getModel());
        }
        if (event.getTarget('.music-article-controls-favorites')){
            return this.fireEvent('favorite', this,this.getModel());
        }
        if (event.getTarget('.music-article-controls-twitter')){
            return this.fireEvent('twitter', this,this.getModel());
        }
    }
});