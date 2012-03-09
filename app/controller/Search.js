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
        filters: Ext.create('Ext.util.MixedCollection'),
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
            },
            'mainflow search dataview toolbar searchfield' : {
                keyup: 'onSearchReturn'
            },
            'mainflow search checkboxfield' : {
                check   : 'addFilter',
                uncheck : 'removeFilter'
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
    },

    onSearchReturn : function(field,event){
        console.log(event);
    },

    addFilter   : function(checkbox){
        var me = this,
            dataview = me.getResults(),
            filters = me.getFilters();

        filters.add(checkbox.getName(),checkbox._value);
        me.filter(dataview,filters.getRange());
    },

    removeFilter   : function(checkbox){
        var me = this,
            dataview = me.getResults(),
            filters = me.getFilters();

        filters.remove(filters.getByKey(checkbox.getName()));
        me.filter(dataview,filters.getRange());
    },

    filter: function(dataview,genres){
        dataview.getStore().clearFilter();
        
        if(genres.length > 0){
            dataview.getStore().filterBy(function(record,id){
                return Ext.Array.contains(genres,record.get('genreKey'));
            });
        }
    }

});