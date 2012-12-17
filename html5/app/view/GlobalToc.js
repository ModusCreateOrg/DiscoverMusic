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
                    '<div class="global-toc-featured-image" style="background-image:url(http://src.sencha.io/600/{image})">',
                        '<h2 >{genre}</h2>',
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
                        '<div class="global-toc-genre-item global-toc-genre-{genreKey}">',
                            '<div class="global-toc-genre-image" data-id="{id}" style="background-image:url(http://src.sencha.io/350/{image.src})">',
                                '<h2>{genre}</h2>',
                                '<h3>{title}</h3>',
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
//        console.log('addGenre', articleRecords);
        var me          = this,
            container   = me.down('#genres'),
            rawGenres   = [],
            tocArticles = [];

//        Ext.each(range, function(article) {
//            list.push(article.getData());
//        });

        Ext.each(articleRecords, function(genreRecord) {
//            debugger;
            rawGenres.push(genreRecord.data);
            tocArticles.push(genreRecord.data.data.story[0]);
        });

//        debugger;
        console.log('rawGenres', rawGenres);
        container.setData(tocArticles)

//        var component = {
//            xtype : 'component',
//            cls   : 'global-toc-genre-' + genre.get('key'),
//            data  : {
//                genre    : Ext.apply(genre.getData(), rawGenres.getAt(0).getData()),
//                rawGenres : list
//            },
//            tpl   :
//        };

//        container.add(component);
    },

    setFeatured : function(model) {
//        debugger;
//        debugger;
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
            tap        : 'onTap',
            touchstart : 'onTouchStart',
            touchend   : 'onTouchEnd'
        });
    },

    onTouchStart : function(event, node) {
        this.pressing = node;
        Ext.fly(node).addCls('global-toc-article-pressed');
    },

    onTouchEnd : function() {
        Ext.fly(this.pressing).removeCls('global-toc-article-pressed');
        delete this.pressing;
    },

    onTap : function(event) {

        var me = this,
            eventTarget = event.target,
            el,
            id;

        if (event.getTarget('.global-toc-featured-image')) {
            return me.fireEvent('storytap', me.getFeaturedArticle());
        }

        if (event.getTarget('.global-toc-article')) {
            el = Ext.get(event.getTarget('.global-toc-article'));
            id = +el.getAttribute("data-id");

            return me.fireEvent('storytap', id);
        }

        if (event.getTarget('.global-toc-genre-image')) {
            el = Ext.get(event.getTarget('.global-toc-genre-image'));
            id = +el.getAttribute("data-id");

            return me.fireEvent('storytap', id);
        }

        if (eventTarget.tagName == 'SPAN') {
            me.fireEvent('anchortap', eventTarget.getAttribute('data-href'));
        }
    }
});