Ext.define('IMSAPP.store.combo.PincodeStore',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.pincodes'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'pincodeService'}
	,autoLoad : false
});