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
                selector : 'main search'
            },
            results: {
                selector : 'main search dataview'
            },
            query : {
                selector : 'main search searchfield'
            },
            main : {
                selector : 'main main'
            }
        },
        control : {
            'main search dataview toolbar button[action=search]' : {
                tap : 'onSearchTap'
            },
            'main search dataview toolbar searchfield' : {
                keyup: 'onSearchReturn'
            },
            'main search checkboxfield' : {
                check   : 'onSearchTap',
                uncheck : 'onSearchTap'
            }
        }
    },

    onSearchTap : function(){
        var me = this,
            dataview = me.getResults(),
            textfield = me.getQuery(),
            checkboxes = Ext.ComponentQuery.query('main search fieldset checkboxfield'),
            genreIds = [],
            i = 0,
            len=checkboxes.length,
            cb;

        for(; i < len; i++){
            cb = checkboxes[i];
            if(cb.getValue()){
                genreIds.push(cb._value);
            }
        }


        dataview.getStore().load({
            params : {
                searchTerm : textfield.getValue(),
                genres : genreIds.toString()
            }
        });
    },

    onSearchReturn : function(field,event){
        if(event.event.which === 13){
            this.onSearchTap();
        }
    }
});