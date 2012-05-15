/**
 * @class Music.view.ArticlePreview
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The article view
 */
Ext.define('Music.view.ArticlePreview', {
    extend : 'Ext.Component',
    xtype  : 'articlepreview',
    config : {
        model : null,
        genre : null,
        cls   : 'music-article-preview',
        tpl   : [
            '<div class="music-article-image" style="background-image:url(http://src.sencha.io/1024/{image});">',
                '<div class="music-article-category music-article-{genreKey} animated fadeInLeft">',
                    '<h1>{genre}</h1>',
                '</div>',
                '<div class="music-article-title animated fadeInRight">',
                    '<div class="music-content-all">',
                        '<div class="music-article-title-bg music-article-title-content">',
                            '<div class="music-article-btn music-article-btn-{genreKey}">Read <em>&</em> Listen</div>',
                            '<h2>{title}</h2>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ]
    },

    initialize : function() {
        this.callParent();
        this.registerEvents();
    },

    registerEvents : function() {
        var me = this;

        me.readAndListen = me.renderElement.down(".music-article-btn");

        me.readAndListen.on({
            scope      : me,
            tap        : 'showFullArticle',
            touchstart : 'onPress',
            touchend   : 'onRelease'
        });
        me.pressedCls = 'music-article-btn-pressed-' + this.getModel().get('genreKey');
    },

    onPress : function() {
        this.readAndListen.addCls(this.pressedCls);
    },

    onRelease : function() {
        this.readAndListen.removeCls(this.pressedCls);
    },

    showFullArticle : function() {
        this.fireEvent("readarticle", this.getModel());
    }
});