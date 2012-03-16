/**
 * @class Music.view.Player
 * @extends Ext.Component
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The player class
 */

Ext.define('Music.view.Player', {
    extend   : 'Ext.Container',
    alias    : 'widget.player',
    requires : [
        'Ext.Audio'
    ],

    config : {
        cls    : 'music-player',
        data   : {
            time  : '00:00',
            title : 'Press "Listen to story" to play music.'
        },
        tpl    : [
            '<div class="music-player-button"></div>',
            '<div class="music-player-timer">{time}</div>',
            '<div class="music-player-title">{title}</div>'
        ],
        items  : [
            {
                xtype  : 'audio',
                hidden : true
            }
        ]
    },

    initialize : function() {
        var me = this,
            audio = me.down('audio');

        me.callParent();

        me.element.on('tap', 'onPlayPause', me);

        audio.on({
            scope      : me,
            pause      : 'onPause',
            play       : 'onPlay',
            timeupdate : 'onUpdateTime'
        });
    },

    loadSound : function(url) {
        var me = this,
            audio = me.down('audio');

        if (url === audio.getUrl()) {
            if (audio.isPlaying()) {
                audio.pause();
            } else {
                audio.play();
            }
        } else {
            audio.setUrl(url);
            audio.play();
        }
        me.timer = me.element.down('.music-player-timer');
    },

    onPlayPause : function(event) {
        var me = this,
            audio = me.down('audio');

        if (audio.isPlaying()) {
            audio.pause();
            me.onPause();
        } else {
            audio.play();
            me.onPlay();
        }
    },

    onUpdateTime : function(audio, time) {
        var minutes = Math.floor(time / 60),
            seconds = Math.floor(time - minutes * 60);

        this.timer.dom.innerHTML = Ext.util.Format.format('{0}:{1}', minutes < 10 ? '0' + minutes : minutes, seconds < 10 ? '0' + seconds : seconds);
    },

    onPlay : function() {
        this.element.addCls('music-player-paused');
    },

    onPause : function() {
        this.element.removeCls('music-player-paused');
    }
});