/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.IssueGridController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.issuegrid-controller'
	,createIssue: function()
	{
		return	Utils.showWindow({
			title	: "Create Issue"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'createissue'}
			,width	: 1000
			,height	: Ext.Element.getViewportHeight()
		});
	}
	,updateTicket : function(btn)
	{
		var win = Utils.showWindow({
			title	: "Update Ticket"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'updateticket' ,btnName : btn.itemId}
		});
	}
	,showComments : function(btn)
	{
		var grid = Ext.ComponentQuery.query('#issueGrid')[0];
		var record = grid.getSelectionModel().getSelection()[0];
		var win =	Utils.showWindow({
					title	: "Update Ticket"
					,iconCls: this.getView().getIconCls()
					,items	: {xtype: 'showcomments'}
			});
		var form = win.down('form');
		Ext.Ajax.request(
				{
					url 		: IMS.Urls.getComments
					,params		: {ticketId: record.data.id}
					,method		: 'GET'
					,success	: function (response) 
					{
						var responseData = Ext.decode(response.responseText);
						for (var i = 0; i < responseData.length; i++)
						{
							var displayField = {xtype:'displayfield' ,name:'commets' ,border: true}
							form.items.insert(i,displayField)
						}
					}
					,failure: function (response) 
					{
						
					}
				});	
	}
	,assignWorkflow : function()
	{
		var win= 	Utils.showWindow({
			title	: "Category Selection By Customer Care"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'assignworkflow'}
			,width	: 1000
			,height	: Ext.Element.getViewportHeight()
		});
	}
	,loadWorkflow : function (comp, newValue, oldValue)
	{
		var form = comp.up('form');

		form.down('[name=nextEscalation]').setValue('');
		form.down('[name=newRepeat]').setValue('');
		form.down('[name=workflow]').setValue('');
		form.down('[name=userExist]').setValue('');
		form.down('[name=noOfComplaints]').setValue('');
		form.down('[name=workflowId]').setValue('');
		form.down('[name=assignedToId]').setValue('');

		var grid = Ext.ComponentQuery.query('#issueGrid')[0];
		var record = grid.getSelectionModel().getSelection()[0];
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.getWorkflowDetails
			,params		: {ticketId: record.data.id,categoryId:newValue.data.id}
			,method		: 'GET'
			,success	: function (response) 
			{
				var responseData = Ext.decode(response.responseText);
				if (responseData.message != "" && responseData.message != null)
				{
					Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), responseData.message, Ext.Msg.ERROR);
					return;
				}
				form.down('[name=nextEscalation]').setValue(responseData.assignedTo);
				form.down('[name=newRepeat]').setValue(responseData.isNewIssue ? 'New' : 'Repeat');
				form.down('[name=workflow]').setValue(responseData.workflowNo);
				form.down('[name=userExist]').setValue(responseData.isNewUser ? 'New' : 'Existing');
				form.down('[name=noOfComplaints]').setValue(responseData.noofIssues);
				form.down('[name=workflowId]').setValue(responseData.workflowId);
				form.down('[name=assignedToId]').setValue(responseData.assignedToId);
			}
			,failure: function (response) 
			{
				
			}
		});
	}
	,onSubmit : function()
	{
		var form  		= this.getView();
		var formValues  = form.getValues();
		var grid 		= Ext.ComponentQuery.query('#issueGrid')[0];
		var record 		= grid.getSelectionModel().getSelection()[0];
		formValues.ticketId = record.data.id;
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.assignWorkflow
			,method		: 'POST'
			,jsonData	: Ext.encode(formValues)
			,success	: function (response) 
			{
				if(response.responseText=='Success')
				{
					form.up('window').close();
					form.record = null;
					grid.getSelectionModel().deselectAll();
					Utils.showAlert(getLabel('IMS.GLOBAL.SUCCESS'), "Workflow assigned successfully.", false, false, function()
					{
						grid.getStore().load();
						grid.down('button#assignWorkflowBtn').setDisabled(true);
					});
				}
				else
				{
					Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Unable to save.", Ext.Msg.ERROR);
				}
			}
			,failure: function (response) 
			{
				Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Unable To Save.", Ext.Msg.ERROR);
			}
		});
	}
	,submitTicket : function()
	{
		var form  = this.getView();
		var mask = Utils.showLoadMask(form.up('window')).show();
		var grid 		= Ext.ComponentQuery.query('#issueGrid')[0];
		form.submit({
			 url		: './command?actionType=ticketService'
			,jsonSubmit : true
			,method		: 'POST'
			,success 	: function(frm, action)
			{
				mask.destroy();
				Utils.showAlert('Success', action.result.message);
				grid.getStore().load();
				form.up('window').close();
			}
			,failure : function(form, action)
			{
				mask.destroy();
				Utils.showAlert('Failure',"Unable to raise ticket");
			}
		});
	}
	,submitTicketUpdation : function()
	{
		var form  = this.getView();
		var mask = Utils.showLoadMask(form.up('window')).show();
		var formValues = form.getValues();
		
		var grid = Ext.ComponentQuery.query('#issueGrid')[0];
		var record = grid.getSelectionModel().getSelection()[0];
		formValues.ticketId = record.data.id;
		
		var url = '';
		if (formValues.action == "closeTicketBtn")
		{
			url = IMS.Urls.closeTicket;
		}
		else url = IMS.Urls.updateTicket;

		Ext.Ajax.request(
		{
			url		: url
			,jsonData	: Ext.encode(formValues)
			,method	: 'POST'
			,success : function(response)
			{
				mask.destroy();
				var res = Ext.JSON.decode(response.responseText);
				
				if (res.success)
				{
					Utils.showAlert('Success',res.message);
					grid.getStore().load();
					form.up('window').close();
					grid.down('button#assignWorkflowBtn').setDisabled(true);
					grid.down('button#updateTicketBtn').setDisabled(true);
					grid.down('button#closeTicketBtn').setDisabled(true);
				}
				else
				{
					Utils.showAlert('Success',res.message);
					return;
				}
			}
			,failure : function(form, action)
			{
				mask.destroy();
				Utils.showAlert('Failure',"Unable to update ticket");
			}
		});
	}
});
