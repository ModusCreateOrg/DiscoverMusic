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
            main : {
                xtype    : 'main'
            }
        },
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
        var me = this,
            main = me.getMain(),
            article = main.down('#article-' + record.get('articleId'));

        if (event.getTarget('.music-favorites-remove')) {
            var store = dataview.getStore();
            store.remove(record);
        } else {
            if(!article){
                article = main.add({
                    xtype   : 'article',
                    itemId  : 'article-'+record.get('articleId'),
                    model   : record,
                    data    : record.getData()
                });
            }
            main.setActiveItem(article);
        }
    },

    onEditTap : function() {
        var me = this,
            main = me.getMain(),
            favorites = main.down('favorites'),
            btn = main.down('favorites button[action=edit]');

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