/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.workflow.Workflow',
{
	extend	: 'Ext.custom.form.Panel'
	,xtype	: 'workflow'
	,requires:
	[
		 'IMSAPP.view.workflow.Escalation'
		, 'IMSAPP.view.workflow.WorkflowController'
		, 'IMSAPP.store.combo.UserTypes'
		, 'IMSAPP.store.combo.IssueTypes'
		, 'IMSAPP.store.combo.Categories'
		, 'IMSAPP.store.combo.SubCategories'
	]
	,layout	: {type: 'vbox'}
	//,title	: 'Workflow'
	,fieldDefaults: {labelWidth: 50}
	,defaults: {width: '100%', padding: 20, scrollable: true}
	,controller: 'workflow-controller'
	,initComponent: function()
	{
		var me = this;

		me.items	=
		[
			{
				xtype		: 'fieldset'
				,title		: 'Workflow Details'
				,fieldDefaults: {labelWidth: 100}
				,items		:
				[
					 {
						xtype		: 'fieldcontainer'
						,layout		: {type: 'hbox'}
						,labelWidth	: 100
						,items		:
						[
							{
								xtype		: 'textfield'
								,fieldLabel	: 'Name'
								,name		: 'name'
								,allowBlank	: false
								,flex		: 1
								,padding	: {right: 20}
								,checkChangeBuffer: 100
								,listeners	:
								{
									change: function(field, value)
									{
										var id = null;
										if (me.record)	id = me.record.getId();
										Utils.validateUniqueness(field, value, id, IMS.Urls.validateWorkflowName);
									}
								}
							},{
								xtype		: 'checkbox'
								,name		: 'isDefault'
								,fieldLabel	: 'Is Default Workflow'
								,inputValue	: false
								,labelWidth	: 150
								,listeners	:
								{
									change: 'onDefaultChange'
								}
							}
						]
					},{
						xtype		: 'textarea'
						,fieldLabel	: 'Description'
						,name		: 'description'
						,height		: 60
						,allowBlank	: false
					},{
						xtype		: 'fieldcontainer'
						,layout		: {type: 'hbox'}
						,items		:
						[
							{
								xtype		: 'customcombo'
								,fieldLabel	: 'User Type'
								,name		: 'userType'
								,store		: {type: 'usertypes', autoLoad: true}
								,allowBlank	: false
								,flex		: 1
								,padding	: {right: 20}
							},{
								xtype		: 'customcombo'
								,fieldLabel	: 'Issue Type'
								,name		: 'issueType'
								,store		: {type: 'issuetypes', autoLoad: true}
								,allowBlank	: false
								,flex		: 1
							}
						]
					},{
							xtype		: 'fieldcontainer'
							,layout		: {type: 'hbox'}
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
									,listeners	: {select : 'onCategorySelect'}
								},
								{
									xtype		: 'customcombo'
									,fieldLabel	: 'Sub Category'
									,name		: 'subCategory'
									,store		: {type: 'subcategories', autoLoad: false}
									,allowBlank	: false
									,flex		: 1
								}
							]
						}
				]
			},{
				xtype		: 'fieldset'
				,title		: 'Escalation Details'
				,flex		: 1
				,defaults	: {anchor: '-20'}
				,minHeight	: 150
				,items		:
				[
					{
						xtype		: 'escalation'
						,labelWidth	: 100
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
});
