/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.combo.ComboStore',
{
	 extend		: 'IMSAPP.store.Store'
	,alias		: 'store.combostore'
	,requires	: ['IMSAPP.model.ComboModel', 'IMSAPP.store.Store']
	,model		: 'IMSAPP.model.ComboModel'
	,autoLoad 	: false
	,autoDestroy: true
	,pageSize	: 0
	,config		: {pageSize	: 0}
});
