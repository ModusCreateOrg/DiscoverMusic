/**
 * @class Music.model.Article
 * @extends Ext.data.Model
 * @author Crysfel Villa
 *
 * Description
 */
Ext.define('Music.model.Article', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        'id',
        'articleId',
        {
            name: 'title',
            mapping: 'title.$text'
        },
        {
            name: 'image'
        },
        {
            name: 'teaser',
            mapping : 'teaser.$text'
        },
        {
            name: 'content',
            mapping: 'text.paragraph',
            convert: function (paragraphs) {
                var text = [];
                if(paragraphs){
                    for (var i = 0, len = paragraphs.length; i < len; i++) {
                        if (paragraphs[i].$text) {
                            text.push(
                            Ext.String.format('<p>{0}</p>', paragraphs[i].$text.replace('[Copyright 2012 National Public Radio]', '')));
                        }
                    }
                    return text.join('');
                }
            }
        },
        {
            name: 'audioTitle',
            mapping: 'audio',
            convert: function (audios) {
                var primary;

                if (audios) {
                    for (var i = 0, len = audios.length; i < len; i++) {
                        primary = audios[i];
                        if (primary.type === 'primary') {
                            return primary.title.$text;
                        }
                    }
                }
            }
        },
        {
            name: 'audioFile',
            mapping: 'audio',
            convert: function (audios) {
                var primary;

                if (audios) {
                    for (var i = 0, len = audios.length; i < len; i++) {
                        primary = audios[i];
                        if (primary.type === 'primary' && primary.format.mp3 && primary.format.mp3.length > 0) {
                            return primary.format.mp3[0].$text;
                        }
                    }
                }
            }
        },
        {
            name: 'genre'
        },
        {
            name: 'genreKey'
        },
        {
            name: 'editable',
            type: 'boolean',
            defaultValue : false
        }]
    }
});