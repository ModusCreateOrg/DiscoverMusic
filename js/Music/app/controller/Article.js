/**
 * @class Music.controller.Article
 * @extends Ext.app.Controller
 * @author Crysfel Villa
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
            }
		}
    },

    init	: function() {
        
        Ext.Viewport.on('orientationchange',this.onOrientationChange,this);
      
    },

    onOrientationChange	: function(viewport,orientation){
		var me = this;
		me.getArticle().setCls(orientation);
    }
});