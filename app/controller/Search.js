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
            'main search dataview' : {
                itemtap : 'onArticleTap'
            },
            'main search dataview toolbar button[action=search]' : {
                tap : 'onSearchTap'
            },
            'main search dataview toolbar searchfield' : {
                keyup: 'onSearchReturn'
            },
            'main search checkboxfield' : {
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
            main = me.getMain(),
            article = main.down('#article-' + record.getId());

        if(!article){
            article = main.add({
                xtype   : 'article',
                itemId  : 'article-'+record.getId(),
                model   : record,
                data    : record.getData()
            });
        }
        main.setActiveItem(article);
    },

    onSearchReturn : function(field,event){
        if(event.event.which === 13){
            this.onSearchTap();
        }
    },

    filter   : function(checkbox){
        var me = this,
            checkboxs = Ext.ComponentQuery.query('main search fieldset checkboxfield'),
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