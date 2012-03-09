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
            player   : {
                selector : 'main player'
            },
            mainFlow : {
                xtype    : 'mainflow',
                selector : 'main mainflow'
            }
        },
        control : {
            'article' : {
                play     : 'playSong',
                favorite : 'onAddToFavorites',
                toc      : 'onGenreToc',
                tweet    : 'onTweet'
            }
        }
    },

    playSong : function(model) {
        var me = this;

        if (model.get('audioFile')) {
            me.getPlayer().setData(model.getData());
            me.getPlayer().loadSound(model.get('audioFile'));
            me.getPlayer().show({ type : 'fade' });
        }
    },

    onAddToFavorites : function(view, model) {
        var me = this,
            favorites = Ext.data.StoreManager.lookup('favorites'),
            fav = model.copy();

        if(favorites.find('articleId',model.getId()) === -1){
            fav.set('articleId', model.getId());
            favorites.add(fav);
            favorites.each(function(f){
                f.set('editable',false);
            });

            fav.commit();

            Ext.Msg.show({
               title: 'Favorite Added',
               message: '<strong>' + model.get('title') + '</strong> was to your Favorites!',
               width: 750,
               buttons: Ext.MessageBox.OK,
            });

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
                defaultContent: model.get('title')+' '+document.URL+' via Discover Music @ModusCreate'
            });
        });
        me.overlay.show();
    }
});