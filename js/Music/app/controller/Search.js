/**
 * @class Music.controller.Search
 * @extends Ext.app.Controller
 * @author Dave Ackerman <dave@moduscreate.com>
 *
 * The Search controller
 */
Ext.define('Music.controller.Search', {
    extend: 'Ext.app.Controller',
    models: ['Article', 'Genre'],
    stores: ['Articles', 'Genres'],

    config  : {
        refs  : {

        },
        control : {
        
        },
    },

    init  : function() {
        var me = this;
    },

});