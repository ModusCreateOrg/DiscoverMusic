/**
 * @class Music.view.Search
 * @extends Ext.Panel
 * @author Dave Ackerman
 *
 * Search page view.
 */

Ext.define('Music.view.Search', {
    extend: 'Ext.Panel',
    alias : 'widget.search',
		xtype: 'search',
    selector: 'search',
    autoCreate: true
    config : {
    	items: [{
    		html: 'Controls',
    		width: 200
    	}, {
    		html: 'stories here',
    		flex: 1
    	}]
    },

    initialize   : function() {
        var me = this;
        me.callParent();
    }
});