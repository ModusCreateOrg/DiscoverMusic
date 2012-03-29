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
            {
                //TODO: fix
                name : 'articleId',
                mapping : 'id'
            },
            'text',
            'genreKey',
            {
                name    : 'title',
                mapping : 'title'
            },
            {
                name    : 'image',
                mapping : 'image.src'
            },
            {
                name    : 'imageTitle',
                mapping : 'image.title'
            },
            {
                name    : 'teaser',
                mapping : 'teaser'
            },
            {
                name       : 'date',
                mapping    : 'storyDate',
                type       : 'date',
                dateFormat : 'D, d M Y h:i:s O'
            },
            {
                name    : 'audioTitle',
                mapping : 'audio.title'
            },
            {
                name    : 'audioFile',
                mapping : 'audio.src'
            },
            {
                name         : 'genre',
                mapping      : 'genre'
            },
            {
                name         : 'editable',
                type         : 'boolean',
                defaultValue : false
            }
        ]
    }
});