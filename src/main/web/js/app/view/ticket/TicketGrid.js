/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.ticket.TicketGrid',
{
	extend		: 'Ext.custom.grid.Panel'
	,alias		: 'widget.ticketgrid'
	,requires	:
	[
		'IMSAPP.view.ticket.TicketGridController'
		,'IMSAPP.store.grid.Tickets'
		,'IMSAPP.view.ticket.AssignWorkflow'
		,'IMSAPP.view.ticket.Ticket'
		,'IMSAPP.store.grid.AssignedTickets'
		,'IMSAPP.view.ticket.ShowTicketDetails'
	]
	,controller	: 'ticketgrid-controller'
	,title		: 'Ticket'
	,iconCls	: 'fa-ticket'
	,selModel	: {fireSelectionChangeOnStoreRefresh: true}
	,store		: {type: 'tickets'}
	,itemId		: 'ticketGrid'
	,initComponent: function()
	{
		var me = this;
		if (me.filterParams)
		{
			me.store.filterParams = me.filterParams;
			delete me.filterParams;
		}

		me.columns	=
		[
			 {	text : 'Ticket No'				,dataIndex : 'ticketNo'				}
			,{	text : 'Name'					,dataIndex : 'name'					}
			,{	text : 'Mobile'					,dataIndex : 'mobileNo'				}
			,{	text : 'Issue Type'				,dataIndex : 'issueType'			}
			,{	text : 'User Type'				,dataIndex : 'raisingForUserType'	}
			,{	text : 'Status'					,dataIndex : 'status'				}
			,{	text : 'Workflow'				,dataIndex : 'workflowNo'			}
			,{	text : 'Category'				,dataIndex : 'category'				}
			,{	text : 'Sub Category'			,dataIndex : 'subCategory'			}
			,{	text : 'Assigned To'			,dataIndex : 'assignedTo'			}
			,{	text : 'Created Date'			,dataIndex : 'createdDate'		,renderer : Utils.renderFormattedDate	}
		];

		if (me.tbar !== false)	me.tbar = me.getGridControls();
		this.callParent(arguments);
	}
	,getGridControls: function()
	{
		var tbar = false;
		tbar = [
			{xtype : 'customtbarbutton'	,text: 'Create Issue'				,iconCls:'fa-plus'	,handler: 'createIssue'}
		];

		if ( CURRENTUSER.ROLE != null && CONSTANTS.ROLES.CC == CURRENTUSER.ROLE)
		{
			tbar.push(
				 {xtype : 'customtbarbutton'	,text: 'Assign Workflow'	,iconCls:'fa-edit'  ,handler: 'assignWorkflow'	,itemId: 'assignWorkflowBtn'	,disabled : true}
				,{xtype : 'customtbarbutton'	,text: 'ReAssign Workflow'	,iconCls:'fa-edit'  ,handler: 'assignWorkflow'	,itemId: 'rerouteWorkflowBtn'	,disabled : true}
			);
		}
		
		return tbar;
	}
	,listeners	:
	{
		afterrender: 'onAfterRender'
		,selectionchange: 'selectionChange'
	}
});
