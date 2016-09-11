/**
 * @author suman.t
 */

Ext.define('IMSAPP.store.combo.CropStore',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.crops'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'cropService'}
});

