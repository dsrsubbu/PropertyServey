/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.AssignWorkflow',
{
	extend	: 'Ext.custom.form.Panel'
	,xtype	: 'assignworkflow'
	,requires:
	[
	 	 'IMSAPP.store.combo.Categories'
	]
	,layout			: {type: 'vbox'}
	,fieldDefaults	: {labelWidth: 100 ,labelAlign	: 'top'}
	,defaults		: {width: '100%', padding: 20, scrollable: true}
	,controller		: 'issuegrid-controller'
	,initComponent	: function()
	{
		var me = this;
		me.items	=
			[
			 	{
			 		xtype : 'hidden'
			 		,name : 'workflowId'
			 	},
			 	{
			 		xtype : 'hidden'
			 		,name : 'assignedToId'
			 	},
				{
				    xtype		: 'textarea'
					,fieldLabel	: 'Recomended Category'
					,name		: 'recomendedCategory'
					,labelAlign	: 'top'
					,width 		: 500
					,grow		: true
					,height 	: 120
				},
				{
					xtype		: 'fieldcontainer'
					,layout		: {type: 'hbox'}
					,labelWidth	: 100
					,items		:
					[
						{
							xtype		: 'customcombo'
							,fieldLabel	: 'Category'
							,name		: 'category'
							,store		: {type: 'categories', autoLoad: true}
							,allowBlank	: false
							,flex		: 1
							,padding	: {right: 20}
							,listeners	: {select : 'loadWorkflow'}
						}
					   ,{
							 xtype		: 'textfield'
							,fieldLabel	: 'Workflow'
							,name		: 'workflow'
							,allowBlank	: false
							,flex		: 1
							,padding	: {right: 20}
					   		,readOnly   : true
						},{
							xtype		: 'textfield'
							,fieldLabel	: 'Next Escalation'
							,name		: 'nextEscalation'
							,allowBlank	: false
							,readOnly   : true
							,flex		: 1
							,padding	: {right: 20}
						},{
							xtype		: 'textfield'
							,fieldLabel	: 'New/Repeat'
							,name		: 'newRepeat'
							,allowBlank	: true
							,readOnly   : true
							,flex		: 1
							,padding	: {right: 20}
						}
					]
				},
				{
					xtype		: 'fieldcontainer'
					,layout		: {type: 'hbox'}
					,labelWidth	: 100
					,items		:
					[
						{
							 xtype		: 'textfield'
							,fieldLabel	: 'Existing/New User'
							,name		: 'userExist'
							,allowBlank	: true
							,flex		: 1
							,readOnly   : true
							,padding	: {right: 20}
						}
					   ,{
							 xtype		: 'textfield'
							,fieldLabel	: 'No of Complaints'
							,name		: 'noOfComplaints'
							,allowBlank	: true
							,flex		: 1
							,padding	: {right: 20}
					   		,readOnly   : true
						}
					]
				}
			];
		me.callParent(arguments);
	}
	,buttons		:
		[
			{
				xtype		: 'customformsubmitbutton'
				,formBind	: true
				,handler 	: 'onSubmit'
			}
		]
	,listeners : { afterRender : function(){
		
		var grid = Ext.ComponentQuery.query('#issueGrid')[0];
		var record = grid.getSelectionModel().getSelection()[0];
		console.log(record);
		
		this.down('[name=workflow]').setValue(record.data.workflowNo);
		this.down('[name=category]').setValue(record.data.categoryId);
		
		}
	}
});
