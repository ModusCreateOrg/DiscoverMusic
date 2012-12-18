/**
 * @class Music.view.Main
 * @extends Ext.Panel
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * Description
 */
Ext.define('Music.view.Main', {
    extend   : 'Ext.carousel.Carousel',
    xtype    : 'main',
    requires : [
        'Ext.Anim',
        'Music.view.GlobalToc',
        'Music.view.GenreToc'
    ],

    config : {
        indicator     : false,
        showAnimation : 'fadeIn',
        articles      : [],
        fullscreen    : true,
        items         : [
            {
                xtype  : 'toolbar',
                docked : 'top',
                cls    : 'music-app-title',
                layout : 'hbox',

                defaults : {
                    margin   : '9 0 0 0',
                    height   : 40,
                    iconMask : true,
                    xtype    : 'button'
                },

                items : [
                    {
                        xtype  : 'title',
                        title  : '<span class="app-title">Discover Music</span>',
                        width  : 190,
                        margin : null,
                        height : null
                    },
                    {
                        xtype  : 'player',
                        hidden : true,
                        margin : null,
                        height : null
                    },
                    {
                        action  : 'findstations',
                        iconCls : 'find-stations-icon'
                    },
                    {
                        iconCls : 'favorite-icon',
                        action  : 'favorites'
                    },
                    {
                        action  : 'search',
                        iconCls : 'search-icon'
                    }
                ]
            }
        ]
    },

    initialize : function() {
        var me = this;

        me.callParent();

        me.renderElement.on('tap', 'onTap', me);
    },

    onTap : function(event) {
        if (event.getTarget('.app-title')) {
            this.fireEvent('titletap');
        }
    },

    addArticles : function(genreRecords) {
        var me = this,
            collection = me.getArticles(),
            favorites = Ext.data.StoreManager.lookup('favorites'),
            articles;

        //adding the TOC's
        if (Ext.isEmpty(me.globalToc)) {
            me.globalToc = Ext.create('Music.view.GlobalToc');
            me.add(me.globalToc);
        }

//        debugger;
        me.setArticles(genreRecords);
        me.globalToc.addGenres(genreRecords);

        Ext.each(genreRecords, function(record) {
//            debugger;
            var recordData = record.data,
                genre      = recordData.name,
                articles   = recordData.articles;

//            debugger
    //        me.add({
    //            xtype    : 'genretoc',
    //            itemId   : genre.get('key'),
    //            genre    : genre,
    //            articles : articles
    //        });


            //Adding the articles preview to the main flow
            return;
            articles.each(function(article) {
                var data = article.getData();
                data.isFavorite = favorites.find('articleId', article.getId()) !== -1;
//
                article = me.add({
                    xtype  : 'article',
                    itemId : 'article-' + article.getId(),
                    model  : article,
                    data   : data,
                    genre  : genre
                });
                collection.push(article);
            }, me);
        });
    },

    setFeatured : function() {
//        debugger;
        var me         = this,
            articles   = me.getArticles(),
            randomNum  = Math.floor(Math.random() * articles.length),
            coverModel = articles[randomNum].data.articles.getAt(0);

        me.globalToc.setFeatured(coverModel);

//        me.insert(0, {
//            xtype : 'articlepreview',
//            model : model,
//            data  : model.getData()
//        });
//        me.animateActiveItem(0, { type : 'slide' });
    }

});