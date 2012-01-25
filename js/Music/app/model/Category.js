/**
 * @class Music.model.Category
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@moduscreate.com>
 *
 * The category model
 */

Ext.define('Music.model.Category',{
    extend      : 'Ext.data.Model',

    config		: {
		fields		: ['id','text']
    }
});