/**
 * @class Music.view.Article
 * @extends Ext.Component
 * @author Dave Ackerman
 *
 * The article view
 */

Ext.define('Music.view.Article', {
    extend: 'Ext.Component',
    alias : 'widget.article',
    config : {
    	cls: 'music-article-fullview',
	    tpl : [
	    	'<div class="music-article">',
	    		'<div class="image">',
	    			'<div class="title"></div>',
	    		'</div>',
	    		'<div class="controls">Here is where the article text goes</div>',
	    		'<div class="text"></div>',
	    	'</div>'
	    ],
	    data : {}  	
    },

    initialize   : function() {
        var me = this;
        me.callParent();

    }
});