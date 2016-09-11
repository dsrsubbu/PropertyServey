/**
 * @author suman.t
 */

Ext.define('IMSAPP.store.grid.Issues',
{
	extend		: 'IMSAPP.store.grid.GridStore'
	,alias		: 'store.issues'
	,model		: 'IMSAPP.model.IssueModel'
	,extraParams: {actionType: 'ticketService'}
});
