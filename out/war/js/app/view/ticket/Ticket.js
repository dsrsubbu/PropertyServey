/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.ticket.Ticket',
{
	extend		: 'Ext.custom.form.Panel'
	,xtype		: 'ticket'
	,requires	:
	[
		 'IMSAPP.store.combo.CropStore'
		,'IMSAPP.store.combo.HybridStore'
		,'IMSAPP.store.combo.PincodeStore'
		,'IMSAPP.store.combo.DistrictStore'
		,'IMSAPP.view.ticket.TicketController'
		,'IMSAPP.store.combo.IssueTypes'
	]
	,layout			: {type: 'vbox'}
	,fieldDefaults	: {labelWidth: 100}
	,defaults		: {width: '100%'}
	,bodyPadding	: 15
	,controller		: 'ticket-controller'
	,initComponent	: function()
	{
		var me = this;
		me.items	=
		[
			{
				xtype		: 'fieldset'
				,border		: false
				,items		:
				[
					{
						xtype		: 'radiogroup'
						,fieldLabel	: 'I am'
						,columns	: 3
						,action		: 'userType'
						,allowBlank	: false
						,submitValue: false
						,items		:
						[
							 { boxLabel: 'Farmer' 		, name: 'userType'	, inputValue: CONSTANTS.USER_TYPE.FARMER	}
							,{ boxLabel: 'Retailer'		, name: 'userType'	, inputValue: CONSTANTS.USER_TYPE.RETAILER	}
							,{ boxLabel: 'Employee'		, name: 'userType'	, inputValue: CONSTANTS.USER_TYPE.EMPLOYEE	}
						]
						,listeners :{change : 'onUserTypeSelectionChange'}
					},{
						xtype		: 'radiogroup'
						,fieldLabel	: 'Raising For'
						,columns	: 3
						,allowBlank	: false
						,action		: 'raisingFor'
						,items		:
						[
							 { boxLabel: 'Farmer' 		, name: 'raisingfor'	, inputValue: CONSTANTS.USER_TYPE.FARMER	}
							,{ boxLabel: 'Retailer'		, name: 'raisingfor'	, inputValue: CONSTANTS.USER_TYPE.RETAILER	}
							,{ boxLabel: 'Self'			, name: 'raisingfor'	, inputValue: 3		}
						]
						,listeners : {change : 'onRaisingForSelectionChange'}
					},{
						xtype 	: 'hidden'
						,name 	: 'raisingForUserType'
					},{
						xtype		: 'radiogroup'
						,fieldLabel	: 'Issue Type'
						,columns	: 3
						,allowBlank	: false
						,items		:
						[
							 { boxLabel: 'Complaint' 	, name: 'issueType'	, inputValue: CONSTANTS.ISSUE_TYPE.COMPLAINT	,checked: true}
							,{ boxLabel: 'Query'		, name: 'issueType'	, inputValue: CONSTANTS.ISSUE_TYPE.QUERY		}
							,{ boxLabel: 'Feedback'		, name: 'issueType'	, inputValue: CONSTANTS.ISSUE_TYPE.FEEDBACK		}
							,{ boxLabel: 'Payback'		, name: 'issueType'	, inputValue: CONSTANTS.ISSUE_TYPE.PAYBACK		,disabled: true}
						]
					}
				]
			},{
				xtype		: 'fieldset'
				,layout		: 'hbox'
				,hidden		: true
				,itemId		: 'retailerSection'
				,disabled	: true
				//,margin		: '0 10'
				,padding	: 10
				,fieldDefaults: {labelAlign	: 'left'	,labelWidth	: 120}
				,items		:
				[
					{
						xtype		: 'numberfield'
						,fieldLabel	: '-- Mobile No'
						,name		: 'retailerMobileNo'
						,allowBlank	: false
						,hideTrigger: true
						,minLength	: 10
						,maxLength	: 10
						,width		: 300
						,listeners  : { blur : function(field)
							{
								var raisingForRadioGroup = me.down('radiogroup[action=raisingFor]');
								if (this.getValue())
								{
									Ext.Ajax.request(
									{
										url 		: './admin/checkUser'
										,params		: {mobileNo: this.getValue(),userType:raisingForRadioGroup.getValue().raisingfor}
										,method		: 'GET'
										,success	: function (response) 
										{
											if (response.responseText != "NOTEXIST" && response.responseText != "OTHER")
											{
												me.down('textfield[name=retailerName]').setReadOnly(true);
												me.down('textfield[name=retailerMobileNo]').setReadOnly(true);
												field.nextSibling('textfield[name=retailerName]').setValue(response.responseText);
											}
											else if(response.responseText == "OTHER")
											{
												Ext.Msg.alert('Warning','Other user existed with same number');
												me.down('textfield[name=retailerMobileNo]').setValue('');
												return;
											}
										}
										,failure: function (response) 
										{
											
										}
								  });
								}
								else{
									alert('Please provide mobile no.');return;
								}
							}
						  }
					},{
						xtype	: 'tbspacer' ,width : 20
					},
					{
						xtype		: 'textfield'
						,fieldLabel	: '-- Name'
						,name		: 'retailerName'
						,allowBlank	: false
						,flex		: 1
					}
				]
			},
			{
				xtype			: 'fieldcontainer'
				,border			: false
				,layout			: 'hbox'
				,fieldDefaults	: {labelAlign	: 'top'}
				,items			:
				[
					{
						xtype			: 'numberfield'
						,fieldLabel		: 'Mobile No'
						,name			: 'mobileNo'
						,readOnly		: true
						,value			: CURRENTUSER.MOBILE_NO
						,hideTrigger	: true
						,minLength		: 10
						,maxLength		: 10
						,flex			: 1
					},{
						xtype	: 'tbspacer' ,width : 20
					},{
						xtype			: 'textfield'
						,fieldLabel		: 'Name'
						,name			: 'name'
						,itemId			: 'name'
						,readOnly		: true
						,value			: CURRENTUSER.NAME
						,flex			: 1
					},{
						xtype : 'tbspacer' ,width : 20
					},{
						xtype			: 'customcombo'
						,fieldLabel		: 'Crop'
						,displayField	: 'name'
						,valueField		: 'id'
						,store			: {type: 'crops', autoLoad: true}
						,name			: 'crop'
						,allowBlank		: false
						,flex			: 1
						,listeners		: {select : 'onCropSelect'}
					},{
						xtype : 'tbspacer' ,width : 20
					},{
						xtype			: 'customcombo'
						,fieldLabel		: 'Hybrid'
						,name			: 'hybrid'
						,displayField	: 'name'
						,valueField 	: 'id'
						,allowBlank		: false
						,store			: {type: 'hybrids', autoLoad: false}
						,flex			: 1
					}
				]
			},{
				xtype			: 'fieldcontainer'
				,border			: false
				,layout			: 'hbox'
				,fieldDefaults	: {labelAlign	: 'top'}
				,items 			:
				[
					{
						xtype			: 'textfield'
						,fieldLabel		: 'Lot No'
						,name			: 'lotNo'
						,flex			: 1
					},{
						xtype : 'tbspacer' ,width : 20
					},{
						xtype			: 'customcombo'
						,fieldLabel		: 'District'
						,name			: 'district'
						,store			: {type: 'districts', autoLoad: true}
						,displayField	: 'name'
						,valueField		: 'id'
						,allowBlank		: false
						,flex			: 1
						,listeners		: {select: 'onDistrictSelect'}
					},{
						xtype : 'tbspacer' ,width : 20
					},{
						 xtype			: 'customcombo'
						,fieldLabel		: 'Pincode'
						,name			: 'pincode'
						,displayField	: 'pincode'
						,valueField		: 'id'
						,allowBlank		: false
						,store			: {type: 'pincodes', autoLoad: false}
						,flex			: 1
					},{
						xtype : 'tbspacer' ,width : 20
					},{
						xtype			: 'numberfield'
						,fieldLabel		: 'Damage(%)'
						,name			: 'damagePerc'
						,hideTrigger	: true
						,minValue		: 0
						,maxValue		: 100
						,flex			: 1
					}
				]
			},{
				xtype			: 'textarea'
				,fieldLabel		: 'Description'
				,name			: 'description'
				,labelAlign		: 'top'
				,grow			: true
				,height 		: 100
				,minHeight		: 50
				,allowBlank		: false
			},{
				xtype		: 'hidden'
				,name		: 'id'
			}
		];

		me.callParent(arguments);
	}
	,buttons	:
	[
		{
			xtype		: 'customformsubmitbutton'
			,formBind	: true
			,handler 	: 'submitTicket'
		}
	]
	,listeners:
	{
		afterrender: 'afterFormRender'
	}
});
