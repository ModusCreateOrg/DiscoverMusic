Ext.Loader.setConfig({
    enabled : true
});

Ext.application({
    name               : 'Music',
    appFolder          : 'js/Music/app',
    
    controllers : [
        'Home',
        'Article',
        'Favorites',
        'Search'
    ],

    launch : function() {
        window[this.getName()].app = this;
    }
});