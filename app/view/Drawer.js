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
        drawerPull : true,
        store      : 'Music.store.Genres',
        closed     : true,
        indicator  : false,
        docked     : 'bottom',
        scrollable : { direction : 'horizontal' },
        height     : 230,
        left       : 0,
        cls        : 'drawer-body',
        title      : 'Browse Genres',
        data       : [],
        tpl        : [
            '<div class="drawer-pages-cnt">',
                '<div class="drawer-page">',
                    '<div class="drawer-inner-btn" data-id="favorites">Favorites</div>',
                    '<div class="drawer-inner-btn" data-id="search">Search</div>',
                '</div>',
                '<tpl for=".">',
                    '<div class="drawer-page drawer-page-{key}" data-id="{id}">',
                        '<h2>{name}</h2>',
                        '<img src="http://src.sencha.io/182/{image}" />',
                        '<div class="drawer-title-folded"></div>',
                    '</div>',
                '</tpl>',
            '</div>'
        ]
    },

    initialize : function() {
        var me = this;

        me.callParent();

        me.add(me.getDrawerPull());

        me.registerEvents();

        if (me.getClosed()) {
            me.close();
        }
        else {
            me.open();
        }
    },

    applyStore : function(store) {
        if (Ext.isString(store)) {
            return Ext.create(store);
        }
        return store;
    },

    applyDrawerPull : function(config) {
        if (config === true) {
            config = {
                docked : 'top',
                html   : this.getTitle(),
                cls    : 'drawer-toggle-pull drawer-close'
            };
        }
        return Ext.factory(config, Ext.Component, this.getDrawerPull());
    },

    registerEvents : function() {
        var me = this,
            el = me.renderElement;

        el.on('tap', me.onTap, me);

        me.renderElement.on('tap', me.onPageTap, me);


        Ext.Viewport.on({
            scope             : me,
            orientationchange : 'reDraw'
        });

        Ext.Viewport.renderElement.on({
            scope : me,
            tapstart : me.onViewportTapStart
        });
    },

    onTap : function(ev) {
        var me = this;
        if (ev.getTarget('.drawer-main')) {
            return this.fireEvent('gomain', this);
        }
        if (ev.getTarget('.drawer-about')) {
            return this.fireEvent('goabout', this);
        }
        if (ev.getTarget('.drawer-toggle-pull .x-innerhtml')) {
            return me.toggle();
        }
    },

    onPageTap : function(event) {
        var me = this,
            page = Ext.get(event.getTarget('.drawer-page'));

        if (page) {
            var id = +page.getAttribute("data-id"),
                genre = me.getStore().getById(id),
                anim = Ext.Function.createSequence(me.showPageAnim(page), me.hidePageAnim(page), me);

            anim();

            if (id) {
                me.fireEvent('itemtap', id, genre);
            }
            else {
                page = Ext.get(event.getTarget('.drawer-inner-btn'));
                me.fireEvent(page.getAttribute("data-id") + 'tap');
            }
        }
    },

    toggle : function(state, suppressEvent) {
        var me = this,
            closed = me.getClosed();

        if (!Ext.isBoolean(state)) { state = undefined;}

        state = state === undefined ? !closed : !!state;

        if (state !== closed) {
            if (me.rendered) {
                me[state ? 'close' : 'open']();
            }

            if (!suppressEvent) {
                me.fireEvent('toggle', me, state);
                Ext.callback(me.toggleHandler, me.scope || me, [me, state]);
            }
        }
        return me;
    },

    close : function(hide) {
        var me = this,
            el = me.renderElement,
            vpHeight = Ext.Viewport.renderElement.getHeight(),
            button = el.down('.drawer-close > div');

        me.setTop(vpHeight - 40);

        button.addCls('drawer-open-pull');

        if (hide) {
            this.hide();
        }

        me.setClosed(true);
    },

    open : function() {
        var me = this,
            el = me.renderElement,
            height = me.getHeight(),
            vpHeight = Ext.Viewport.renderElement.getHeight(),
            button = el.down('.drawer-close > div');

        me.setTop(vpHeight - height);

        button.removeCls('drawer-open-pull');

        me.setClosed(false);
    },

    reDraw : function() {
        var me = this;
        return me.getClosed() ? me.close() : me.open();
    },

    /**
     * Using body width and page sample/icon width, etc, calculate max articles per carousel card
     */
    getMaxPagesPerCard : function() {
        return (Ext.Viewport.getOrientation() == 'portrait') ? 5 : 70;
    },

    addArticles : function() {
        var me = this,
            store = me.getStore(),
            cardData = [];

        store.each(function(record) {
            cardData.push(record.getData());
        });

        me.setData(cardData);
    },

    showPageAnim : function(page) {
        return function() {
            page.addCls('drawer-page-animate');
        };
    },

    hidePageAnim : function(page) {
        return function() {
            Ext.defer(function() {
                page.removeCls('drawer-page-animate');
            }, 600, this);

            Ext.defer(function() {
                this.close();
            }, 101, this);
        };
    },
    onViewportTapStart : function(e) {
        if (! e.getTarget('.drawer-body') && ! this.getClosed()) {
            this.close();
        }
    }

});
