/**
 * Simple sliding carousel
 * Snapping-less and snapping-free
 * No components bound, just simple elements
 */
Ext.define('Music.view.Slidousel', {
    extend : 'Ext.Container',
    xtype  : 'slidousel',

    config : {
        /**
         * @cfg {Boolean} showTitle
         * Set false to hide title from showing
         */
        showTitle : true,

        /**
         * @cfg {Boolean} showGenre
         * Set false to hide genre name from showing
         */
        showGenre : true,

        /**
         * @cfg {Number} height
         * Height of the carousel
         */
        height : 150,

        /**
         * @cfg {String} imgDim
         * Dimensions for image to retrieve from src.io
         */
        imgDim: '350',

        /**
         * @cfg cls
         * @inheritdoc
         */
        cls : 'global-toc-genre-container',

        /**
         * @cfg scrollable
         * @inheritdoc
         */
        scrollable : {
            direction     : 'horizontal',
            directionLock : true,
            hideIndicator : true
        }
    },

    /**
     * @event itemtap
     * Fires whenever an item is tapped
     * @param {Music.view.Slidousel} this
     * @param {String} id ID of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtaphold
     * Fires whenever an item is tapped
     * @param {Music.view.Slidousel} this
     * @param {String} id ID of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemsingletap
     * Fires whenever an item is singletapped
     * @param {Music.view.Slidousel} this
     * @param {String} id ID of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemdoubletap
     * Fires whenever an item is doubletapped
     * @param {Music.view.Slidousel} this
     * @param {String} id ID of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtouchstart
     * Fires whenever an item is touched
     * @param {Music.view.Slidousel} this
     * @param {String} id ID of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtouchend
     * Fires whenever an item is no longer touched
     * @param {Music.view.Slidousel} this
     * @param {String} id ID of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    initialize: function () {
        this.callParent();
        this.initTpl();
        this.initListeners();
    },

    initTpl: function () {
        var tpl = [
            '<tpl for=".">',
                '<div class="global-toc-tap-target global-toc-genre-item global-toc-genre-{genreKey}" data-id="{id}">',
                    '<div class="global-toc-genre-image" style="background-image:url(http://src.sencha.io/',
                    this.getImgDim(),
                    ,'/{image.src})">',
                        (this.getShowGenre() === true) ? '<h2>{genre}</h2>' : '',
                        (this.getShowTitle  () === true) ? '<h3 class="global-toc-title">{title}</h3>' : '',
                    '</div>',
                '</div>',
            '</tpl>'
        ].join('');

        this.setTpl(Ext.create('Ext.XTemplate', tpl));
    },

    initListeners : function () {
        this.innerElement.on({
            touchstart : 'onItemTouchStart',
            touchend   : 'onItemTouchEnd',
            tap        : 'onItemTap',
            taphold    : 'onItemTapHold',
            singletap  : 'onItemSingleTap',
            doubletap  : 'onItemDoubleTap',
            delegate   : '.global-toc-tap-target',
            scope      : this
        });
    },

    /**
     * This abstract handles repeated fireEvent actions
     * @private
     * @param {Ext.EventObject} e The event object
     * @param {String} eventName Name of the event to fire
     */
    pushEvent: function (e, eventName) {
         var me    = this,
            target = e.getTarget(),
            id     = +target.getAttribute("data-id");

        me.fireEvent(eventName, me, id, e);
    },

    onItemTap : function (e) {
        this.pushEvent(e, 'itemtap');
    },

    onItemSingleTap : function (e) {
        this.pushEvent(e, 'itemsingletap');
    },

    onItemDoubleTap : function (e) {
        this.pushEvent(e, 'itemdoubletap');
    },

    onItemTapHold : function (e) {
        this.pushEvent(e, 'itemtaphold');
    },

    onItemTouchStart : function (e) {
        this.pushEvent(e, 'itemtouchstart');
    },

    onItemTouchEnd : function (e) {
        this.pushEvent(e, 'itemtouchend');
    }
});