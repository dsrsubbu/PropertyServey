Ext.define('IMSAPP.store.combo.HybridStore',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.hybrids'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'hybridInfoService'}
	,autoLoad : false
});