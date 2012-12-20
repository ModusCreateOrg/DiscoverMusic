/**
 * @class Music.view.GlobalToc
 * @extends Ext.Container
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
                height : 545,
                tpl    : [
                    '<div class="global-toc-tap-target global-toc-featured-image-{genreKey}" data-id="{id}" style="background-image:url(http://src.sencha.io/600/{image})">',
                        '<h2>{genre}</h2>',
                        '<h3 class="global-toc-title">{title}</h2>',
                    '</div>'
                ]
            },
            {
                xtype  : 'slidousel',
                itemId : 'genres',
                height : 175
            }
        ],

        control : {
            slidousel : {
                itemtouchstart : 'onTouchStart',
                itemtouchend   : 'onTouchEnd'
            }
        }
    },

    initialize : function() {
        var bodyWidth     = document.body.clientWidth,
//            bodyHeight    = document.body.clientHeight,
            featuredStory = this.down('#featuredstory'),
            carousel      = this.down('#genres');

        // 8.9"
        if (bodyWidth == 800) {
            featuredStory.setHeight(835);
            carousel.setHeight(300);
        }

        this.callParent(arguments);

        this.element.on({
            delegate : '.global-toc-tap-target',
            scope    : this,
            tap      : this.onElementTap
        });
    },

    addGenres : function(articleRecords) {
        var me          = this,
            genres      = me.down('#genres'),
//            rawGenres   = [],
            tocArticles = [];

//        debugger;
        Ext.each(articleRecords, function(genreRecord) {
//            rawGenres.push(genreRecord.data);
            tocArticles.push(genreRecord.data.data.story[0]);
        });

        console.log('tocArticles', tocArticles);
        genres.setData(tocArticles);
    },

    setFeatured : function(model) {
        var me = this,
            featured = me.down('#featuredstory'),
            data = model.getData();

        data.text = Ext.util.Format.ellipsis(data.text, 300, true).replace(/<(\/)?p>/g, ' ');

        featured.setData(data);
        me.setFeaturedArticle(model);
    },

    onElementTap : function(event) {
        var id = event.getTarget().getAttribute('data-id');
        this.fireEvent('storytap', id);

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