/**
 * @author suman.t
 */

Ext.define('IMSAPP.store.combo.SubCategories',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.subcategories'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'subCategoryService'}
});
