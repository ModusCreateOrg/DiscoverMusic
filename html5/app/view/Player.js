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
        hidden : true,
        cls    : 'music-player',
        data   : {
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
            audioEl = me.audioEl;
//            listenerCfg = {
//                scope      : me,
//                pause      : 'onPause',
//                play       : 'onPlay',
//                timeupdate : 'onUpdateTime'
//            };

        // todo: REUSE the fucking audio element
        if (audioEl) {
            audioEl.pause();
            audioEl.currentTime = 0;
            delete this.audioEl;
        }

        audioEl = document.createElement('audio');
        audioEl.src = url;
        audioEl.addEventListener('timeupdate', Ext.Function.bind(me.onUpdateTime, me));
        me.audioEl = audioEl;


        me.doPlay();

    },
    doPlay : function() {
        var me = this,
            audioEl = me.audioEl;

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

    applyData : function(obj) {
        var me = this,
            myData = me.getData(),
            soundFile = (obj.audioFile || obj.content || obj.file);

        obj.soundFile = soundFile;


        if (obj && soundFile) {
            if (obj.soundFile == myData.soundFile) {
                me.doPlay();
            }
            else {
                delete me.timer;
                me.loadSound(soundFile);

            }
        }

        if (!obj.time) {
            obj.time = '--:--';
        }

        return obj;
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
        this.setHidden(false);
        this.element.addCls('music-player-paused');
    },

    onPause : function() {
        this.element.removeCls('music-player-paused');
    }
});