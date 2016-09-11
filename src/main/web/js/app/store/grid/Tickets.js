/**
 * @author suman.t
 */

Ext.define('IMSAPP.store.grid.Tickets',
{
	extend		: 'IMSAPP.store.grid.GridStore'
	,alias		: 'store.tickets'
	,model		: 'IMSAPP.model.Ticket'
	,extraParams: {actionType: 'ticketService'}
});
