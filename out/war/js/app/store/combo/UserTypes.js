/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.combo.UserTypes',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.usertypes'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'userTypeService'}
});
