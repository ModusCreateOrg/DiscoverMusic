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
    		cls: 'genre-filters',
    		items: [{
            xtype: 'toolbar',
            title: 'Genre Filter',
            docked: 'top',
	    	},{
			    xtype: 'togglefield',
			    name: 'rockPopFolk',
			    cls: 'rockPopFolk',
			    label: 'Rock / Pop / Folk',
			    labelWidth: '60%'  		
			  },{
			    xtype: 'togglefield',
			    name: 'jazzBlues',
			    cls: 'jazzBlues',
			    label: 'Jazz & Blues',
			    labelWidth: '60%'
    		},{
			    xtype: 'togglefield',
			    name: 'classical',
			    cls: 'classical',
			    label: 'Classical',
			    labelWidth: '60%'
    		},{
			    xtype: 'togglefield',
			    name: 'hipHopRB',
			    cls: 'hipHopRB',
			    label: 'Hip-Hop / R&B',
			    labelWidth: '60%'
    		},{
			    xtype: 'togglefield',
			    name: 'world',
			    cls: 'world',
			    label: 'World',
			    labelWidth: '60%'
    		}]
    	}, {
    		flex: 1,
    		items: [{
    			xtype: 'searchfield',
					label: 'Search Arists, Titles, etc.',
					autoCapitalize: false,
					placeHolder: 'Search Arists, Titles, etc.',
					name: 'query'    			

    		}]

    	}]
    },

    initialize   : function() {
        var me = this;
        me.callParent();
    }
});