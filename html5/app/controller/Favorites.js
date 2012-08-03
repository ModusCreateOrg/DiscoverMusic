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
        control : {
            'main favorites' : {
                itemtap : 'onShowArticle'
            },

            'main favorites button[action=edit]' : {
                tap : 'onEditTap'
            }
        }
    },


    onShowArticle : function(dataview, index, target, record, event) {
        var me = this;

        if (event.getTarget('.music-favorites-remove')) {
            var store = dataview.getStore();
            store.remove(record);
        }
        else {
            me.getApplication().fireEvent('showarticle', record);
        }
    },

    onEditTap : function(btn) {
        var me = this,
            favorites = btn.up('favorites');

        if (favorites.getEditing()) {
            btn.setText('Edit');
            favorites.getStore().sync();
        }
        else {
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