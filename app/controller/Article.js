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
            player   : {
                selector : 'main player'
            },
            mainFlow : {
                xtype    : 'mainflow',
                selector : 'main mainflow'
            }
        },
        control : {
            'article' : {
                play     : 'playSong',
                favorite : 'onAddToFavorites',
                toc      : 'onGenreToc'
            }
        }
    },

    playSong : function(model) {
        var me = this;

        if (model.get('audioFile')) {
            me.getPlayer().setData(model.getData());
            me.getPlayer().loadSound(model.get('audioFile'));
            me.getPlayer().show({ type : 'fade' });
        }
    },

    onAddToFavorites : function(view, model) {
        var me = this,
            favorites = Ext.data.StoreManager.lookup('favorites'),
            fav = model.copy();

        fav.set('articleId', model.getId());
        favorites.add(fav);
        favorites.sync();

        Ext.Msg.alert('Alert', 'Added to your favorites!');
    },

    onGenreToc : function(article, model) {
        var mainFlow = this.getMainFlow(),
            toc = mainFlow.down('#' + model.get('genreKey'));

        mainFlow.setActiveItem(toc);
    }
});