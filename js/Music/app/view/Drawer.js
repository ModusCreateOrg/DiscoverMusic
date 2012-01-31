/**
 * @class Music.view.Drawer
 * @extends Ext.Container
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Shows the navigation to other genre
 */

Ext.define('Music.view.Drawer', {
    extend: 'Ext.Container',
    alias: 'widget.drawer',

    config  : {
        // top docked button that closes the drawer
        drawerPull      : true,
        store           : 'Music.store.Genres',
        closed          : true,
        indicator       : false,
        docked          : 'bottom',
        scrollable      : {direction: 'horizontal'},
        height          : 230,
        left            : 0,
        cls             : 'drawer-body'
    },

    initialize  : function(){
        var me = this;

        me.callParent();

        me.add(me.getDrawerPull());
        
        me.registerEvents();

        if(me.getClosed()){
            me.close();
        }else{
            me.open();
        }

        Ext.Viewport.on('orientationchange', me.reDraw, me);
    },

    applyStore  : function(store){
        if(Ext.isString(store)){
            return Ext.create(store);
        }
        return store;
    },

    applyDrawerPull : function(config){
        if (config === true) {
            config = {
                docked  : 'top',
                html    : 'Browse Genre',
                cls     : 'drawer-close'
            };
        }
        return Ext.factory(config, Ext.Component, this.getDrawerPull());
    },

    registerEvents: function() {
        var me          = this,
            el          = me.renderElement;

        el.on('tap', me.onTap, me);
    },

    onTap: function(ev) {
        var me = this;
        if (ev.getTarget('.drawer-home')){
            return this.fireEvent('gohome', this);
        }
        if (ev.getTarget('.drawer-about')){
            return this.fireEvent('goabout', this);
        }
        if (ev.getTarget('.drawer-close')){
            return me.toggle();
        }
    },

    onPageTap   : function(event){
        var me = this,
            page    = Ext.get(event.getTarget('.drawer-page')),
            id = parseInt(page.getAttribute("data-id"),10),
            genre = me.getStore().getById(id),
            anim    = Ext.Function.createSequence(me.showPageAnim(page), me.hidePageAnim(page), me);

        if (page){ anim();}

        me.fireEvent('itemclick',id,genre);
    },

    toggle: function(state, suppressEvent) {
        var me      = this,
            closed  = me.getClosed();

        if (!Ext.isBoolean(state)){ state=undefined;}

        state = state === undefined ? !closed: !!state;
        
        if (state !== closed) {
            if (me.rendered) {
                me[state ? 'close': 'open']();
            }

            if (!suppressEvent) {
                me.fireEvent('toggle', me, state);
                Ext.callback(me.toggleHandler, me.scope || me, [me, state]);
            }
        }
        return me;
    },

    close       : function(hide){
        var me      = this,
            el      = me.renderElement,
            vpHeight= Ext.Viewport.renderElement.getHeight(),
            button  = el.down('.drawer-close > div');

        me.setTop( vpHeight - 40);

        button.addCls('drawer-open-pull');

        if (hide) {
            this.hide();
        }
        
        me.setClosed(true);
    },

    open: function() {
        var me      = this,
            el      = me.renderElement,
            height  = me.getHeight(),
            vpHeight= Ext.Viewport.renderElement.getHeight(),
            button  = el.down('.drawer-close > div');

        me.setTop( vpHeight - height );

        button.removeCls('drawer-open-pull');

        me.setClosed(false);
    },

    reDraw: function() {
        var me = this;
        return me.getClosed() ? me.close() : me.open();
    },

    /**
     * Using body width and page sample/icon width, etc, calculate max articles per carousel card
     */
    getMaxPagesPerCard: function() {
        return (Ext.Viewport.getOrientation() == 'portrait')?5:70;
    },

    addArticles   : function() {
        var me      = this,
            store   = me.getStore(),
            maxPg   = me.getMaxPagesPerCard(),
            cards   = [],
            n       = 0,
            card,
            emptySpaces;

        store.each(function(record) {
            if(record.get('key') !== 'featured'){
                if (!n) {
                    card = {
                        xtype: 'component',
                        data: [],
                        tpl: [
                            '<div class="drawer-pages-cnt">',
                                '<tpl for=".">',
                                    '<div class="drawer-page drawer-page-{key}" data-id="{id}">',
                                        '<h2>{name}</h2>',
                                        '<img src="http://src.sencha.io/182/{image}" />',
                                        '<div class="drawer-title-folded"></div>',
                                    '</div>',
                                '</tpl>',
                            '</div>'
                        ]
                    };
                }

                card.data.push(record.getData());

                n++;

                if (n==maxPg) {
                    n=0;
                    cards.push(card);
                }
            }
        });

        emptySpaces = maxPg - card.data.length;
        
        if (emptySpaces) {
            //add the last one to flex all the way though
            // or use different flexing
            cards.push(card);
        }


        var added = me.add(cards);

        Ext.each(added, function(item) {
            item.renderElement.on('tap', me.onPageTap, me);
        });
    },

    showPageAnim: function(page) {
        return function() {
            page.addCls('drawer-page-animate');
        };
    },

    hidePageAnim: function(page) {
        return function() {
            Ext.defer(function() {
                page.removeCls('drawer-page-animate');
            }, 600, this);

            Ext.defer(function() {
                this.close(true);
            }, 101, this);
        };
    }

});
