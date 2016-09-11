Ext.define('IMSAPP.store.combo.DistrictStore',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.districts'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'districtService'}
});