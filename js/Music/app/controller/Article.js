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
			article : {
                selector: 'article'
            },
            player  : {
                selector: 'home player'
            }
		},
        control : {
            'article controls'  : {
                play    : 'playSong'
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

    playSong        : function(){
        var me = this,
            model = me.getArticle().getModel();

        if(model.get('audioFile')){
            me.getPlayer().setData(model.getData());
            me.getPlayer().loadSound(model.get('audioFile'));
        }
    },

    onHideArticle   : function(){
        this.getPlayer().hide();
    },

    onShowArticle   : function(){
        var me = this,
            model = me.getArticle().getModel();

        if(model.get('audioFile')){
            me.getPlayer().show();
        }
    }
});