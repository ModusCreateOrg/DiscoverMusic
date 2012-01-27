/**
 * @class Music.view.Article
 * @extends Ext.Panel
 * @author Crysfel Villa
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
	    		'<div class="controls">HEre is some text</div>',
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