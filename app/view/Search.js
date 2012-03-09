/**
 * @class Music.view.Search
 * @extends Ext.Panel
 * @author Crysfel Villa<crysfel@moduscreate.com>
 *
 * Search page view.
 */

Ext.define('Music.view.Search', {
    extend      : 'Ext.Panel',
    alias       : 'widget.search',
	requires    : [
        'Ext.form.Checkbox',
        'Ext.form.FieldSet',
        'Ext.field.Search'
    ],
    
    
    config  : {
        layout  : 'hbox',
        cls     : 'music-search',
        items   : [{
            xtype: 'panel',
            width: 285,
            padding: 15,
            cls  : 'music-genre-filters',
            items: [{
                xtype   : 'fieldset',
                title   : 'Genre Filters',
                defaults: {
                    xtype:'checkboxfield',
                    labelWidth:'70%'
                },
                items   : [{
                    label   : 'Rock / Pop / Folk',
                    value   : 'rockPopFolk',
                    name    : 'rockPopFolk'
                },{
                    label   : 'Jazz & Blues',
                    value   : 'jazzBlues',
                    name    : 'jazzBlues'
                },{
                    label   : 'Classical',
                    value   : 'classical',
                    name    : 'classical'
                },{
                    label   : 'Hip-Hop / R&B',
                    value   : 'hipHopRB',
                    name    : 'hipHopRB'
                },{
                    label   : 'World',
                    value   : 'world',
                    name    : 'world'
                }]
            }]
        }, {
            xtype   : 'dataview',
            flex    : 1,
            store   : {
                type : 'search'
            },
            itemTpl : [
                '<div class="music-result-article" style="background-image:url(http://src.sencha.io/300/{image})">',
                    '<h2>{title}</h2>',
                '</div>'
            ],
            scrollable: {
                direction: 'vertical',
                directionLock: true
            },
            items   : [{
                xtype   : 'toolbar',
                docked  : 'top',
                items   : [{
                    xtype   : 'searchfield',
                    flex    : 1,
                    name    : 'query',
                    placeHolder : 'Search Artist, Genres, Songs...'
                },{
                    xtype   :'button',
                    text    :'Search',
                    action  : 'search'
                }]
            }]
        }]
    },

    initialize   : function() {
        var me = this;
        me.callParent();

        Ext.Viewport.on('orientationchange',me.onOrientationChange,me);
        Ext.Viewport.fireEvent('orientationchange',Ext.Viewport,Ext.Viewport.orientation);
    },

    onOrientationChange : function(viewport,orientation){
        var me = this,
            filters = me.down('panel[cls=music-genre-filters]');

        if(orientation === Ext.Viewport.PORTRAIT){
            filters.setWidth(275);
        }else{
            filters.setWidth(285);
        }
    }
});