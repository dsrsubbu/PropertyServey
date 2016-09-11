/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.workflow.WorkflowGridController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.workflowgrid-controller'
	,onAfterRender: function()
	{
		this.getView().getStore().load();
	}
	,onSelectionChange: function(selModel, records)
	{
		var grid =  this.getView();
		grid.down('button#editHybrid').setDisabled(!records.length);
		if (selModel.getSelection()[0].data.status)
		{
			grid.down('button#deactHybrid').setDisabled(false);
		}
		else grid.down('button#deactHybrid').setDisabled(true);
	}
	,addWorkflow: function(btn)
	{
		this.openWorkflowWin(btn.up('grid'));
	}
	,editWorkflow: function(btn)
	{
		var me = this,
			grid = btn.up('grid'),
			record = grid.getSelectionModel().getSelection()[0];
		this.openWorkflowWin(grid, record);
	}
	,editWorkflowOnDBClick: function(view, record)
	{
		this.openWorkflowWin(view.grid, record);
	}
	,deactivateWorkflow : function(btn)
	{
		var grid = btn.up('grid');
		var record = grid.getSelectionModel().getSelection()[0];
		Ext.Msg.show({
			title   : 'Warning'
           ,msg     : 'Do you want to deactivate workflow?'
           ,modal   : true
           ,buttons : Ext.Msg.YESNO
           ,icon    : Ext.Msg.WARNING
           ,closable: false
           ,fn		: function(id)
       		{
	   			if (id =='yes')
	   			{
	   				Ext.Ajax.request({
	   					 url	: IMS.Urls.deactivateWorkflow
	   					,method : 'GET'
	   					,params  :{workflowId: record.data.id}
   						,success : function(response)
   						{
   							Utils.showAlert('Success', response.responseText);
   							grid.store.load();
   							grid.getSelectionModel().deSelectAll();
   						}
   						,failure : function(form, action)
   						{
   						}
	   				})
	   			}
        	   				
           	}
		});
	}
	,openWorkflowWin: function(grid, record)
	{
		var form;
		var win = Utils.showWindow({
			title	: "Workflow"
			,iconCls: this.getView().getIconCls()
			,items	: {xtype: 'workflow', grid: grid, record: record}
			,width	: 1000
			,height	: Ext.Element.getViewportHeight()
		});

		if (record)
		{
			form = win.down('form');
			
			var subcategoryCombo = form.down('[name=subCategory]');
			subcategoryCombo.store.getProxy().extraParams['extraParams'] = record.data.category;
			subcategoryCombo.store.load();
			form.loadRecord(record);
			this.fetchEscalations(form, record);
		}
	}
	,fetchEscalations: function(form, record)
	{
		var escalationCont = form.down('fieldset[title="Escalation Details"]');
		var escalation = escalationCont.items.items[0];
		var replicatorId = escalation.replicatorId;
		escalationCont.setLoading(true);
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.getEscalationLevelsByWorkflowId
			,params		: {workflowId: record.getId()}
			,method		: 'GET'
			,success	: function (response) 
			{
				var escRecords = Ext.decode(response.responseText);
				if (escRecords.length)	escalation.setValues(escRecords[0]);
				for (var i = 1, len = escRecords.length; i < len; i++)
				{
					var esc = escalationCont.add(i, escalation.cloneConfig({replicatorId: replicatorId, fieldLabel: 'Level ' + (i + 1)}));
					esc.setValues(escRecords[i]);
				}
				if (escRecords.length)
				escalationCont.add(i, escalation.cloneConfig({replicatorId: replicatorId, fieldLabel: 'Level ' + (i + 1)}));
				escalationCont.setLoading(false);
			}
			,failure: function (response) 
			{
				
			}
		});
	}
});
