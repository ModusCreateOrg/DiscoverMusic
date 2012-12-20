/**
 *  About Discover Music
 */
Ext.define('Music.view.About', {
    extend : 'Ext.Container',
    xtype: 'about',

    config : {
        cls: 'aboutpage',
        scrollable :  {
            direction     : 'vertical',
            directionLock : true
        },
        html : [
            '<header>',
                '<h1>About This App</h1>',
                '<aside>Back to home screen</aside>',
            '</header>',

            '<figure class="dmlogo"></figure>',

            '<figure class="mclogo">',
                '<figcaption>developed by</figcaption>',
            '</figure>',

            '<article>',
                '<p><strong>DiscoverMusic</strong> was built to encourage users to listen to new music, read the ',
                'fascinatng stories behind the artists, and share their discoveries with friends.</p>',

                '<p>DiscoverMusic was designed and developed by <strong>Modus Create, Inc.</strong>, a mobile and ',
                'cloud application development company based in Reston, Virginia.</p>',

                '<p>Modus Create, Inc. used <strong>Sencha Touch 2.0</strong>, an HTML5 mobile framework developed by ',
                '<strong>Sencha, Inc</strong>, to create DiscoverMusic. All content and audio clips presented in the ',
                'app are courtesy of <strong>National Public Radio (NPR)</strong>, and are accessed using their free ',
                'and open public APIs.</p>',

                '<p>If you want to share your feedback with Modus Create, inc, visit their website at ',
                '<strong>moduscreate.com</strong>.</p>',

                '<p>If you want to learn more about the Sencha Touch 2.0 platform, visit Sencha website at ',
                '<strong>sencha.com</strong>.</p>',
            '</article>',

            '<footer>©2012 Modus Create, Inc. All Rights Reserved. www.moduscreate.com</footer>'
        ].join('')
    },

    /**
     * @event backhome
     * Fires when Back to Home Screen button is tapped
     * @param {Music.view.About} this About page instance
     */

    initialize : function () {
        this.callParent();
        this.innerElement.on({
            tap        : 'onBackTap',
            delegate   : 'header aside',
            scope      : this
        });
    },

    onBackTap: function () {
        this.fireEvent('backhome', this);
    }
});