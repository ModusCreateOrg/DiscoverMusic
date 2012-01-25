Ext.Loader.setConfig({
    enabled : true
});

Ext.application({
    name               : 'Music',
    appFolder          : 'js/Music/app',
    
    controllers : [
        'Home'
    ],

    launch : function() {
        window[this.getName()].app = this;
    }
});