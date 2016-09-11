/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.ticket.TicketViewPanelController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.ticketviewpanel-controller'
	,updateDetails: function(selModel, records)
	{
		var me = this;
		var mainContainer = this.getView();
		var grid = selModel.view.grid;
		var detailSection = mainContainer.down('#detailSection', 1);
		var detailContainer = detailSection.down('component#detailContainer', 1);
		var updateBtn = detailSection.down('button#updateTicket', 2);
		var status;

		/**
		 * If any record is selected and the ticket is assigned to the logged in user office mapping then enable it
		 */
		updateBtn.setDisabled(!records.length);
		updateBtn.grid = grid;
		if (records.length)
		{
			status = records[0].get('status');
			me.fetchDetails(detailContainer, records[0].get('id'));
			me.updateDetailTitle(mainContainer, records[0].get('ticketNo'));

			console.log(records[0].get('issueTypeId'));
			if ((CURRENTUSER.ID == records[0].get('assignedToId') && "CLOSED" != status))
			{
				updateBtn.setDisabled(false);
				updateBtn.setHidden(false);
			}
			else if (records[0].get('issueTypeId')==4)
			{
				updateBtn.setDisabled(false);
				updateBtn.setHidden(false);
			}
			else
			{
				updateBtn.setDisabled(true);
				updateBtn.setHidden(true);
			}
		}
		else
		{
			detailContainer.update([]);
			me.updateDetailTitle(mainContainer, "");
		}
	}
	,updateDetailTitle: function(mainContainer, ticketNo)
	{
		mainContainer.down('#detailSection').setTitle('Ticket Details- ' + ticketNo);
	}
	,fetchDetails: function(detailContainer, ticketId, refreshTicketGrid)
	{
		detailContainer.setLoading(true);
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.getTicketLogByTicketId
			,method		: 'GET'
			,params   	: {ticketId: ticketId}
			,success	: function (response) 
			{
				var responseData = Ext.decode(response.responseText);
				detailContainer.update(responseData);
				detailContainer.setLoading(false);
				if (refreshTicketGrid)
				{
					detailContainer.prev().getStore().load();
				}
			}
			,failure: function (response) 
			{
				detailContainer.update([]);
				Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Unable To Fetch Ticket Histroy", Ext.Msg.ERROR );
				detailContainer.setLoading(false);
			}
		});
	}
	,updateTicket: function(btn)
	{
		var me = this;
		var mainContainer = this.getView();
		var win = Utils.showWindow({
			title	: "Close Ticket"
			,iconCls: mainContainer.down('grid').getIconCls()
			,items	: {xtype: 'ticketupdate', grid: btn.grid}
			,width	: 400
		});
	}
});
