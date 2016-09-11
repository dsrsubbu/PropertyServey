/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.CreateIssue',
{
	extend		: 'Ext.custom.form.Panel'
	,xtype		: 'createissue'
	,requires	:
	[
		  'IMSAPP.store.combo.CropStore'
		, 'IMSAPP.store.combo.HybridStore'
		, 'IMSAPP.store.combo.PincodeStore'
		, 'IMSAPP.store.combo.DistrictStore'
	]
	,layout			: {type: 'vbox'}
	,fieldDefaults	: {labelWidth: 100}
	,defaults		: {width: '100%', padding: 20, scrollable: true}
	,controller		: 'issuegrid-controller'
	,initComponent	: function()
	{
		var me = this;
		me.items	=
			[
   		   		{
   		   			xtype  : 'fieldset'
   		   			,border : false
   		   			,items  : [
								{
									xtype		: 'radiogroup'
									,fieldLabel	: 'Issue Type'
									,columns	: 3
									,items		: [
									      		   	 { boxLabel: 'Complaint' 	, name: 'issueType'	, inputValue: 1		}
												    ,{ boxLabel: 'Query'		, name: 'issueType'	, inputValue: 1		}
												    ,{ boxLabel: 'Feedback'		, name: 'issueType'	, inputValue: 1		}
												   ]
									},
									{
									     xtype		: 'radiogroup'
									    ,fieldLabel	: 'I am'
									    ,columns	: 3
									    ,width : 900
									    ,id :'userType'
									    ,items: [
											         { boxLabel: 'Farmer' 		, name: 'userType'	, inputValue: 1 	}
											        ,{ boxLabel: 'Retailer'		, name: 'userType'	, inputValue: 2		}
											        ,{ boxLabel: 'Employee'		, name: 'userType'	, inputValue: 3		}
											    ]
										,listeners : { change : function(){
											
											switch(this.getValue().userType)
											{
												case 1 : 
													Ext.getCmp('raise_for').setDisabled(true);
													Ext.getCmp('raise_ret').setDisabled(true);
													Ext.getCmp('raise_self').setDisabled(false);
												break;
												case 2 : 
													Ext.getCmp('raise_for').setDisabled(false);
													Ext.getCmp('raise_ret').setDisabled(true);
													Ext.getCmp('raise_self').setDisabled(false);
												break;
												case 3 : 
													Ext.getCmp('raise_for').setDisabled(false);
													Ext.getCmp('raise_ret').setDisabled(false);
													Ext.getCmp('raise_self').setDisabled(true);
												break;
											}
										}}
									},
									{
									     xtype		: 'radiogroup'
									    ,fieldLabel	: 'Raising For'
									    ,columns	: 3
									    ,items: [
											         { boxLabel: 'Farmer' 	, name: 'raisingfor'	,id:'raise_for'		, inputValue: 1 	}
											        ,{ boxLabel: 'Retailer'	, name: 'raisingfor'	,id:'raise_ret'		, inputValue: 2		}
											        ,{ boxLabel: 'Self'		, name: 'raisingfor'	,id:'raise_self'	, inputValue: 3		}
											     ]
										,listeners : { change : function()
										{
											if(this.getValue().raisingfor == 3)
											{
												Ext.getCmp('raisingForUserType').setValue(Ext.getCmp('userType').getValue().userType);
											}
											else
											{
												Ext.getCmp('raisingForUserType').setValue(this.getValue().raisingfor);
											}
										}}
									 },
				              		 {
				              		    xtype 	:'hidden'
				              		   ,name 	: 'raisingForUserType'
				              		   ,id 		: 'raisingForUserType'
				              		  }
   		   		         ]
   		  },
   		 {
   		   		xtype  : 'fieldcontainer'
   		   		,border: false
   		   		,layout :'hbox'
   		   		,fieldDefaults	: 
 				{
		        		labelAlign	: 'top'
	            }
   		   		,items : [
									
									{
									     xtype		: 'numberfield'
										,fieldLabel	: 'Mobile No'
										,name		: 'mobileNo'
										,hideTrigger: true
										,maxLength	: 10
										,listeners : { blur : function()
											{
												if (this.getValue())
												{
													Ext.Ajax.request(
															{
																url 		: './admin/checkUser'
																,params		: {mobileNo: this.getValue()}
																,method		: 'GET'
																,success	: function (response) 
																{
																	if (response.responseText != "NOTEXIST")
																	{
																		Ext.ComponentQuery.query('#name')[0].setValue(response.responseText);
																		//this.nextSibling('textfield[name=name]').setValue(response.responseText);
																	}
																}
																,failure: function (response) 
																{
																	
																}
															});
												}
											}
										  }
								    },{xtype : 'tbspacer' ,width : 20}
								    ,{
									     xtype		: 'textfield'
									    ,fieldLabel	: 'Name'
									    ,name		: 'name'
									    ,itemId		: 'name'
									},
									 {xtype : 'tbspacer' ,width : 20}
									,{
									     xtype		: 'combo'
										,fieldLabel	: 'Crop'
										,displayField:'name'
										,valueField : 'id'
										,store		: {type: 'crops', autoLoad: true}
										,name		: 'crop'
										,forceSelection: true
										,queryMode    : 'local'
										,typeAhead    : true
										,allowBlank	: false
										,listeners : { select : function(combo)
										{
											var comboa = this.nextSibling('combo[name=hybrid]');
											comboa.store.getProxy().extraParams['extraParams'] = this.getValue();
											comboa.store.load();
										}
									  }
								    },
									 {xtype : 'tbspacer' ,width : 20}
									,{
									     xtype		: 'combo'
										,fieldLabel	: 'Hybrid'
										,name		: 'hybrid'
										,displayField:'name'
										,valueField : 'id'
										,forceSelection: true
										,queryMode    : 'local'
										,typeAhead    : true
										,allowBlank	: false
										,store		: {type: 'hybrids', autoLoad: false}
								     }
   		   		         ]
   		   },
       	   {
   		   		xtype  : 'fieldcontainer'
   		   		,border: false
   		   		,layout :'hbox'
   		   		,fieldDefaults	: 
 				{
		        		labelAlign	: 'top'
	            	}
   		   		,items : [		{
								     	xtype		: 'textfield'
										,fieldLabel	: 'Lot No'
										,name		: 'lotNo'
   		   						},
									 {xtype : 'tbspacer' ,width : 20}
									,{
									     xtype		  : 'combo'
										,fieldLabel	  : 'District'
										,name		  : 'district'
										,store		  : {type: 'districts', autoLoad: true}
										,displayField :'name'
										,valueField   : 'id'
										,forceSelection: true
										,queryMode    : 'local'
										,typeAhead    : true
										,allowBlank	  : false
										,listeners 	  : { select : function()
										  {
												var comboa = this.nextSibling('combo[name=pincode]');
												comboa.store.getProxy().extraParams['extraParams'] = this.getValue();
												comboa.store.load();
										   }
										 }
								    },
									 {xtype : 'tbspacer' ,width : 20}
									,{
										 xtype		  : 'combo'
										,fieldLabel	  : 'Pincode'
										,name		  : 'pincode'
										,displayField :'pincode'
										,valueField   : 'id'
										,forceSelection: true
										,queryMode    : 'local'
										,typeAhead    : true
										,allowBlank	  : false
										,store		: {type: 'pincodes', autoLoad: false}
								    },
									 {xtype : 'tbspacer' ,width : 20}
								    ,{
									     xtype		: 'numberfield'
										,fieldLabel	: 'Damage(%)'
										,name		: 'damagePerc'
										,hideTrigger: true
								    }
   		   		         ]
   		   },{xtype : 'tbspacer' ,height : 20},
   		   {

				     xtype		: 'textarea'
					,fieldLabel	: 'Description'
					,name		: 'description'
					,labelAlign	: 'top'
					,width 		: 500
					,grow		: true
					,height 	: 120
   		   },
   		   {
   			   xtype :'hidden'
   			  ,name : 'id'
   		   }
   	];
		me.callParent(arguments);
	}
	,buttons		:
		[
			{
				xtype		: 'customformsubmitbutton'
				,formBind	: true
				,handler 	: 'submitTicket'
			}
		]
});
