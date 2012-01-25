/**
 * @class Music.view.MainMenu
 * @extends Ext.dataview.DataView
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The main menu
 */

Ext.define('Music.view.MainMenu',{
    extend      : 'Ext.dataview.DataView',
    alias       : 'widget.mainmenu',

    config		: {
		docked			: 'top',
		categoriesStore	: 'Categories',
		tpl				: [
			'<ul class="music-main-menu">',
				'<tpl for=".">',
				'<li class="music-main-menu-item">{text}</li>',
				'</tpl>',
			'</ul>'
		]
    },

    applyCategoriesStore: function(store) {
        return Ext.StoreMgr.get(store) || store;
    }
});