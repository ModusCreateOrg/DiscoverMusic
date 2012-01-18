/**
 * @class Music.view.ArticlePreview
 * @extends Ext.Panel
 * @author Crysfel Villa
 *
 * The article view
 */

Ext.define('Music.view.ArticlePreview',{
	extend      : 'Ext.Panel',
	alias       : 'widget.articlepreview',
	
	config		: {
		flex	: 1,
		cls		: 'music-article-preview',
		tpl		: [
			'<div class="music-article-image" style="background-image:url(http://src.sencha.io/1024/{image});">',
				'<div class="music-article-category"><h1>{category}</h1></div>',
				'<div class="music-article-title"><div class="music-article-read">Read & Listen</div><h2>{title}</h2></div>',
			'</div>'
		]
	},

	initialize   : function(){
		var me = this;

		console.log(me.topic);
		me.setData(me.model.data);
        

		me.callParent();
		
	}
});