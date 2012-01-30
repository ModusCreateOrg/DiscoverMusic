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
        store           : 'Music.store.Categories',
        closed          : true,
        indicator       : false,
        docked          :'bottom',
        scrollable      : {direction: 'horizontal'},
        height          : 280,
        left            : 0,
        cls             : 'drawer-body'
    },

    initialize  : function(){
        var me = this;

        me.callParent();

        me.add(me.getDrawerPull());
        
        me.registerEvents();
        //me.addContent();

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

    getMaxPagesPerCard: function() {
        return (Ext.Viewport.getOrientation() == 'portrait')?5:70;
    },

    addContent   : function() {
        var me      = this,
            store   = me.getStore(),
            maxPg   = me.getMaxPagesPerCard(),
            cards   = [],
            n       = 0,
            card,
            emptySpaces;

        store.each(function(record) {
            if (!n) {
                card = {
                    xtype: 'component',
                    data: [],
                    tpl: //'<div>Article Browser</div>' +
                        '<div class="drawer-pages-cnt">' +
                            '<tpl for=".">' +
                                '<div class="drawer-page" data-id="{id}" style="background-image: url(http://src.sencha.io/175/175/{img})">' +
                                    '<div class="drawer-page-title">{title}</div>' +
                                '</div>' +
                            '</tpl>' +
                        '</div>'
                };
            }

            card.data.push({
                title   : record.get('title'),
                img     : record.get('image'),
                id      : record.getId()
            });

            n++;

            if (n==maxPg) {
                n=0;
                cards.push(card);
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

    }

});
