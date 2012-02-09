/**
 * @class Music.view.Player
 * @extends Ext.Component
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The player class
 */

Ext.define('Music.view.Player',{
    extend      : 'Ext.Component',
    alias       : 'widget.player',

    config		: {
		cls		: 'music-player',
		hidden	: true,
		tpl		: [
			'<div class="music-player-button"></div>',
			'<div class="music-player-timer">{time}</div>',
			'<div class="music-player-title">{title}</div>'
		]
    },

    initialize   : function(){
        var me = this;
        
        me.callParent();
    },

    applyData	: function(values){
		this.loadSound(values.audioFile);
		return values;
    },

    loadSound : function(url){
		var me = this,
			audio = new Audio(url);

		audio.load();
		audio.play();

		
	}
});