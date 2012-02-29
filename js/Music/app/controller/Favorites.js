/**
 * @class Music.controller.Favorites
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */

Ext.define('Music.controller.Favorites',{
    extend      : 'Ext.app.Controller',

    config		: {
		refs	: {
			mainFlow : {
                xtype: 'mainflow',
                selector: 'home mainflow'
            }
		},
		control : {
			"mainflow favorites" : {
				itemtap : 'onShowArticle'
			},
			'home toolbar button[action=favorites]': {
                tap     : 'onFavoriteTap'
            },
            'drawer'  : {
                favoritestap  : 'onFavoriteTap'
            }
		}
    },

    onFavoriteTap	: function(){
		var me = this,
            mainFlow = me.getMainFlow(),
            fav = mainFlow.down('favorites');

        mainFlow.setActiveItem(fav);
    },

    onShowArticle: function(dataview,index,target,record) {
        var me = this,
            mainFlow = me.getMainFlow(),
            article = mainFlow.down('#article-'+record.get('articleId'));
console.log(record.get('articleId'));
        mainFlow.setActiveItem(article);
    }
    
});