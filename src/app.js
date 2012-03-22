//<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>

Ext.require([
    'Ext.util.JSONP',
    'Ext.device.Geolocation'
]);

Ext.application({
    name      : 'Music',
    appFolder : 'app',



    controllers : [
        'Main',
        'Article',
        'Favorites',
        'Search',
        'Stations'
    ],


    icon: {
        72: 'resources/images/icon-72x72.png',
        114: 'resources/images/icon-114x114.png',
        144: 'resources/images/icon-144x144.png'
    },
    
    tabletStartupScreen: 'resources/images/splash.jpg',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
//        Ext.Viewport.add(Ext.create('Music.view.Main'));
 
         window[this.getName()].app = this;
    },
    
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});