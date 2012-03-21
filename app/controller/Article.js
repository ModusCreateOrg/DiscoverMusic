/**
 * @class Music.controller.Article
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The Article controller
 */
Ext.define('Music.controller.Article', {
    extend : 'Ext.app.Controller',

    config : {
        models  : [
            'Article',
            'Genre'
        ],
        stores  : [
            'Articles',
            'Genres',
            'Favorites'
        ],
        refs    : {
            mainFlow : {
                selector : 'main mainflow'
            }
        },
        control : {
            article : {
                play     : 'onPlay',
                favorite : 'onAddToFavorites',
                toc      : 'onGenreToc',
                tweet    : 'onTweet'
            }
        }
    },

    onPlay : function(model) {
        this.getApplication().fireEvent('playAudio', model.getData());
    },

    onAddToFavorites : function(view, model) {
        var me = this,
            mainFlow = me.getMainFlow(),
            article = mainFlow.getActiveItem(),
            favorites = Ext.data.StoreManager.lookup('favorites'),
            story = favorites.find('articleId',model.getId()),
            btn;

        // if the article doesn't exist in the favorites store let's add it
        if(story === -1){
            var fav = model.copy();
            fav.set('articleId', model.getId());
            favorites.add(fav);
            me.setEditable(favorites,false);

            fav.commit();

            btn = article.renderElement.down('.music-article-button-favorite');
            btn.removeCls('music-article-button-favorite');
            btn.addCls('music-article-button-favorite-added');

        }else{
            //if the article exist we need to remove it
            me.setEditable(favorites,false);
            favorites.remove(favorites.getAt(story));
            
            btn = article.renderElement.down('.music-article-button-favorite-added');
            btn.removeCls('music-article-button-favorite-added');
            btn.addCls('music-article-button-favorite');
        }
    },

    onGenreToc : function(view, model) {
        var mainFlow = this.getMainFlow(),
            toc = mainFlow.down('#' + model.get('genreKey'));

        mainFlow.setActiveItem(toc);
    },

    onTweet : function(view,model){
        var me = this;
        
        if(!me.overlay){
            me.overlay = Ext.Viewport.add({
                xtype   : 'panel',
                modal   : true,
                hideOnMaskTap:true,
                centered: true,
                width   : 500,
                height  : 220,
                padding : 20
            });
            me.body = me.overlay.renderElement.down('.x-inner');
        }

        if(me.body.dom.hasChildNodes()){
            var dom = me.body.dom;
            while ( dom.childNodes.length >= 1 ){
                Ext.removeNode(dom.firstChild);
            }
        }

        twttr.anywhere(function (T) {
            T(me.body.dom).tweetBox({
                height: 100,
                width: 450,
                label:'Share this story',
                defaultContent: model.get('title')+' '+document.URL+' via Discover Music @ModusCreate',
                onTweet : Ext.Function.bind(me.onTweetResponse,me)
            });
        });
        me.overlay.show();
    },

    setEditable : function(store,value){
        store.each(function(f){
            f.set('editable',value);
        });
    },

    onTweetResponse : function(text,html){
        this.overlay.hide();
    }
});