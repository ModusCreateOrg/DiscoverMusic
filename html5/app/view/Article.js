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
        slidousel   : {
            docked      : 'bottom',
            height      : 150,
            imgDim      : 200,
            showGenre   : false,
            showTitle   : false
        },
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
            }
        ]
    },

    initialize : function(){
        var me = this;

        me.callParent();

        me.add(me.getSlidousel());

        me.renderElement.on({
            scope      : me,
            tap        : me.onTap,
            touchstart : me.onPress,
            touchend   : me.onRelease
        });
        me.articleTitle = me.renderElement.down('.music-article-image');

        me.populateGenreArticles();
    },

    populateGenreArticles: function () {
        var articleStore = this.getGenreRecord().get('articles'),
            carousel = this.down('slidousel'),
            data = [];

        articleStore.each(function (rec) {
            data.push({
                id       : rec.get('id'),
                genreKey : rec.get('genreKey'),
                title    : rec.get('title'),
                image    : {
                    src : rec.get('image')
                }
            });
        });

        carousel.setData(data);
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
    },

    applySlidousel: function (val, old) {
        if (Ext.isObject(val)) {
            var rec = this.getGenreRecord();
            val.sectionGenre = {
                key : rec.get('key'),
                name: rec.get('name')
            }
        }
        return Ext.factory(val, 'Music.view.Slidousel', old);
    }
});