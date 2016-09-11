Ext.onReady(function()
{
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'under';
	
	Ext.define('Crop',
			{
	            extend	: "Ext.data.Model"
	            ,fields	: 
	            [
	                 {name :'id'     }
	                ,{name :'name'   }
	            ]
	        });
	Ext.define('Pincode',
			{
	            extend	: "Ext.data.Model"
	            ,fields	: 
	            [
	                 {name :'id'     }
	                ,{name :'pincode'   }
	            ]
	        });
	var cropStore =   Ext.create('Ext.data.Store',
			{
				 model 		: 'Crop'
				,autoLoad	: true
				,proxy		: 
				{
					type	: 'ajax'
					,url	: './unauthorised/comboData?actionType=cropService'
					,reader	: 'combojsonreader'
				}
			});
	var hybridStore =   Ext.create('Ext.data.Store',
			{
				 model 		: 'Crop'
				,autoLoad	: false
				,proxy		: 
				{
					type	: 'ajax'
					,url	: './unauthorised/getHybridsByCropId'
					,reader	: 'combojsonreader'
				}
			});
	var districtStore =   Ext.create('Ext.data.Store',
			{
				 model 		: 'Crop'
				,autoLoad	: true
				,proxy		: 
				{
					type	: 'ajax'
					,url	: './unauthorised/comboData?actionType=districtService'
					,reader	: 'combojsonreader'
				}
			});
	var pincodeStore =   Ext.create('Ext.data.Store',
			{
				 model 		: 'Pincode'
				,autoLoad	: false
				,proxy		: 
				{
					type	: 'ajax'
					,url	: './unauthorised/getPicodeByDistrct'
					,reader	: 'combojsonreader'
				}
			});

	var ticketForm = Ext.create('Ext.form.Panel', 
		   	{
	             frame			: false
	            ,bodyPadding	: 20
	            ,renderTo		: 'raise_issue'
	            ,cls			: 'ticketForm'
	            ,layout 		: 'vbox' 
	            ,buttonAlign 	: 'center'
	            ,fieldDefaults	: 
	            				{
					        		labelAlign	: 'left'
					        		,labelWidth	: 150
					        		,labelStyle	: 'font-weight:bold'
					        		,msgTarget  : 'side'
					        		,labelSeparator: ''
				            	}
		        ,items		: [
		              		   	{
		              		   		xtype  : 'fieldset'
		              		   		,border: false
		              		   		,items : [
													{
													    xtype		: 'radiogroup'
													   ,fieldLabel	: 'I am'
													   ,columns	: 3
													   ,width : 600
													   ,id :'userType'
													   ,allowBlank	: false
													   ,action : 'userType'
													   ,items: [
															         { boxLabel: 'Farmer' 		, name: 'userType'	, inputValue: 1 	}
															        ,{ boxLabel: 'Retailer'		, name: 'userType'	, inputValue: 2		}
															        ,{ boxLabel: 'Employee'		, name: 'userType'	, inputValue: 3		}
															    ]
														,listeners : { change : function()
														{
															Ext.getCmp('retailermobileNo').setValue('');
															Ext.getCmp('retailerName').setValue('');
															Ext.getCmp('retailerSection').setDisabled(true).hide();
															Ext.getCmp('raise_for').setValue(false);
															Ext.getCmp('raise_ret').setValue(false);
															Ext.getCmp('raise_self').setValue(false);
															switch(this.getValue().userType)
															{
																case 1 : 
																	Ext.getCmp('raise_for').setDisabled(true);
																	Ext.getCmp('raise_ret').setDisabled(true);
																	Ext.getCmp('raise_self').setDisabled(true);
																	Ext.getCmp('raise_self').setValue(true);
																break;
																case 2 : 
																	Ext.getCmp('raise_for').setDisabled(false);
																	Ext.getCmp('raise_ret').setDisabled(true);
																	Ext.getCmp('raise_self').setDisabled(false);
																break;
																case 3 : 
																	Ext.getCmp('raise_for').setDisabled(false);
																	Ext.getCmp('raise_ret').setDisabled(false);
																	Ext.getCmp('raise_self').setDisabled(false);
																break;
															}
														}}
													},
													{
													     xtype		: 'radiogroup'
													    ,fieldLabel	: 'Raising For'
													    ,columns	: 3
													    ,width 		: 600
													    ,allowBlank	: false
													    ,submitValue : false 
													    ,items: [
															         { boxLabel: 'Farmer' 	, name: 'raisingfor'	,id:'raise_for'		, inputValue: 1 	}
															        ,{ boxLabel: 'Retailer'	, name: 'raisingfor'	,id:'raise_ret'		, inputValue: 2		}
															        ,{ boxLabel: 'Self'		, name: 'raisingfor'	,id:'raise_self'	, inputValue: 3		}
															     ]
														,listeners : { change : function()
															{
																var raisingForCheckedField = this.getChecked().length && this.getChecked()[0];
																var issueTypeRadioGroup = ticketForm.down('[fieldLabel="Issue Type"]');
																var userTypeRadioGroup = ticketForm.down('radiogroup[action=userType]');
															
															if (Ext.getCmp('userType').getChecked().length && Ext.getCmp('userType').getChecked()[0])
															{
																if(this.getValue().raisingfor == 3)
																{
																	Ext.getCmp('raisingForUserType').setValue(Ext.getCmp('userType').getValue().userType);
																	issueTypeRadioGroup.down('[inputValue=4]').setDisabled(2 != userTypeRadioGroup.getValue().userType);
																}
																else
																{
																	Ext.getCmp('raisingForUserType').setValue(this.getValue().raisingfor);
																	
																}
																if (Ext.getCmp('userType').getValue().userType == 2 && this.getValue().raisingfor != 3)
																{
																	if (raisingForCheckedField)
																	{
																		Ext.getCmp('retailerSection').setDisabled(false).show();
																		ticketForm.down('[name=retailerMobileNo]').setFieldLabel('Farmer Mobile No');
																		ticketForm.down('[name=retailerName]').setFieldLabel('Farmer Name');
																	}
																}
																else if (this.getValue().raisingfor != 3 && Ext.getCmp('userType').getValue().userType == 3)
																{
																	if(raisingForCheckedField)
																	{
																		Ext.getCmp('retailerSection').setDisabled(false).show();
																		ticketForm.down('[name=retailerMobileNo]').setFieldLabel(raisingForCheckedField.boxLabel + ' Mobile No');
																		ticketForm.down('[name=retailerName]').setFieldLabel(raisingForCheckedField.boxLabel + ' Name');
																	}
																}
																else
																{
																	Ext.getCmp('retailerSection').setDisabled(true).hide();
																}
															}
															else
																{
																	if (raisingForCheckedField)
																	{
																		alert('Please select UserType(I am)');
																		this.reset();
																		return;
																	}
																}
														}}
													},
													{
													     xtype		: 'radiogroup'
													    ,fieldLabel	: 'Issue Type'
													    ,columns	: 2
													    ,width 		: 453
													    ,allowBlank	: false
													    ,items: [
															         { boxLabel: 'Complaint' 	, name: 'issueType'	, inputValue: 1		,checked: true}
															        ,{ boxLabel: 'Query'		, name: 'issueType'	, inputValue: 2		}
															        ,{ boxLabel: 'Feedback'		, name: 'issueType'	, inputValue: 3		}
															        ,{ boxLabel: 'Payback'		, name: 'issueType'	, inputValue: 4		,disabled : true}
															     ]
													},
													{
														xtype	: 'hidden'
														,name	: 'raisingForUserType'
														,id		: 'raisingForUserType'
													}
												]
		              		   				},
		              		 {
		              		   		xtype  : 'fieldcontainer'
		              		   		,border: false
		              		   		,layout :'hbox'
		              		   		,hidden : true
		              		   		,id :'retailerSection'
		              		   		,disabled : true
		              		   		,width : 900
	              		   			,fieldDefaults	: 
	              		   			{
	              		   				labelAlign	: 'top'
	              		   				,height		: 60
	              		   				,width		: 250
	              		   			 ,msgTarget  : 'side'
	              		   			}
		              		   		,items : [
												{
												    xtype		: 'numberfield'
													,fieldLabel	: 'Retailer Mobile No'
													,name		: 'retailerMobileNo'
													,id 		: 'retailermobileNo'
													,hideTrigger: true
													,maxLength	: 10
													,listeners : { blur : function()
														{
															if (this.getValue())
															{
																Ext.Ajax.request(
																{
																	url 		: './unauthorised/checkUser'
																	,params		: {mobileNo: this.getValue(),userType : Ext.getCmp('raisingForUserType').getValue()}
																	,method		: 'GET'
																	,success	: function (response) 
																	{
																		if (response.responseText == "NOTEXIST")
																		{
																			
																		}
																		else if (response.responseText == "OTHER")
																		{
																			Ext.Msg.alert('Warning','Other User exist with the same mobile no.');
																			Ext.getCmp('retailermobileNo').setValue('');
																			Ext.getCmp('retailerName').setValue('');
																			return;
																		}
																		else
																		{
																			ticketForm.down('[name=retailerName]').setValue(response.responseText);
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
												},{xtype : 'tbspacer' ,width : 100},
												{
												    xtype		: 'textfield'
												   ,fieldLabel	: 'Retailer Name'
												   ,name		: 'retailerName'
												   ,id 			: 'retailerName'
												}
		              		   		          ]
		              		 },
		              		 {
		              		   		xtype  : 'fieldcontainer'
		              		   		,border: false
		              		   		,layout :'hbox'
		              		   		,width : 900
		              		   		,fieldDefaults	: 
		            				{
						        		labelAlign	: 'top'
						        		,height		: 60
						        		,width		: 250
						        		 ,msgTarget  : 'side'
					            	}
		              		   		,items : [
													{
													     xtype		: 'numberfield'
														,fieldLabel	: 'Mobile No'
														,name		: 'mobileNo'
														,id 		: 'mobileNo'
														,hideTrigger: true
														,emptyText : 'Mobile No'
														,maxLength	: 10
														,allowBlank	: false
														,listeners : { blur : function()
															{
																if (this.getValue())
																{
																	if (Ext.getCmp('retailermobileNo').getValue() && Ext.getCmp('retailermobileNo').getValue() == this.getValue())
																	{
																		alert('Two mobile numbers should not be same');
																		this.setValue('');
																		return;
																	}
																	Ext.Ajax.request(
																	{
																				url 		: './unauthorised/sendOTP'
																				,params		: {mobileNo: this.getValue(),userType : Ext.getCmp('userType').getValue().userType}
																				,method		: 'GET'
																				,success	: function (response) 
																				{
																					if (response.responseText == "NOTEXIST")
																					{
																						Ext.getCmp('mobileNo').setDisabled(true);
																						Ext.getCmp('validate').show();
																						Ext.getCmp('otp').show();
																						hideFields(ticketForm,false);
																						Ext.getCmp('isUserExist').setValue(false);
																					}
																					else if (response.responseText == "OTHER")
																					{
																						Ext.Msg.alert('Warning','Other User exist with the same mobile no.');
																						Ext.getCmp('mobileNo').setValue('');
																						return;
																					}
																					else
																					{
																						Ext.getCmp('mobileNo').setDisabled(true);
																						Ext.getCmp('validate').show();
																						Ext.getCmp('otp').show();
																						hideFields(ticketForm,false);
																						ticketForm.down('[name=name]').setValue(response.responseText);
																						Ext.getCmp('isUserExist').setValue(true);
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
												    },{xtype : 'tbspacer' ,width : 100}
												    ,{
													     xtype		: 'textfield'
														,id			: 'otp'
														,hidden		: true
														,fieldLabel	: 'Enter OTP'
														,emptyText  : 'Enter OTP'
												    },
												    {
												    	xtype : 'button'
												    	,text : 'Validate'
												    	,id : 'validate'
												    	,hidden	: true
												    	,handler : function(){validateOTP(Ext.getCmp('otp').getValue(),Ext.getCmp('mobileNo').getValue())}
												    },
												    {
													     xtype		: 'textfield'
													    ,fieldLabel	: 'Name'
													    ,name		: 'name'
													    ,allowBlank	: false
													    ,emptyText : 'Name'
													    ,id : 'name'
													}
		              		   		         ]
		              		   },
		              		 {
		              		   		xtype  : 'fieldcontainer'
		              		   		,border: false
		              		   		,layout :'hbox'
		              		   		,width : 900
		              		   		,fieldDefaults	: 
		            				{
						        		labelAlign	: 'top'
						        		,height		: 60
						        		,width		: 250
						        		 ,msgTarget  : 'side'
					            	}
		              		   		,items : [
		              		   		            {
													     xtype		: 'combo'
														,fieldLabel	: 'Crop'
														,displayField:'name'
														,valueField : 'id'
														,store : cropStore
														,name		: 'crop'
														,forceSelection: true
														,queryMode    : 'local'
														,emptyText : 'Crop'
														,typeAhead    : true
														,allowBlank	: false
														,listeners : { select : function()
														{
															hybridStore.getProxy().extraParams['cropId'] = this.getValue();
															hybridStore.load();
														}
													  }
												    },
													 {xtype : 'tbspacer' ,width : 100}
													,{
													     xtype		: 'combo'
														,fieldLabel	: 'Hybrid'
														,name		: 'hybrid'
														,displayField:'name'
														,valueField : 'id'
														,forceSelection: true
														,queryMode    : 'local'
														,emptyText : 'Hybrid'
														,typeAhead    : true
														,allowBlank	: false
														,store : hybridStore
												     }
		              		   		         ]
		              		   },
			              	   {
		              		   		xtype  : 'fieldcontainer'
		              		   		,border: false
		              		   		,layout :'hbox'
		              		   		,width : 900
		              		   		,fieldDefaults	: 
		            				{
						        		labelAlign	: 'top'
						        		,height		: 60
						        		,width		: 250
						        		 ,msgTarget  : 'side'
					            	}
		              		   		,items : [		{
													     xtype		  : 'combo'
														,fieldLabel	  : 'District'
														,name		  : 'district'
														,store		  : districtStore
														,displayField :'name'
														,valueField   : 'id'
														,forceSelection: true
														,emptyText : 'District'
														,queryMode    : 'local'
														,typeAhead    : true
														,allowBlank	  : false
														,listeners 	  : { select : function()
														  {
																pincodeStore.getProxy().extraParams['districtId'] = this.getValue();
																pincodeStore.load();
														   }
														 }
												    },
													 {xtype : 'tbspacer' ,width : 100}
													,{
														 xtype		  : 'combo'
														,fieldLabel	  : 'Pincode'
														,name		  : 'pincode'
														,displayField :'pincode'
														,valueField   : 'id'
														,forceSelection: true
														,queryMode    : 'local'
														,typeAhead    : true
														,emptyText : 'Pincode'
														,allowBlank	  : false
														,store		  : pincodeStore
												    }
		              		   		         ]
		              		   },
		              		   {
		              		   		xtype  : 'fieldcontainer'
		              		   		,border: false
		              		   		,layout :'hbox'
		              		   		,width : 900
		              		   		,fieldDefaults	: 
		            				{
						        		labelAlign	: 'top'
						        		,height		: 60
						        		,width		: 250
						        		 ,msgTarget  : 'side'
					            	}
		              		   		,items : [		{
												     	xtype		: 'textfield'
														,fieldLabel	: 'Lot No'
														,name		: 'lotNo'
														,emptyText  : 'Lot No'
		              		   						},
													 {xtype : 'tbspacer' ,width : 100}
												    ,{
													     xtype		: 'numberfield'
														,fieldLabel	: 'Damage(%)'
														,name		: 'damagePerc'
														,hideTrigger: true
														,emptyText : 'Damage(%)'
														
												    }
		              		   		         ]
		              		   },{xtype : 'tbspacer' ,height : 20},
		              		   {

								     xtype		: 'textarea'
									,fieldLabel	: 'Description'
									,name		: 'description'
									,labelAlign	: 'top'
									,width 		: 600
									,grow		: true
									,allowBlank	: false
									,height 	: 120
									,emptyText : 'Description'
									 ,msgTarget  : 'side'
		              		   },
		              		   {
		              			   xtype :'hidden'
		              			  ,name : 'id'
		              		   },
		              		   {
		              			   xtype :'hidden'
		              			  ,name : 'isUserExist'
		              			  ,id 	: 'isUserExist'
		              		   }
		             ]
		        ,buttons : [
		                    	 {text : 'Submit' ,cls:'ysubmit' ,formBind : true ,itemId: 'submit',handler : function(){raiseTicket(ticketForm)}}
		                    	,{text : 'Clear' ,cls:'xsubmit' ,handler : function(){clearTicket(ticketForm)}}
		                   ]
		   	});
	function clearTicket(ticketForm)
	{
		ticketForm.getForm().reset();
		Ext.getCmp('raise_for').setDisabled(false);
		Ext.getCmp('raise_ret').setDisabled(false);
		Ext.getCmp('raise_self').setDisabled(false);
		Ext.getCmp('validate').hide();
		Ext.getCmp('otp').hide();
		hideFields(ticketForm,true);
	}
	function raiseTicket(ticketForm)
	{
		var mask = Utils.showLoadMask(ticketForm).show();
		Ext.getCmp('mobileNo').setDisabled(false);
		var formValues = ticketForm.getValues();
		var array = [];
		array.push(formValues);
		Ext.Ajax.request(
		{
			url			: './unauthorised/raiseTicket'
			,jsonSubmit : true
			,method		: 'POST'
			,jsonData	: Ext.encode(array)
			,success 	: function(response)
			{
				var res = Ext.JSON.decode(response.responseText);
				console.log(res);
				mask.destroy();
				if (res.code == 100)
				{
					clearTicket(ticketForm);
					Ext.getCmp('raise_for').setDisabled(false);
					Ext.getCmp('raise_ret').setDisabled(false);
					Ext.getCmp('raise_self').setDisabled(false);
					Utils.showAlert('Success', "Ticket created successfully.<br> PLease not down below ticket no for future use.<br><b>Ticket No : " + res.ticketNo+"</b>");
					return;
				}
				Utils.showAlert('Success', "Unable to create ticket");
				return;
			}
			,failure : function(response)
			{
				mask.destroy();
				Utils.showAlert('Success', "Unable to create ticket");
			}
		});
	}
	//==========================
	
	 var loginWindow = new Ext.Window(
	    		{
	    			id			: 'loginWindow'
	    			,title 		: 'Login'
	    			,modal 		: true
	    			,autoHeight : true
	    			,layout		: {type: 'fit'}
	       			,items 		: []
	       			,draggable	: false
	    		});
	 
	 function hideFields(ticketForm,hide)
	 {
		ticketForm.down('[name=name]').setVisible(hide);
		ticketForm.down('[name=crop]').setVisible(hide);
		ticketForm.down('[name=hybrid]').setVisible(hide);
		ticketForm.down('[name=lotNo]').setVisible(hide);
		ticketForm.down('[name=district]').setVisible(hide);
		ticketForm.down('[name=pincode]').setVisible(hide);
		ticketForm.down('[name=damagePerc]').setVisible(hide);
		ticketForm.down('[name=description]').setVisible(hide);
		ticketForm.down('[name=description]').setVisible(hide);
		ticketForm.down('[itemId=submit]').setVisible(hide);
	 }
	 
	 function validateOTP(otp,mobileNo)
	 {
		if (!otp)
		{
			alert("Please enter OTP");
			return;
		}
		Ext.Ajax.request(
		{
			url 		: './unauthorised/validateOTP'
			,params		: {otp: otp,mobileNo:mobileNo,type:'WEB'}
			,method		: 'GET'
			,success	: function (response) 
			{
				var json = Ext.decode(response.responseText)
				if (json.code == "100" || json.code == 100)
				{
					Ext.getCmp('mobileNo').readOnly = true;
					Ext.getCmp('validate').hide();
					Ext.getCmp('otp').hide();
					hideFields(ticketForm,true);
				}
				else Ext.Msg.alert('Failure',"Not a Valid OTP");
			}
			,failure: function (response) 
			{
				
			}
		});
	 }
});