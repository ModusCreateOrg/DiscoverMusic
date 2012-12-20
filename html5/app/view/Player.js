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
        ]
    },

    initialize : function() {
        var me = this;

        me.callParent();
        me.element.on('tap', 'onPlayPause', me);
    },

    loadSound : function(url) {
        var me    = this,
            audioEl = this.audioEl,
            listenerCfg = {
                scope      : me,
                pause      : 'onPause',
                play       : 'onPlay',
                timeupdate : 'onUpdateTime'
            };

        // todo: REUSE the fucking audio element
        if (audioEl) {
            audioEl.pause();
            audioEl.currentTime = 0;
            delete this.audioEl;
        }

        audioEl = document.createElement('audio');
        audioEl.src = url;
        audioEl.addEventListener('timeupdate', Ext.Function.bind(me.onUpdateTime, me));
        this.audioEl = audioEl;



        Ext.Function.defer(function() {
            audioEl.play();

            me.onPlay();
        }, 250);

    },

    onPlayPause : function() {
        var me = this,
            audio = me.audioEl;

        if (! audio.paused) {
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
            o.time = '--:--';
        }

        return o;
    },

    onUpdateTime : function() {
        var me = this,
            time    = me.audioEl.currentTime,
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