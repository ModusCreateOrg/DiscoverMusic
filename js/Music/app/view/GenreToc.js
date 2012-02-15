/**
 * @class Music.view.GenreToc
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The genre table of content
 */

Ext.define('Music.view.GenreToc',{
    extend      : 'Ext.Container',
    alias       : 'widget.genretoc',

    config		: {
		html	: 'The genre TOC'
    },

    initialize   : function(){
        var me = this;
        
        me.callParent();
    }
});