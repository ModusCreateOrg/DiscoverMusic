/**
 * @class Music.controller.Favorites
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */

Ext.define('Music.controller.Favorites', {
    extend : 'Ext.app.Controller',

    config : {
        refs    : {
            mainFlow : {
                xtype    : 'mainflow',
                selector : 'main mainflow'
            }
        },
        control : {
            'mainflow favorites' : {
                itemtap : 'onShowArticle'
            },

            'mainflow favorites button[action=edit]' : {
                tap : 'onEditTap'
            },

            'main toolbar button[action=favorites]' : {
                tap : 'onFavoriteTap'
            },

            'drawer' : {
                favoritestap : 'onFavoriteTap'
            }
        }
    },

    onFavoriteTap : function() {
        var me = this,
            mainFlow = me.getMainFlow(),
            fav = mainFlow.down('favorites');

        mainFlow.setActiveItem(fav);
    },

    onShowArticle : function(dataview, index, target, record, event) {
        var me = this,
            mainFlow = me.getMainFlow(),
            article = mainFlow.down('#article-' + record.get('articleId'));

        if (event.getTarget('.music-favorites-remove')) {
            var store = dataview.getStore();
            store.remove(record);
        } else {
            if(!article){
                article = mainFlow.add({
                    xtype   : 'article',
                    itemId  : 'article-'+record.get('articleId'),
                    model   : record,
                    data    : record.getData()
                });
            }
            mainFlow.setActiveItem(article);
        }
    },

    onEditTap : function() {
        var me = this,
            mainFlow = me.getMainFlow(),
            favorites = mainFlow.down('favorites'),
            btn = mainFlow.down('favorites button[action=edit]');

        if (favorites.getEditing()) {
            btn.setText('Edit');
            favorites.getStore().sync();
        } else {
            btn.setText('Done');
        }
        favorites.setEditing(!favorites.getEditing());

        me.setEditable(favorites.getStore(), favorites.getEditing());

    },

    setEditable : function(store, value) {
        store.each(function(fav) {
            fav.set('editable', value);
        });
    }

});