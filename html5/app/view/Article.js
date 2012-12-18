/**
 * @class Music.view.Article
 * @extends Ext.Container
 *
 * The full article view
 */

Ext.define('Music.view.Article', {
    extend : 'Ext.Container',
    alias  : 'widget.article',

    config : {
        model      : null,
        genre      : null,
        layout     : 'fit',
        baseCls        : 'music-article',
        scrollable : {
            cls           : Ext.baseCSSPrefix + 'scroll-view article-scroller',
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
                height : 280,
                docked: 'top',
                itemId: 'articleHeader',
                tpl: [
                    '<div class="music-article-image music-article-{genreKey}" style="background-image:url(http://src.sencha.io/600/{image});">',
                    '<div class="music-article-image-overlay">',
                        '<h2>{genre}</h2>',

                        '<div class="music-article-header music-article-header-portrait">',
                            '<div class="music-article-button music-article-button-listen">Listen to Story</div>',
                            '<div class="music-article-button music-article-button-favorite">Add to Favorites</div>',
                            '<div class="music-article-button music-article-button-tweet">Tweet Story</div>',
                        '</div>',
                    '</div>',
                '</div>'
                ].join('')
            },
            {
                xtype  : 'component',
                height : 250,
                docked: 'bottom',
                html: 'shit'
            }

        ]
    },

    initialize : function(){
        var me = this;

        me.callParent();

        me.renderElement.on({
            scope      : me,
            tap        : me.onTap,
            touchstart : me.onPress,
            touchend   : me.onRelease
        });
        me.articleTitle = me.renderElement.down('.music-article-image');

        me.initFading();
    },

    initFading: function () {
        var me = this,
            scrollView = me.getScrollable(),
            scroller = scrollView.getScroller();

        scrollView.getElement().insertHtml('beforeEnd', '<footer></footer>');

        scroller.on('scroll', me.onScroll, me);

    },

    /**
     * Remove fading when scroller close enough to bottom (lower 10px).
     * scroller.fadeRemoved flag is set for optimization purposes
     * view and element references are retrieved only when needed (point of enter/exit lower 10px)
     *
     * @param {Ext.scroll.Scroller} scroller
     * @param {Integer} x x-axis offset
     * @param {Integer} y y-axis offset, the one we are matching against
     * @return {*}
     */
    onScroll: function (scroller, x, y) {
        var view, element;
        if (scroller.maxPosition.y - y < 10 && scroller.fadeRemoved !== true) {
            view = this.getScrollable();
            element = view.getElement();
            scroller.fadeRemoved = true;
            return element.replaceCls('article-scroller', 'article-scroller-nofade');
        }

        if (scroller.maxPosition.y - y > 9 && scroller.fadeRemoved === true) {
            view = this.getScrollable();
            element = view.getElement();
            scroller.fadeRemoved = false; // deleting is more expensive than setting to false
            return element.replaceCls('article-scroller-nofade', 'article-scroller');
        }
    },

    onPress   : function(event){
        var btn = event.getTarget('.music-article-button');

        if (btn) {
            this.pressing = btn;
            Ext.fly(btn).addCls('music-article-button-pressed');
        }
    },

    onRelease : function(event){
        if (this.pressing){
            Ext.fly(this.pressing).removeCls('music-article-button-pressed');
            delete this.pressing;
        }
    },

    onTap   : function(event){
        var me = this,
            isFavButton = event.getTarget('.music-article-button-favorite') || event.getTarget('.music-article-button-favorite-added'),
            model = me.getModel();

        if (event.getTarget('.music-article-button-listen')) {
            return me.fireEvent('play', model);
        }
        else if (isFavButton) {
            return me.fireEvent('favorite', me, model, isFavButton);
        }
        else if (event.getTarget('.music-article-button-tweet')) {
            return me.fireEvent('tweet', me, model);
        }
        else if (event.getTarget('.music-article-button-toc')) {
            return me.fireEvent('toc', me, model);
        }
    },

    applyModel : function(model) {
        var me = this,
            header = me.down('component#articleHeader'),
            modelData = model.getData();

        me.setData(modelData);
        header.setData(modelData);

        return model;
    }
});