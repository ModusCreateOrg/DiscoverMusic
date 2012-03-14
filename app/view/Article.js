/**
 * @class Music.view.Article
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The full article view
 */

Ext.define('Music.view.Article', {
    extend: 'Ext.Container',
    alias : 'widget.article',

    config : {
		model		: null,
		genre		: null,
		layout		: 'hbox',
		scrollable	: false,
		cls			: 'music-article',
	    items		: [{
			xtype	: 'component',
			cls		: 'music-article-header',
			width	: 520,
			tpl		: [
				'<div class="music-article-header-image music-article-{genreKey}" style="background-image:url(http://src.sencha.io/487/{image});">',
					'<h1>{title}</h1>',
					'<h2>{genre}</h2>',
				'</div>',
				'<p>{teaser}</p>',
				'<div class="music-article-button music-article-button-listen">Listen to Story</div>',
				'<div class="music-article-button <tpl if="isFavorite">music-article-button-favorite-added <tpl else> music-article-button-favorite</tpl> ">Add to Favorites</div>',
				'<div class="music-article-button music-article-button-tweet">Tweet Story</div>',
				'<div class="music-article-button music-article-button-toc">Table of Contents</div>'
			]
	    },{
			xtype	: 'container',
			flex	: 1,
			scrollable: {
				direction: 'vertical',
				directionLock: true
			},
			cls		: 'music-article-container',
			items	: [{
				xtype	: 'component',
				cls		: 'music-article-content',
				tpl		: new Ext.XTemplate(
					'<div class="music-article-image music-article-{genreKey}" style="display:none;background-image:url(http://src.sencha.io/600/{image});">',
						'<h1>{title}</h1>',
						'<h2>{genre}</h2>',
					'</div>',
					'<h3>{author}</h3>',
					'<h4>{[ this.dateFormat(values.date) ]}</h4>',
					'{content}',{
						dateFormat : function(value){
							return Ext.util.Format.date(value,'F d,Y');
						}
					}
				)
			}]
	    }]
    },

    initialize : function(){
		var me = this;

		me.callParent();

		me.renderElement.on({
			scope      : me,
            tap        : me.onTap,
            touchstart : me.onPress,
            touchend   : me.onRelease
		});
		me.articleTitle = me.renderElement.down('.music-article-image');

		Ext.Viewport.on('orientationchange',me.onOrientationChange,me);
		Ext.Viewport.fireEvent('orientationchange',Ext.Viewport,Ext.Viewport.orientation);
    },

    onPress	: function(event){
		var me = this,
			btn = event.getTarget('.music-article-button');
        
        if (btn){
            Ext.fly(btn).addCls('music-article-button-pressed');
        }
    },

    onRelease : function(event){
		var me = this,
			btn = event.getTarget('.music-article-button');
        
        if (btn){
            Ext.fly(btn).removeCls('music-article-button-pressed');
        }
    },

    onTap   : function(event){
        var me = this;
        
        if (event.getTarget('.music-article-button-listen')){
            return me.fireEvent('play', me.getModel());
        }
        if (event.getTarget('.music-article-button-favorite') || event.getTarget('.music-article-button-favorite-added')){
            return me.fireEvent('favorite', me,me.getModel());
        }
        if (event.getTarget('.music-article-button-tweet')){
            return me.fireEvent('tweet', me,me.getModel());
        }
        if (event.getTarget('.music-article-button-toc')){
            return me.fireEvent('toc', me,me.getModel());
        }
    },

    applyModel	: function(model){
		var me = this,
			header = me.down('component[cls=music-article-header]'),
			content = me.down('component[cls=music-article-content]');

		header.setData(model.getData());
		content.setData(model.getData());
		
		return model;
    },

	onOrientationChange : function(viewport,orientation){
		var me = this,
			header = me.down('component[cls=music-article-header]');

		if(orientation === Ext.Viewport.PORTRAIT){
            header.hide();
            me.articleTitle.setStyle('display','block');
        }else{
            header.show();
            me.articleTitle.setStyle('display','none');
        }
    }
});