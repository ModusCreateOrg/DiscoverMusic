/**
 * @class Music.controller.Search
 * @extends Ext.app.Controller
 * @author Dave Ackerman <dave@moduscreate.com>
 *
 * The Search controller
 */
Ext.define('Music.controller.Search', {
    extend: 'Ext.app.Controller',

    config  : {
        models: ['Article', 'Genre'],
        stores: ['Articles', 'Genres','Search'],
        refs  : {
            search : {
                selector : 'mainflow search'
            },
            results: {
                selector : 'mainflow search dataview'
            },
            query : {
                selector : 'mainflow search searchfield'
            }
        },
        control : {
            'mainflow search dataview toolbar button[action=search]' : {
                tap : 'onSearchClick'
            }
        }
    },

    onSearchClick : function(){
        var me = this,
            dataview = me.getResults(),
            textfield = me.getQuery();

        dataview.getStore().load({
            params : {searchTerm:textfield.getValue()}
        });
    }

});