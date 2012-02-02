/**
 * @class Music.view.AboutPanel
 * @extends Ext.Panel
 * @author Dave Ackerman
 *
 * The "About" window which will pop up when we tap on the 'Discover Music' logo.
 */
Ext.define('Music.view.AboutPanel', {
    extend: 'Ext.Container',
    alias: 'widget.aboutpanel',
    config: {
        cls: 'music-about-panel',
        modal: true,
        centered : true,
        hideOnMaskTap: true,
        floating: true,
        hidden: true,
        width: 600,
        height: 500,
        items: [{
            html: '<h1>About Discover Music</h1>'
        },{
            html: '<p>Discover Music is built using Sencha Touch 2, an HTML5 mobile framework developed by Sencha, Inc.</p>' +
                  '<p>Discover Music was built by Modus Create, a hybrid application development company based out of Washington, DC.</p>' +
                  '<p>All content and audio clips are courtesy of NPR, and are accessed using their free and open public API’s.</p>'
        },{
            xtype: 'button',
            text: 'Donate to NPR',
            ui: 'action'
        },{
            xtype: 'button',
            text: 'Sencha Touch Website',
            ui: 'confirm'
        },{
            xtype: 'button',
            text: 'Modus Create Website',
            ui: 'normal'
        }]      
    },


    initialize: function () {
        var me = this;
        me.callParent();
    },

    showAboutPanel: function (event, node) {
        this.fireEvent("showAboutPanel", this.model);
    }

});