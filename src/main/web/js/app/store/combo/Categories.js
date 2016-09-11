/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.combo.Categories',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.categories'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'categoryService'}
});
