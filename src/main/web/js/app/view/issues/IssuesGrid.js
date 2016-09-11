/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.IssuesGrid',
{
	extend		: 'Ext.custom.grid.Panel'
	,alias		: 'widget.issuesgrid'
	,requires	: ['IMSAPP.store.grid.Issues','IMSAPP.view.issues.IssueGridController']
	,controller	: 'issuegrid-controller'
	,itemId : 'issueGrid'
	,initComponent: function()
	{
		var me = this;
		me.store	= {type: 'issues'};
		if (me.filterParams)
		{
			me.store.filterParams = me.filterParams;
			delete me.filterParams;
		}
		me.columns	=
		[
			 {	text : 'Ticket No'				,dataIndex : 'ticketNo'				}
			,{	text : 'Workflow'				,dataIndex : 'workflowNo'			}
			,{	text : 'Status'					,dataIndex : 'status'				}
			,{	text : 'Name'					,dataIndex : 'name'					}
			,{	text : 'Mobile'					,dataIndex : 'mobileNo'				}
			,{	text : 'Issue Type'				,dataIndex : 'issueType'			}
			,{	text : 'User Type'				,dataIndex : 'userType'				}
			,{	text : 'Category'				,dataIndex : 'category'				}
			,{	text : 'Description'			,dataIndex : 'description'			}
			,{	text : 'Damage(%)'				,dataIndex : 'damagePerc'			}
			,{	text : 'Lot No'					,dataIndex : 'lotNo'				}
			,{	text : 'Hybrid'					,dataIndex : 'hybrid'				}
			,{	text : 'Crop'					,dataIndex : 'crop'					}
			,{	text : 'District'				,dataIndex : 'district'				}
			/*,{	text : 'Raised By'				,dataIndex : 'raisedBy'			}
			,{	text : 'Raising For'			,dataIndex : 'raisingforUser'		}
			,{	text : 'Assigned To'			,dataIndex : 'assignedTo'			}
			,{	text : 'Raising for User Type'	,dataIndex : 'raisingForUserType'	}
			,{	text : 'CC User'				,dataIndex : 'callcenterUser'		}
			,{	text : 'Pincode'				,dataIndex : 'pincode'				}
			,{	text : 'Created Date'			,dataIndex : 'createdDate'			}
			,{	text : 'Updated Date'			,dataIndex : 'updatedDate'			}
			,{	text : 'Comments'				,dataIndex : 'comments'				}*/
		];
		this.callParent(arguments);
	}
	,tbar	:
	[
		 {xtype : 'customtbarbutton'	,text: 'Create Issue'		,iconCls:'fa-plus'	,handler: 'createIssue'}
		,{xtype : 'customtbarbutton'	,text: 'Assign Workflow'	,iconCls:'fa-edit'  ,handler: 'assignWorkflow'	,itemId: 'assignWorkflowBtn'			,disabled : true}
		,{xtype : 'customtbarbutton'	,text: 'ReAssign Workflow'	,iconCls:'fa-edit'  ,handler: 'assignWorkflow'	,itemId: 'reassignWorkflowBtn'			,disabled : true}
		//,{xtype : 'customtbarbutton'	,text: 'Update Ticket'		,iconCls:'fa-edit'  ,handler: 'updateTicket'	,itemId: 'updateTicketBtn'				,disabled : true}
		,{xtype : 'customtbarbutton'	,text: 'Resolve & Close Ticket'		,iconCls:'fa-edit'  ,handler: 'updateTicket'	,itemId: 'closeTicketBtn'				,disabled : true }
		//,{xtype : 'customtbarbutton'	,text: 'Show Comments'		,iconCls:'fa-edit'  ,handler: 'showComments'	,itemId: 'showCommentsTicketBtn'		,disabled : true}
	]
	,listeners	: 
	{
		selectionchange: function(selModel, records)
		{
			var issuesGrid =  this.getView().grid;
			var rec= records[0];
			if(records.length > 0)
			{
				issuesGrid.down('button#assignWorkflowBtn').setDisabled(rec.data.status != 'OPEN');
				issuesGrid.down('button#reassignWorkflowBtn').setDisabled(!(rec.data.status == 'ASSIGNED'));
			//	issuesGrid.down('button#updateTicketBtn').setDisabled(!(rec.data.status != 'CLOSED' && (rec.data.workflowNo != null &&  rec.data.workflowNo != '')));
				issuesGrid.down('button#closeTicketBtn').setDisabled(!(rec.data.status != 'CLOSED' && (rec.data.workflowNo != null &&  rec.data.workflowNo != '')));
			//	issuesGrid.down('button#showCommentsTicketBtn').setDisabled(!((rec.data.workflowNo != null &&  rec.data.workflowNo != '')));
			}
		}
		,itemdblclick:'issuegrid-controller.assignWorkflow'
	}
	,statusRenderer: function(v)
	{
		return v ? 'Active' : 'Inactive';
	}
});
