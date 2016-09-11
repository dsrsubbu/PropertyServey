/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.workflow.WorkflowGrid',
{
	extend		: 'Ext.custom.grid.Panel'
	,alias		: 'widget.workflowgrid'
	,requires	: ['IMSAPP.view.workflow.WorkflowGridController', 'IMSAPP.store.grid.Workflows']
	,controller	: 'workflowgrid-controller'
	,selModel	: {fireSelectionChangeOnStoreRefresh: true}
	,initComponent: function()
	{
		var me = this;
		me.store	= {type: 'workflows'};
		if (me.filterParams)
		{
			me.store.filterParams = me.filterParams;
			delete me.filterParams;
		}

		me.columns	=
		[
			 {	text : 'Name'				,dataIndex : 'name'				}
			,{	text : 'Workflow No'		,dataIndex : 'workflowNo'		}
			,{	text : 'Description'		,dataIndex : 'description'		}
			,{	text : 'Issue Type'			,dataIndex : 'issueTypeName'	}
			,{	text : 'User Type'			,dataIndex : 'userTypeName'		}
			,{	text : 'Category'			,dataIndex : 'categoryName'		}
			,{	text : 'Sub Category'		,dataIndex : 'subCategoryName'	}
			,{	text : 'Status'				,dataIndex : 'status'			,renderer: me.statusRenderer}
			,{	text : 'Is Default'			,dataIndex : 'isDefault'		,renderer: me.defaultRenderer}
		];

		this.callParent(arguments);
	}
	,tbar			:
	[
		 {xtype : 'customtbarbutton'	,text: 'Add Workflow'			,iconCls:'fa-plus'	,handler: 'addWorkflow'}
		,{xtype : 'customtbarbutton'	,text: 'Edit Workflow'			,iconCls:'fa-edit'	,handler: 'editWorkflow'		,itemId: 'editHybrid'	,disabled : true	}
		,{xtype : 'customtbarbutton'	,text: 'Deactivate Workflow'	,iconCls:'fa-edit'	,handler: 'deactivateWorkflow'	,itemId: 'deactHybrid'	,disabled : true	}
	]
	,listeners	: 
	{
		afterrender: 'onAfterRender'
		,itemdblclick: 'editWorkflowOnDBClick'
		,selectionchange: 'onSelectionChange'
	}
	,statusRenderer: function(v)
	{
		return v ? 'Active' : 'Inactive';
	}
	,defaultRenderer: function(v)
	{
		return v ? 'Yes' : 'No';
	}
});
