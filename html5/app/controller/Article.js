/**
 * @class Music.controller.Article
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The Article controller
 */
Ext.define('Music.controller.Article', {
    extend : 'Ext.app.Controller',

    config : {
        models  : [
            'Article',
            'Genre'
        ],
        stores  : [
            'Articles',
            'Genres',
            'Favorites'
        ],
        refs    : {
            main : {
                selector : 'main'
            }
        },
        control : {
            article : {
                play     : 'onPlay',
                favorite : 'onFavorite',
                toc      : 'onToc',
                tweet    : 'onTweet'
            },
            main: {
                activeitemchange: 'fixFading'
            }
        }
    },

    /**
     * Due to a WebKit bug, absolutely positioned layers get reshuffled after transition
     * On any CSS property reset will the right order get fixed
     * @param carousel
     * @param card
     */
    fixFading: function (carousel, card) {
        var footer;
        if (card instanceof Music.view.Article) {
            footer = card.element.down('.x-scroll-view footer');
            if (footer) {
                footer.setStyle('font-weight', 'bold');
                // style re-set needs to get out of the execution loop in order for it to be applied
                Ext.defer(function () {footer.setStyle('font-weight', 'normal');}, 1);
            }
        }
    },

    onPlay : function(model) {
        this.getApplication().fireEvent('playAudio', model.getData());
    },

    onFavorite : function(view, model, el) {
        var me = this,
            favorites = Ext.data.StoreManager.lookup('favorites'),
            story = favorites.find('articleId', model.getId());


        // if the article doesn't exist in the favorites store let's add it
        if (story === -1) {
            var fav = model.copy();
            fav.set('articleId', model.getId());
            favorites.add(fav);
            me.setEditable(favorites, false);
            fav.commit();
            Ext.fly(el).replaceCls('music-article-button-favorite','music-article-button-favorite-added');
        }
        else {
            //if the article exist we need to remove it
            me.setEditable(favorites, false);
            favorites.remove(favorites.getAt(story));

            Ext.fly(el).replaceCls('music-article-button-favorite-added','music-article-button-favorite');
        }
    },

    onToc : function(view, model) {
        var main = this.getMain(),
            toc = main.down('#' + model.get('genreKey'));

        main.setActiveItem(toc);
    },

    onTweet : function(view, model) {
        var me = this;

        if (!me.overlay) {
            me.overlay = Ext.Viewport.add({
                xtype         : 'panel',
                modal         : true,
                hideOnMaskTap : true,
                centered      : true,
                width         : 500,
                height        : 220,
                padding       : 20
            });
            me.body = me.overlay.renderElement.down('.x-inner');
        }

        if (me.body.dom.hasChildNodes()) {
            var dom = me.body.dom;
            while (dom.childNodes.length >= 1) {
                Ext.removeNode(dom.firstChild);
            }
        }

        twttr.anywhere(function(T) {
            T(me.body.dom).tweetBox({
                height         : 100,
                width          : 450,
                label          : 'Share this story',
                defaultContent : model.get('title') + ' ' + document.URL + ' via Discover Music @ModusCreate',
                onTweet        : Ext.Function.bind(me.onTweetResponse, me)
            });
        });
        me.overlay.show();
    },

    setEditable : function(store, value) {
        store.each(function(f) {
            f.set('editable', value);
        });
    },

    onTweetResponse : function(text, html) {
        this.overlay.hide();
    }
});