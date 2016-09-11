/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.ticket.TicketUpdateController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.ticketupdate-controller'
	,submit		: function(btn)
	{
		var form  = this.getView();
		var formValues = form.getValues();
		
		var grid = form.grid;
		var record = grid.getSelectionModel().getSelection()[0];
		formValues.ticketId = record.data.id;

		Utils.showProgresText();
		Ext.Ajax.request(
		{
			url			: IMS.Urls.closeTicket
			,jsonData	: Ext.encode(formValues)
			,method		: 'POST'
			,success	: function(response)
			{
				var res = Ext.JSON.decode(response.responseText);
				
				if (res.success)
				{
					Utils.showAlert('Success', res.message);
					grid.getStore().load();
					form.up('window').close();
				}
				else
				{
					Utils.showAlert('Success', res.message, Ext.Msg.ERROR);
					return;
				}
			}
			,failure	: function(form, action)
			{
				Utils.showAlert('Failure',"Unable to update ticket", Ext.Msg.ERROR);
			}
		});
	}
});
