/**
 * @class Music.view.ArticlePreview
 * @extends Ext.Panel
 * @author Crysfel Villa
 *
 * The article view
 */
Ext.define('Music.view.ArticleControl', {
    extend: 'Ext.Component',
    alias: 'widget.articlepreview',
    config: {
        topic: '',
        cls: 'music-article-preview',
        tpl: [
            '<div class="music-article-image" style="background-image:url(http://src.sencha.io/1024/{image});">',
                '<div class="music-article-category"><h1>{name}</h1></div>',
                '<div class="music-article-title"><div class="music-content-all">',
                    '<div class="music-article-title-bg"></div>',
                    '<div class="music-article-title-content">',
                        '<div class="music-article-read-btn">Read <em>&</em> Listen</div>',
                        '<h2>{title}</h2>',
                    '</div></div>',
                '</div>',
            '</div>'
            ]
    },
    initialize: function () {
        var me = this;
        me.callParent();

    },
});