/**
 * @class Music.view.GlobalToc
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The global table of content
 */

Ext.define('Music.view.GlobalToc', {
    extend : 'Ext.Container',
    xtype  : 'globaltoc',

    requires : [
        'Music.view.Slidousel'
    ],

    config : {
        first           : true,
        featuredArticle : null,
        cls             : 'global-toc',
        layout          : 'vbox',
        items           : [
            {
                xtype  : 'component',
                itemId : 'featuredstory',
                cls    : 'global-toc-featured-story',
                flex   : 1,
                tpl    : [
                    '<div class="global-toc-tap-target global-toc-featured-image-{genreKey}" data-id="{id}" style="background-image:url(http://src.sencha.io/600/{image})">',
                        '<h2>{genre}</h2>',
                        '<h3 class="global-toc-title">{title}</h2>',
                    '</div>'
                ]
            },
            {
                xtype      : 'slidousel',
                itemId     : 'genres'
            }
        ],

        control : {
            slidousel : {
                itemtouchstart : 'onTouchStart',
                itemtouchend   : 'onTouchEnd'
            }
        }
    },

    addGenres : function(articleRecords) {
        var me          = this,
            container   = me.down('#genres'),
            rawGenres   = [],
            tocArticles = [];

        Ext.each(articleRecords, function(genreRecord) {
            rawGenres.push(genreRecord.data);
            tocArticles.push(genreRecord.data.data.story[0]);
        });

        console.log('rawGenres', rawGenres);
        container.setData(tocArticles);
    },

    setFeatured : function(model) {
        var me = this,
            featured = me.down('#featuredstory'),
            data = model.getData();

        data.text = Ext.util.Format.ellipsis(data.text, 300, true).replace(/<(\/)?p>/g, ' ');
        featured.setData(data);
        me.setFeaturedArticle(model);
    },

    onTouchStart : function(carousel, id, event) {
        var target      = event.getTarget(),
            highlightEl = Ext.fly(target).down('.global-toc-title');

        this.pressing = highlightEl;
        Ext.fly(highlightEl).addCls('global-toc-article-pressed');
    },

    onTouchEnd : function() {
        Ext.fly(this.pressing).removeCls('global-toc-article-pressed');
        delete this.pressing;
    }
});