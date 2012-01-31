/**
 * @class Music.view.Category
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa
 *
 * Description
 */
Ext.define('Music.view.Genre',{
	extend	: 'Ext.carousel.Carousel',
	alias	: 'widget.genrecarousel',

	config	: {
		indicator	: true,
		ui			: 'light',
		model		: null,
		store		: null
	},

	initialize	: function(){
		var me = this;

		me.callParent();
		me.setCls('music-genre-'+me.getModel().get('key'));
		
		me.getStore().each(function(article){
			if(article.get('image')){
				var data = article.getData();
				me.add({
					xtype	: 'articlepreview',
					model	: article,
					data	: data,
					topic	: me.getModel()
				});
			}
		});
	}
});