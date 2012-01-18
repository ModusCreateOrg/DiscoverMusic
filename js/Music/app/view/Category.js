/**
 * @class Music.view.Category
 * @extends Ext.carousel.Carousel
 * @author Crysfel Villa
 *
 * Description
 */
Ext.define('Music.view.Category',{
	extend	: 'Ext.carousel.Carousel',
	alias	: 'widget.category',

	config	: {
		indicator	: false
	},

	initialize	: function(){
		var me = this;

		me.store.each(function(article){
			if(article.get('image')){
				me.add({
					xtype	: 'articlepreview',
					model	: article
				});
			}
		});

		me.callParent();
	}
});