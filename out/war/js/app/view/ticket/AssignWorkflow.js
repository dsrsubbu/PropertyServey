/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.ticket.AssignWorkflow',
{
	extend	: 'Ext.custom.form.Panel'
	,xtype	: 'assignworkflow'
	,requires:
	[
		'IMSAPP.store.combo.Categories'
		,'IMSAPP.view.ticket.AssignWorkflowController'
	]
	,layout			: {type: 'vbox'}
	,fieldDefaults	: {labelWidth: 100 }
	,defaults		: {width: '100%', padding: 20, scrollable: true}
	,controller		: 'assignworkflow-controller'
	,initComponent	: function()
	{
		var me = this;
		me.items	=
		[
				{
					xtype		: 'fieldset'
					,title		: 'Ticket Details'
					,fieldDefaults: {labelWidth: 100}
					,itemId		: 'ticketDetails'
					,items		:
					[
						 {
							xtype		: 'fieldcontainer'
							,layout		: {type: 'hbox'}
							,labelWidth	: 100
							,items		:
							[
								{
									 xtype		: 'displayfield'
									,fieldLabel	: 'Name :'
									,name		: 'name'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'raisingForUserType'
									,fieldLabel	: 'User Type :'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'createdDate'
									,fieldLabel	: 'Created Date :'
									,flex		: 1
									,submitValue: false
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
									 xtype		: 'displayfield'
									,fieldLabel	: 'Mobile No :'
									,name		: 'mobileNo'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'crop'
									,fieldLabel	: 'Crop :'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'hybrid'
									,fieldLabel	: 'Hybrid :'
									,flex		: 1
									,submitValue: false
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
									 xtype		: 'displayfield'
									,fieldLabel	: 'District :'
									,name		: 'district'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'pincode'
									,fieldLabel	: 'Pincode :'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'lotNo'
									,fieldLabel	: 'Lot No :'
									,flex		: 1
									,submitValue: false
								}
							]
						},
						 {
							 xtype		: 'displayfield'
							,fieldLabel	: 'Damage(%) :'
							,name		: 'damagePerc'
							,flex		: 1
							,submitValue: false
						},
						{
							xtype		: 'displayfield'
							,name		: 'description'
							,fieldLabel	: 'Description :'
							,flex		: 1
							,submitValue: false
						}
					]
				},
				{
					xtype		: 'fieldset'
					,title		: 'Select Workflow'
					,layout		: 'vbox'
					,items		:
					[
							{
								xtype : 'fieldcontainer'
								,layout : 'hbox'
								,items :
								[
									{
										xtype		: 'customcombo'
										,fieldLabel	: 'Issue Type'
										,name		: 'issueTypeId'
										,store		: {type: 'issuetypes', autoLoad: true}
										,allowBlank	: false
										,flex		: 1
										,padding	: {right: 20}
									},{
										xtype		: 'customcombo'
										,fieldLabel	: 'Category'
										,name		: 'category'
										,store		: {type: 'categories', autoLoad: true}
										,allowBlank	: false
										,flex		: 1
										,listeners	: {select : 'onCategorySelect'}
										,padding	: {right: 20}
									},
									{
										xtype		: 'customcombo'
										,fieldLabel	: 'Sub Category'
										,name		: 'subCategory'
										,store		: {type: 'subcategories', autoLoad: false}
										,allowBlank	: false
										,flex		: 1
										,listeners	: {select : 'onSubCategorySelect'}
									}
							]
						},{xtype : 'tbspacer' ,height : 20},
						{
							xtype : 'fieldcontainer'
							,layout:'hbox'
							,hidden : true
							,action :'ageOfIssue'
							,items : [
										{
											xtype		: 'displayfield'
											,name		: 'sameIssue'
											,padding	: {right: 30}
										},
										{
								            xtype: 'fieldcontainer',
								            defaultType: 'checkboxfield',
								            layout:'hbox',
								            items: [
								                    {
														boxLabel  : 'New?',
									                    name      : 'topping',
									                    padding	: {right: 20}
													}
													,{
														boxLabel  : 'Repeat?',
									                    name      : 'topping',
									                    xtype 	: 'checkbox'
													}
								            ]
								        }
							          ]
							
						}
					  
					]
				},
				{
					xtype		: 'fieldset'
					,title		: 'Workflow Details'
					,layout		: 'hbox'
					,fieldDefaults: {labelWidth: 120}
					,hidden 	: true
					,action		: 'workflowDetailsSection'
					,items		:
					[
					 	 {
					 		 xtype : 'hidden'
					 		,name  :  'workflowId'
					 	 },
					 	 {
							 xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,items		:
							[
							 	{
							 		xtype		: 'displayfield'
							 		,name		: 'workflowNo'
							 		,fieldLabel	: 'Workflow No :'
							 		,submitValue: false
							 		,flex		: 1
							 		,padding	: {right: 50}
							 	},
							 	{
							 		xtype		: 'displayfield'
							 		,name		: 'workflowName'
							 		,fieldLabel	: 'Workflow Name :'
							 		,submitValue: false
							 		,flex		: 1
							 		,padding	: {right: 30}
							 	},
							 	{
									 xtype		: 'displayfield'
									,fieldLabel	: 'New User : '
									,submitValue: false
									,flex		: 1
									,name : 'newUser'
									,padding	: {right: 30}
									
								},
								{
									 xtype		: 'displayfield'
									,fieldLabel	: 'No of Issues : '
									,submitValue: false
									,flex		: 1
									,name 		: 'noOfIssues'
									,padding	: {right: 30}
									
								}
							]
						}
						 ,
						 {xtype : 'tbspacer' ,width : 20}
						,{
							 xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,action		: 'levelsContainer'
							,items		:
							[
							 	
							]
						},{xtype : 'tbspacer' ,width : 20}
						,{
							 xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,action		: 'rolesContainer'
							,items		:
							[
							 	
							]
						},{xtype : 'tbspacer' ,width : 20}
						,{
							 xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,action		: 'usersContainer'
							,items		:
							[
							 	
							]
						},{xtype : 'tbspacer' ,width : 20}
						,{
							 xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,action		: 'tatContainer'
							,items		:
							[
							 	
							]
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
			,handler 	: 'submit'
		}
	]
	,listeners :
	{
		afterrender : 'afterRender'
	}
});
