/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.grid.Workflows',
{
	extend		: 'IMSAPP.store.grid.GridStore'
	,alias		: 'store.workflows'
	,model		: 'IMSAPP.model.Workflow'
	,extraParams: {actionType: 'workflowService'}
});
