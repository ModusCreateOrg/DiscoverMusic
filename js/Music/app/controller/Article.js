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

    init	: function() {
        var me = this;
        
        
    },

    playSong        : function(view,model){
        var me = this;

        if(model.get('audioFile')){
            me.getPlayer().setData(model.getData());
            me.getPlayer().loadSound(model.get('audioFile'));
        }
    },

    onAddToFavorites  : function(view,model){
        var me = this,
            favorites = Ext.data.StoreManager.lookup('favorites');
        
        favorites.add(model.copy());
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