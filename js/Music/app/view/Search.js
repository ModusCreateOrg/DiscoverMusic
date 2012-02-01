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
    autoCreate: true,
    config : {
    	layout: 'hbox',
    	items: [{
    		xtype: 'panel',
    		width: 270,
    		items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'Genre Filter'	    	
	    	},{
			    xtype: 'togglefield',
			    name: 'Rock / Pop / Folk',
			    label: 'Rock / Pop / Folk',
			    labelWidth: '60%'  		
			  },{
			    xtype: 'togglefield',
			    name: 'Jazz & Blues',
			    label: 'Jazz & Blues',
			    labelWidth: '60%'
    		},{
			    xtype: 'togglefield',
			    name: 'Classical',
			    label: 'Classical',
			    labelWidth: '60%'
    		},{
			    xtype: 'togglefield',
			    name: 'Hip-Hop / R&B',
			    label: 'Hip-Hop / R&B',
			    labelWidth: '60%'
    		},{
			    xtype: 'togglefield',
			    name: 'World',
			    label: 'World',
			    labelWidth: '60%'
    		}]
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