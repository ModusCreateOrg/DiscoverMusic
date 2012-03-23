/**
 * @class Music.view.MainFlow
 * @extends Ext.dataview.DataView
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * This view display all the articles, TOCs, favorites, search and the about
 */

Ext.define('Music.view.MainFlow',{
    extend      : 'Ext.carousel.Carousel',
    alias       : 'widget.mainflow',
    
    requires   : [
      'Ext.Anim',
      'Music.view.GlobalToc',
      'Music.view.GenreToc'
    ],

    config      : {
      indicator:false,
      showAnimation:'slideIn',
      articles: []
    },

    addArticles   : function(genre,articles){
      var me = this,
         collection = me.getArticles(),
         favorites = Ext.data.StoreManager.lookup('favorites');

      //adding the TOC's
      if(Ext.isEmpty(me.globalToc)){
         me.globalToc = Ext.create('Music.view.GlobalToc');
         me.add(me.globalToc);
      }

      me.add({
         xtype   : 'genretoc',
         itemId   : genre.get('key'),
         genre   : genre,
         articles: articles
      });
      me.globalToc.addGenre(genre,articles);

      //Adding the articles preview to the main flow
      articles.each(function(article){
         var data = article.getData();
            data.isFavorite = favorites.find('articleId',article.getId()) !== -1;

            var tmp = me.add({
                xtype   : 'article',
                itemId   : 'article-'+article.getId(),
                model   : article,
                data    : data,
                genre   : genre
            });
            collection.push(tmp);
        },me);
    },

    setFeatured   : function(){
      var me = this,
         articles = me.getArticles(),
         cover = articles[Math.floor(Math.random()*articles.length)];

      me.globalToc.setFeatured(cover.getModel());

      me.insert(0,{
         xtype   : 'articlepreview',
         model   : cover.getModel(),
         data   : cover.getModel().getData()
      });
      me.setActiveItem(0);
    }
});