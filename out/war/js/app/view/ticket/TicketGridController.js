/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.ticket.TicketGridController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.ticketgrid-controller'
	,onAfterRender: function()
	{
		var me = this;
		this.getView().getStore().load();
		this.getView().getStore().on('load',function(store)
		{
			var record = store.findRecord('id',CONSTANTS.TICKET.TICKETID,false,false,true);
			if (!record) record = store.findRecord('callcenterUserId',CONSTANTS.TICKET.TICKETID,false,false,true);
			if (record)
			{
				if (refresh==2 && record.data.status == 'ASSIGNED')
				{
					me.showPopup(record,'USER');
				}
				else if (refresh==2 && record.data.status == 'CLOSED' && CURRENTUSER.ROLE == CONSTANTS.ROLES.CC && (record.data.isUserSatisfy == null || record.data.isUserSatisfy == ""))
				{
					me.showPopup(record,'CC');
				}
			}
		})
	}
	,showPopup : function(record,type)
	{
		var grid = this.getView();
		var win =  Utils.showWindow({
			title	: "Ticket Details"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'showticketdetails', grid: grid}
			,width	: '60%'
		});
		 var form  = win.down('form');
		 form.loadRecord(record);
		 form.down('[name=createdDate]').setValue(Utils.renderFormattedDate(record.data.createdDate));
		 if (type == 'CC')
		 {
			 form.down('[action=satisfyChkbox]').show();
			 form.down('[action=submtBtn]').show();
			 form.down('[action=closeBtn]').hide();
		 }
		 else
		 {
			 form.down('[action=submtBtn]').hide();
			 form.down('[action=closeBtn]').show();
		 }
	}
	,selectionChange: function(selModel, records)
	{
		var ticketGrid =  this.getView();
		var len = records.length;
		var assignWorkflowBtn = ticketGrid.down('button#assignWorkflowBtn');
		var rerouteWorkflowBtn = ticketGrid.down('button#rerouteWorkflowBtn');

		if (assignWorkflowBtn)	assignWorkflowBtn.setDisabled(!len || (CONSTANTS.TICKET_STATUS.OPEN != records[0].get('status') || CONSTANTS.ISSUE_TYPE.PAYBACK == records[0].get('issueTypeId')));
		if (rerouteWorkflowBtn)	rerouteWorkflowBtn.setDisabled(!len || (CONSTANTS.TICKET_STATUS.ASSIGNED != records[0].get('status') || CONSTANTS.ISSUE_TYPE.PAYBACK == records[0].get('issueTypeId')));
	}
	,assignWorkflow: function(btn)
	{
		var grid = this.getView();
		var win =  Utils.showWindow({
			title	: "Assign Workflow"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'assignworkflow', grid: grid}
			,width	: 1100
		});
		var record = grid.getSelectionModel().getSelection()[0];
	   if (btn.itemId == 'rerouteWorkflowBtn')
	   {
		   var form  = win.down('form');
		   if (!record.data.defaultWorkflow)
		   {
			   form.down('[name=category]').setValue(record.data.categoryId);
			   form.down('[name=subCategory]').store.getProxy().extraParams['extraParams'] = record.data.categoryId;
			   form.down('[name=subCategory]').store.load();
			   form.down('[name=subCategory]').setValue(record.data.subCategoryId);
			   form.down('[name=subCategory]').fireEvent('select');
		   }
	   }
	}
	,createIssue: function()
	{
		var grid = this.getView();
		return	Utils.showWindow({
			title	: "Create Ticket"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'ticket', grid: grid}
			,width	: 900
		});
	}
});
