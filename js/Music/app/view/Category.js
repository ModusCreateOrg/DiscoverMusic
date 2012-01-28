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
		indicator	: true,
		ui			: 'light',
		topic		: null,
		store		: null
	},

	initialize	: function(){
		var me = this;

		me.callParent();

		me.getStore().each(function(article){
			if(article.get('image')){
				var data = article.getData();
				Ext.applyIf(data,me.getTopic().getData());
				me.add({
					xtype	: 'articlepreview',
					model	: article,
					data	: data,
					topic	: me.getTopic()
				});
			}
		});
	}
});