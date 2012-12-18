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
        cls   : 'music-player',
        data  : {
            time  : '00:00',
            title : 'Listen to this story'
        },
        tpl   : [
            '<div class="music-player-button"></div>',
            '<div class="music-player-timer">{time}</div>',
            '<div class="music-player-title">{title}</div>'
        ],
        items : [
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
        var me    = this,
            audioCmp = me.down('audio');

        if (url === audioCmp.getUrl()) {
            if (audioCmp.isPlaying()) {
                audioCmp.pause()
            }
            else {
                audioCmp.play();
            }
        }
        else {
            audioCmp.setUrl(url);
            audioCmp.play();
        }

    },

    onPlayPause : function() {
        var me = this,
            audio = me.down('audio');

        if (audio.isPlaying()) {
            audio.pause();
            me.onPause();
        }
        else {
            audio.play();
            me.onPlay();
        }
    },

    applyData : function(o) {
        var me = this,
            file;

        if (o && (file = o.audioFile || o.content || o.file)) {
            delete me.timer;
            me.loadSound(file);
        }

        if (!o.time) {
            o.time = '00:00';
        }

        return o;
    },

    onUpdateTime : function(audio, time) {

        var me = this,
            minutes = Math.floor(time / 60),
            seconds = Math.floor(time - minutes * 60);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (! me.timer) {
            me.timer = me.element.down('.music-player-timer').dom;
        }

        me.timer.innerHTML = minutes + ':' + seconds;
    },

    onPlay : function() {
        this.element.addCls('music-player-paused');
    },

    onPause : function() {
        this.element.removeCls('music-player-paused');
    }
});