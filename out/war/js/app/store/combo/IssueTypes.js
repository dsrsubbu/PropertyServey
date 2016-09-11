/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.combo.IssueTypes',
{
	extend		: 'IMSAPP.store.combo.ComboStore'
	,alias		: 'store.issuetypes'
	,requires	: 'IMSAPP.store.combo.ComboStore'
	,extraParams: {actionType: 'issueTypeService'}
	,listeners : {load: function()
		{
			this.removeAt(this.find('id', 4))
		}}
});
