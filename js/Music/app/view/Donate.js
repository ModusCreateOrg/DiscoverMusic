/**
 * @class Music.view.Donate
 * @extends Ext.Component
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The donation panel
 */

Ext.define('Music.view.Donate',{
    extend      : 'Ext.Component',
    alias       : 'widget.donate',

    config		: {
		padding	: 20,
		data	: {
			title		: 'Donate and support public radio!',
			description	: 'Donate now and your tax-deductible gift helps keep all your favorite news, entertainment, and music programs on your local public radio station. <br/><br/> Your financial support helps ensure that you can listen to Morning Edition, All Things Considered, Fresh Air, Car Talk and Wait Wait ... Don\'t Tell Me! on your NPR station.'
		},
		cls		: 'donate-component',
		tpl		: [
			'<div class="donate-content">',
				'<h2>{title}</h2>',
				'<div class="donate-description">',
				'<p>{description}</p>',
				'<img src="js/Music/resources/images/support-station.png" />',
				'<img src="js/Music/resources/images/foundation-grants.png" />',
				'<img src="js/Music/resources/images/major-gifts.png" />',
				'<img src="js/Music/resources/images/corp-sponsorship.png" />',
				'</div>',
			'</div>'
		]
    },

    initialize	: function(){
		var me = this;

		me.callParent();

		me.registerEvents();
    },

    registerEvents	: function(){
		var me          = this,
            el          = me.renderElement;

        el.on('tap', me.onTap, me);
    },

    onTap: function(event) {
        var me = this;
        
        if (event.getTarget('img')){
            return this.fireEvent('donatetap', this);
        }
    }
});