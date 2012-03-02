/**
 * @class Music.controller.Article
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The Article controller
 */
Ext.define('Music.controller.Article', {
    extend: 'Ext.app.Controller',
    models: ['Article', 'Genre'],
    stores: ['Articles', 'Genres','Favorites'],

    config	: {
		refs	: {
            player  : {
                selector: 'home player'
            }
		},
        control : {
            'article controls'  : {
                play    : 'playSong',
                favorite: 'onAddToFavorites'
            },
            'article' : {
                show    : 'onShowArticle',
                hide    : 'onHideArticle'
            }
        }
    },

    playSong        : function(model){
        var me = this;

        if(model.get('audioFile')){
            me.getPlayer().setData(model.getData());
            me.getPlayer().loadSound(model.get('audioFile'));
            me.getPlayer().show({ type: 'fade' });
        }
    },

    onAddToFavorites  : function(view,model){
        var me = this,
            favorites = Ext.data.StoreManager.lookup('favorites'),
            fav = model.copy();
        

        fav.set('articleId',model.getId());
        favorites.add(fav);
        favorites.sync();

        Ext.Msg.alert('Alert','Added to your favorites!');
    },

    onHideArticle   : function(){
        this.getPlayer().hide();
    },

    onShowArticle   : function(view,model){
        var me = this;
            
        if(model.get('audioFile')){
            me.getPlayer().show();
        }
    }
});