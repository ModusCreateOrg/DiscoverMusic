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

    config : {
        first           : true,
        featuredArticle : null,
        cls             : 'global-toc',
        layout          : 'vbox',
        items           : [
            {
                xtype  : 'container',
                itemId : 'featuredstory',
                cls    : 'global-toc-featured-story',
                flex   : 1,
                data   : {},
                tpl    : [
                    '<div class="global-toc-tap-target global-toc-featured-image" data-id="{id}" style="background-image:url(http://src.sencha.io/600/{image})">',
                        '<h2>{genre}</h2>',
                        '<h3 class="global-toc-title">{title}</h2>',
                    '</div>'
                ]
            },
            {
                xtype      : 'container',
                itemId     : 'genres',
                cls        : 'global-toc-genre-container',
                height     : 409,
                scrollable : {
                    direction     : 'horizontal',
                    directionLock : true
                },
                tpl : [
                    '<tpl for=".">',
                        '<div class="global-toc-tap-target global-toc-genre-item global-toc-genre-{genreKey}" data-id="{id}">',
                            '<div class="global-toc-genre-image" style="background-image:url(http://src.sencha.io/350/{image.src})">',
                                '<h2>{genre}</h2>',
                                '<h3 class="global-toc-title">{title}</h3>',
                            '</div>',
                        '</div>',
                    '</tpl>'
                ]
            }
        ]
    },

    initialize : function() {
        var me = this;

        me.callParent();

        me.registerEvents();
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

    registerEvents : function() {
        var me = this,
            el = me.renderElement;

        el.on({
            scope      : me,
            touchstart : 'onTouchStart',
            touchend   : 'onTouchEnd',
            delegate   : '.global-toc-tap-target'
        });

        el.on({
            scope    : me,
            tap      : 'onTap',
            delegate : '.global-toc-tap-target'

        });
    },

    onTouchStart : function(event) {
        var target      = event.getTarget(),
            highlightEl = Ext.fly(target).down('.global-toc-title');

        this.pressing = highlightEl;
        Ext.fly(highlightEl).addCls('global-toc-article-pressed');
    },

    onTouchEnd : function() {
        Ext.fly(this.pressing).removeCls('global-toc-article-pressed');
        delete this.pressing;
    },

    onTap : function(event) {
        var me     = this,
            target = event.getTarget(),
            id     = +target.getAttribute("data-id");

        if (id) {
            me.fireEvent('storytap', id);
        }
    }
});