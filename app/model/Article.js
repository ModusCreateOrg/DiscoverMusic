/**
 * @class Music.model.Article
 * @extends Ext.data.Model
 * @author Crysfel Villa
 *
 * Description
 */
Ext.define('Music.model.Article', {
    extend : 'Ext.data.Model',

    config : {
        fields : [
            'id',
            'articleId',
            {
                name    : 'title',
                mapping : 'title'
            },
            {
                name    : 'image',
                convert : function(value, model) {
                    if (Ext.isArray(value)) {
                        var primary;
                        //we search for the large image
                        for (var i = 0, len = value.length; i < len; i++) {
                            primary = value[i];
                            if (primary.enlargement) {
                                return primary.enlargement.src;
                            }
                        }
                        //if there's not a large version use anything else
                        return primary.src;
                    } else {
                        return value;
                    }
                }
            },
            {
                name    : 'teaser',
                mapping : 'teaser.$text'
            },
            {
                name       : 'date',
                mapping    : 'pubDate.$text',
                type       : 'date',
                dateFormat : 'D, d M Y h:i:s O'
            },
            {
                name    : 'author',
                mapping : 'performance',
                convert : function(list) {
                    if (list && list.length > 0 && list[0].artist) {
                        return list[0].artist.$text;
                    }
                }
            },
            {
                name    : 'text',
                convert : function(text) {
                    if (Ext.isString(text)) {
                        return text;
                    }
                    else {
                        var content = [],
                            paragraphs = text.paragraph;

                        if (paragraphs) {
                            for (var i = 0, len = paragraphs.length; i < len; i++) {
                                if (paragraphs[i].$text) {
                                    content.push(
                                        Ext.String.format('<p>{0}</p>', paragraphs[i].$text.replace('[Copyright 2012 National Public Radio]', '')));
                                }
                            }
                            return content.join('');
                        }
                    }
                }
            },
            {
                name    : 'audioTitle',
                mapping : 'audio',
                convert : function(audios) {
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
                name    : 'audioFile',
                mapping : 'audio',
                convert : function(audios) {
                    var primary;

                    if (audios) {
                        for (var i = 0, len = audios.length; i < len; i++) {
                            primary = audios[i];

                            if (primary.type === 'primary' && primary.format.mp3 && primary.format.mp3.length) {
                                return primary.format.mp3[0].$text;
                            }
                        }
                    }
                }
            },
            {
                name         : 'genre',
                defaultValue : ''
            },
            {
                name    : 'genreKey',
                convert : function(value, data) {
                    var parent;
                    
                    if (Ext.isString(value)) {
                        return value;
                    }
                    else if (parent = data.raw.parent) {
                        for (var i = 0, len = parent.length; i < len; i++) {
                            var genre = parent[i];
                            if (genre.type === 'genre') {
                                return genre.id;
                            }
                        }
                    }
                }
            },
            {
                name         : 'editable',
                type         : 'boolean',
                defaultValue : false
            }
        ]
    }
});