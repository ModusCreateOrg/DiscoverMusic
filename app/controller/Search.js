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
            },
            mainFlow : {
                selector : 'main mainflow'
            }
        },
        control : {
            'mainflow search dataview' : {
                itemtap : 'onArticleTap'
            },
            'mainflow search dataview toolbar button[action=search]' : {
                tap : 'onSearchTap'
            },
            'mainflow search dataview toolbar searchfield' : {
                keyup: 'onSearchReturn'
            },
            'mainflow search checkboxfield' : {
                check   : 'filter',
                uncheck : 'filter'
            }
        }
    },

    onSearchTap : function(){
        var me = this,
            dataview = me.getResults(),
            textfield = me.getQuery();

        dataview.getStore().load({
            params : {searchTerm:textfield.getValue()},
            callback: function(){
                me.filter();
            }
        });
    },

    onArticleTap : function(view,index,target,record){
        var me = this,
            mainFlow = me.getMainFlow(),
            article = mainFlow.down('#article-' + record.getId());

        if(!article){
            article = mainFlow.add({
                xtype   : 'article',
                itemId  : 'article-'+record.getId(),
                model   : record,
                data    : record.getData()
            });
        }
        mainFlow.setActiveItem(article);
    },

    onSearchReturn : function(field,event){
        if(event.event.which === 13){
            this.onSearchTap();
        }
    },

    filter   : function(checkbox){
        var me = this,
            checkboxs = Ext.ComponentQuery.query('mainflow search fieldset checkboxfield'),
            dataview = me.getResults(),
            filters = [];

        for(var i=0,len=checkboxs.length;i<len;i++){
            var chk = checkboxs[i];
            if(chk.getValue()){
                filters.push(chk._value);
            }
        }
        
        dataview.getStore().clearFilter();
        if(filters.length > 0){
            dataview.getStore().filterBy(function(record,id){
                return Ext.Array.contains(filters,record.get('genreKey'));
            });
        }
    }

});