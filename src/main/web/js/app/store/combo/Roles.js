/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.combo.Roles',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.roles'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'roleService'}
});
