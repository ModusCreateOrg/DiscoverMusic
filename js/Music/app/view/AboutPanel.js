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
        width: 700,
        height: 700,
        items: [{
            html: '<h1>About Discover Music</h1>'
        },{
            html: 'Discover Music is built using Sencha Touch 2, an HTML5 mobile framework developed by Sencha, Inc.'
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