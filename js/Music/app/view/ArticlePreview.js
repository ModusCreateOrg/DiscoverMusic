/**
 * @class Music.view.ArticlePreview
 * @extends Ext.Panel
 * @author Crysfel Villa
 *
 * The article view
 */
Ext.define('Music.view.ArticlePreview', {
    extend: 'Ext.Component',
    xtype: 'articlepreview',
    config: {
        model: null,
        topic: null,
        cls: 'music-article-preview',
        tpl: [
            '<div class="music-article-image" style="background-image:url(http://src.sencha.io/1024/{image});">',
                '<div class="music-article-category music-article-{genreKey}"><h1>{genre}</h1></div>',
                '<tpl if="isFeatured">',
                    '<div class="see-all-button show-genre-button-{genreKey}"><span>See All</span> {genre} &darr;</div>',
                '<tpl else>',
                    '<div class="back-to-covers back-to-covers-button-{genreKey}">Return to Covers &uarr;</div>',
                '</tpl>',
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
       
        // since our covers may not have these elements, we check for their existance first 
        // add the "See All" button
        if (me.element.down('.see-all-button') != null ) {
            var seeAllBtn = me.element.down(".see-all-button");
            seeAllBtn.on('tap', me.showGenre, me);
        }

        // add the "Go Up" button
        if (me.element.down('.back-to-covers')) {
            var backToCoversBtn = me.element.down('.back-to-covers-button');
            backToCoversBtn.on('tap', me.showCovers, me);
        }

        // add the "Read & Listen" button
        var btn = me.element.down(".music-article-btn");
        btn.on('tap', me.showFullArticle, me);
        
    },

    showGenre: function(event, node) {
        var genreKey = this.getModel();
        this.fireEvent('seealltap', null, genreKey);
    },

    showCovers: function(event, node) {
        this.fireEvent('backtocovers', this);
    },
    
    showFullArticle: function (event, node) {
        this.fireEvent("readarticle", this.getModel());
    }
});