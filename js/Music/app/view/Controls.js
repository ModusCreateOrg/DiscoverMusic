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
        defaults: { iconMask: true, width: 70, height: 70 },
        items   : [{
            xtype   : 'button',
            iconCls : 'play',
            action  : 'play',
            cls: 'control-button'
        },{
            xtype   : 'button',
            iconCls : 'heart',
            action  : 'favorites',
            cls: 'control-button'
        },{
            xtype   : 'button',
            iconCls : 'action',
            action  : 'twitter',
            cls: 'control-button'
        }]
    },

    initialize: function () {
        var me = this;

        me.callParent();

        me.items.each(function(btn){
            btn.on("tap",me.onTap,me);
        },me);
    },

    onTap   : function(button,event){
        var me = this;
        
        if (button.config.action == 'play'){
            return this.fireEvent('play', this.getModel());
        }
        if (button.config.action == 'favorites'){
            return this.fireEvent('favorite', this,this.getModel());
        }
        if (button.config.action == 'twitter'){
            return this.fireEvent('twitter', this,this.getModel());
        }
    }
});