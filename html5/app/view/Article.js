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
        layout     : {
            type  : 'vbox',
            align : 'stretch'
        },
        cls        : 'music-article',
        items      : [
            {
                xtype      : 'component',
                cls        : 'music-article-content',
                itemId     : 'article-content',
                flex       : 1,
                scrollable : {
                    direction     : 'vertical',
                    directionLock : true
                },
                tpl        : new Ext.XTemplate(
                    '<div class="music-article-image music-article-{genreKey}" style="background-image:url(http://src.sencha.io/600/{image});">',
                        '<div class="music-article-image-overlay">',
                            '<h2>{genre}</h2>',

                            '<div class="music-article-header music-article-header-portrait">',
                                '<div class="music-article-button music-article-button-listen">Listen to Story</div>',
                                '<div class="music-article-button music-article-button-favorite">Add to Favorites</div>',
                                '<div class="music-article-button music-article-button-tweet">Tweet Story</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<article>',
                        '<h1>{title}</h1>',
                        '<h4>{[ this.dateFormat(values.date) ]}</h4>',
                        '{text}',
                    '</article>',
                    {
                        dateFormat : function(value){
                            return Ext.util.Format.date(value,'F d, Y');
                        }
                    }
                )
            },

            {
                xtype  : 'component',
                html   : 'shit',
                height : 250
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
            modelData = model.getData();

        me.down('component#article-content').setData(modelData);

        return model;
    }
});