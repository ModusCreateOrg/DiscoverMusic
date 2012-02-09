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
    stores: ['Articles', 'Genres'],

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

        me.getPlayer().setData(model.getData());
    },

    onHideArticle   : function(){
        this.getPlayer().hide();
    },

    onShowArticle   : function(){
        this.getPlayer().show();
    }
});