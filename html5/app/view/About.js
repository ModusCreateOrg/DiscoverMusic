/**
 *  About Discover Music
 */
Ext.define('Music.view.About', {
    extend : 'Ext.Component',
    xtype: 'about',

    config : {
        isKF2011 : navigator.userAgent == "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Kindle Fire Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
        cls: 'aboutpage',

    },

    /**
     * @event backhome
     * Fires when Back to Home Screen button is tapped
     * @param {Music.view.About} this About page instance
     */

    initialize : function () {
        var me = this,
            isOldSchool = (! this.getIsKF2011()) ? [
                '<figure class="dmlogo"></figure>',

                '<figure class="mclogo">',
                    '<figcaption>developed by</figcaption>',
                '</figure>'
            ].join('') : '';

        this.setHtml([
            '<header>',
                '<h1>About This App</h1>',
                '<aside>Back to home screen</aside>',
            '</header>',

             isOldSchool,


            '<article>',
                '<p><strong>DiscoverMusic</strong> was built to encourage users to listen to new music, read the ',
                'fascinatng stories behind the artists, and share their discoveries with friends.</p>',

                '<p>DiscoverMusic was designed and developed by <strong>Modus Create, Inc.</strong>, a mobile and ',
                'cloud application development company based in Reston, Virginia.</p>',

                '<p>Modus Create, Inc. used <strong>Sencha Touch 2.0</strong>, an HTML5 mobile framework developed by ',
                '<strong>Sencha, Inc</strong>, to create DiscoverMusic. All content and audio clips presented in the ',
                'app are courtesy of <strong>National Public Radio (NPR)</strong>, and are accessed using their free ',
                'and open public APIs.</p>',

                '<p>Want to share your feedback with Modus Create, inc.? Visit our website at ',
                '<strong>www.moduscreate.com</strong>.</p>',

                '<p>If you want to learn more about the Sencha Touch 2.0 platform, visit the Sencha website at ',
                '<strong>www.sencha.com</strong>.</p>',
            '</article>',

            '<footer>©2012 Modus Create, Inc. All Rights Reserved. <br />www.moduscreate.com</footer>'
        ].join(''))

        me.callParent();
        me.innerElement.on({
            tap      : 'onBackTap',
            delegate : 'header aside',
            scope    : me
        });
    },

    onBackTap: function () {
        this.fireEvent('backhome', this);
    }
});