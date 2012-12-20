/**
 * @class Music.view.Article
 * @extends Ext.Container
 *
 * The full article view
 */

Ext.define('Music.view.Article', {
    extend : 'Ext.Container',
    alias  : 'widget.article',

    requires : [
        'Music.view.Slidousel'
    ],

    config : {
        model       : null,
        genre       : null,
        genreRecord : undefined,
        layout      : 'fit',
        baseCls     : 'music-article',
        scrollable  : {
            direction     : 'vertical',
            directionLock : true
        },

        tpl        : Ext.create('Ext.XTemplate',
            '<h1>{title}</h1>',
            '<h4>{[ this.dateFormat(values.date) ]}</h4>',
            '{text}',
            {
                dateFormat : function(value){
                    return Ext.util.Format.date(value,'F d, Y');
                }
            }
        ),
        items      : [
            {
                xtype  : 'component',
                height : 200,
                docked : 'top',
                itemId : 'articleHeader',
                tpl    : [
                    '<div class="music-article-genre-{genreKey}">{genre}',
                    '</div>',
                    '<div class="music-article-image music-article-{genreKey}" style="background-image:url(http://src.sencha.io/600/{image});">',


                        '<div class="music-article-btn music-article-btn-normal music-article-btn-{genreKey}">',
                            '<div class="music-article-button music-article-button-listen"></div>',
                        '</div>',

//                        '<div class="music-article-image-overlay">',
//                            '<div class="music-article-header">',
//                                '<div class="music-article-button music-article-button-listen">Listen</div>',
//                                '<div class="music-article-button music-article-button-favorite">Favorite</div>',
//                                '<div class="music-article-button music-article-button-tweet">Share</div>',
//                            '</div>',
//                        '</div>',
                    '</div>'
                ].join('')
            },
            {
                xtype       : 'container',
                itemId      : 'carousel',
                cls         : 'article-carousel',
                docked      : 'bottom',
                height      : 150,
                imgDim      : 200,
                scrollable : {
                    direction     : 'horizontal',
                    directionLock : true,
                    hideIndicator : true
                },
                tpl         : [
                    '<tpl for=".">',
                        '<div class="article-carousel-tap-target global-toc-genre-item" data-id="{id}">',
                            '<div class="article-carousel-image article-carousel-image-{genreKey}" style="background-image:url(http://src.sencha.io/200/{image})"></div>',
                        '</div>',
                    '</tpl>'
                ].join(''),
                items : {
                    xtype  : 'component',
                    itemId : 'carousel-title',
                    docked : 'top',
                    tpl    : '<div class="article-carousel-title article-carousel-title-{genreKey}">More {genre}</div>'

                }
            }
        ]
    },

    initialize : function(){
        var me = this,
            renderEl = me.renderElement,
            bodyWidth = document.body.clientWidth;


        // 8.9"
        if (bodyWidth >= 800) {
            me.down('#articleHeader').setHeight(400);
            me.down('#carousel').setHeight(200);

        }
        else {
            me.down('#carousel').setHeight(120);

        }

        me.callParent();

        renderEl.on({
            scope      : me,
            tap        : me.onTap,
            touchstart : me.onPress,
            touchend   : me.onRelease
        });

        me.articleTitle = renderEl.down('.music-article-image');

//        me.populateGenreArticles();
    },

    onPress   : function(event){
        var btn = event.getTarget('.music-article-btn');

        if (btn) {
            this.pressing = btn = Ext.get(btn);
            btn.removeCls('music-article-btn-normal');
            btn.addCls('music-article-btn-pressed-' +  this.getData().genreKey);
        }
    },

    onRelease : function(event){
        var me = this,
            pressing = me.pressing;
        if (pressing){
            pressing.removeCls('music-article-btn-pressed-' + me.getData().genreKey);
            pressing.addCls('music-article-btn-normal');

            delete me.pressing;
        }
    },

    onTap   : function(event){

        var me = this,
//            isFavButton = event.getTarget('.music-article-button-favorite') || event.getTarget('.music-article-button-favorite-added'),
            isArticle = event.getTarget('.global-toc-genre-item'),
            allArticles,
            articleIndex,
            articleRecord,
            articleData,
            id;

//        debugger;

        if (event.getTarget('.music-article-button-listen')) {
            return me.fireEvent('play', me.getData());
        }
        else if (isArticle) {
//            debugger;
            id = isArticle.getAttribute('data-id');
            allArticles = me.getGenreRecord().data.articles;
            articleIndex = allArticles.find('id', id);
            articleRecord = allArticles.getAt(articleIndex);
            articleData = articleRecord.data;

            me.updateHtmlStuff(articleData);
        }

//        else if (isFavButton) {
//            return me.fireEvent('favorite', me, model, isFavButton);
//        }
//        else if (event.getTarget('.music-article-button-tweet')) {
//            return me.fireEvent('tweet', me, model);
//        }
//        else if (event.getTarget('.music-article-button-toc')) {
//            return me.fireEvent('toc', me, model);
//        }
    },

    applyModel : function(model) {
        var me            = this,
            modelData     = model.getData(),
            genreRecord   = me.getGenreRecord(),
            carousel      = me.down('#carousel'),
            carouselTitle = me.down('#carousel-title'),
            articles      = [];

        genreRecord.data.articles.each(function(article, index) {
            articles[index] = article.data;
        });

        carouselTitle.setData(articles[0]);
        carousel.setData(articles);

        me.updateHtmlStuff(modelData);
        return model;
    },

    updateHtmlStuff : function(modelData) {
        var me     =  this,
            header = me.down('component#articleHeader');

        me.down('#carousel-title').setData(modelData);
        me.down('component#articleHeader').setData(modelData);
        me.setData(modelData);
    }
});