/**
 * @class Music.view.ArticlePreview
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The article view
 */
Ext.define('Music.view.ArticlePreview', {
    extend: 'Ext.Component',
    xtype: 'articlepreview',
    config: {
        model: null,
        genre: null,
        cls: 'music-article-preview',
        tpl: [
            '<div class="music-article-image" style="background-image:url(http://src.sencha.io/1024/{image});">',
                '<div class="music-article-category music-article-{genreKey}"><h1>{genre}</h1></div>',
                '<div class="music-article-title"><div class="music-content-all">',
                    '<div class="music-article-title-bg"></div>',
                    '<div class="music-article-title-content">',
                        '<div class="music-article-btn music-article-btn-{genreKey}">Read <em>&</em> Listen</div>',
                        '<h2>{title}</h2>',
                    '</div></div>',
                '</div>',
            '</div>'

            ]
    },
    
    initialize: function () {
        var me = this;
        me.callParent();

        me.registerEvents();
    },

    registerEvents  : function(){
        this.readAndListen = this.renderElement.down(".music-article-btn");
        
        this.readAndListen.on({
            scope      : this,
            tap        : 'showFullArticle',
            touchstart : 'onPress',
            touchend   : 'onRelease'
        });
    },
    
    onPress         : function(){
        this.readAndListen.addCls('music-article-btn-pressed');
    },

    onRelease       : function(){
        this.readAndListen.removeCls('music-article-btn-pressed');
    },

    showFullArticle: function (event, node) {
        console.log('TAP!');
        this.fireEvent("readarticle", this.getModel());
    }
});