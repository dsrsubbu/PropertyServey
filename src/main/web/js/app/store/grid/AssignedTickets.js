/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.grid.AssignedTickets',
{
	extend		: 'IMSAPP.store.grid.GridStore'
	,alias		: 'store.assignedtickets'
	,model		: 'IMSAPP.model.Ticket'
	,extraParams: {actionType: 'ticketService', extraParams: 'assigned'}
});
