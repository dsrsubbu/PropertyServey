/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.ticket.ShowTicketDetails',
{
	extend			: 'Ext.custom.form.Panel'
	,xtype			: 'showticketdetails'
	,layout			: {type: 'hbox'}
	,fieldDefaults	: {labelWidth: 100 }
	,defaults		: {width: '50%', padding: 20, scrollable: true}
	,initComponent	: function()
	{
		var me = this;
		me.items =
					[
						 {
							xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,labelWidth	: 100
							,items		:
							[
								{
									 xtype		: 'displayfield'
									,fieldLabel	: 'Ticket No :'
									,name		: 'ticketNo'
									,flex		: 1
									,padding	: {right: 20}
									,submitValue: false
								},
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
									,fieldLabel	: 'Mobile No :'
									,name		: 'mobileNo'
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
								,
								{
									xtype		: 'displayfield'
									,name		: 'description'
									,fieldLabel	: 'Description :'
									,flex		: 1
									,submitValue: false
								}/*,
								{
						            xtype: 'radiogroup',
						            action :  'satisfyChkbox',
						            hidden : true,
						            columns: 2,
						            vertical: true,
						            items: [
						                    { boxLabel: '<b>Satisfied?</b>'		 ,width : 100, name: 'satisfy', inputValue: '1' , checked: true},
						                    { boxLabel: '<b>Not Satisfied?</b>'  ,width : 150, name: 'satisfy', inputValue: '2' }
						            ]
						        }*/
							]
						},
						{
							 xtype		: 'fieldcontainer'
							,layout		: {type: 'vbox'}
							,labelWidth	: 100
							,items		:
							[
								{
									xtype		: 'hidden'
									,name		: 'id'
								},
								{
									xtype		: 'displayfield'
									,name		: 'crop'
									,fieldLabel	: 'Crop :'
									,flex		: 1
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'hybrid'
									,fieldLabel	: 'Hybrid :'
									,flex		: 1
									,submitValue: false
								},
								{
									 xtype		: 'displayfield'
									,fieldLabel	: 'District :'
									,name		: 'district'
									,flex		: 1
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'pincode'
									,fieldLabel	: 'Pincode :'
									,flex		: 1
									,submitValue: false
								},
								{
									xtype		: 'displayfield'
									,name		: 'lotNo'
									,fieldLabel	: 'Lot No :'
									,flex		: 1
									,submitValue: false
								},
								{
									 xtype		: 'displayfield'
									,fieldLabel	: 'Damage(%) :'
									,name		: 'damagePerc'
									,flex		: 1
									,submitValue: false
								}
							]
						}
		];
		me.callParent(arguments);
	},
	buttons		:
	[
		{
		    xtype: 'radiogroup',
		    action :  'satisfyChkbox',
		    hidden : true,
		    columns: 2,
		    vertical: true,
		    align : 'left',
		    items: [
		            { boxLabel: '<b>Satisfied?</b>'		 ,width : 100, name: 'satisfy', inputValue: true , checked: true},
		            { boxLabel: '<b>Not Satisfied?</b>'  ,width : 150, name: 'satisfy', inputValue: false }
		    ]
		},
		{
			xtype		: 'customformsubmitbutton'
			,text		: 'Close'
			,hidden		: true
			,action		: 'closeBtn'
			,handler	: function ()
			{
					var form = this.up('form');
					var grid = Ext.ComponentQuery.query('#ticketGrid')[0];
					var formValues = {};
					formValues.ticketId = this.up('form').getValues().id;
					var closeForm = Ext.create('Ext.custom.form.Panel',
							{
								itemId			: 'closeForm'
								,items			: 
								[
									{
										xtype		: 'textarea'
										,fieldLabel	: 'Enter Resolution'
										,name		: 'comments'
										,labelAlign	: 'top'
										,grow		: true
										,height 	: 150
										,allowBlank : false
									}
								]
								,buttons			:
								[
									{
										xtype	: 'customformcancelbutton'
									},
									{
										xtype	: 'customformsubmitbutton'
										,formBind : true
										,handler : function()
										{
											Utils.showProgresText();
											formValues.comments = closeForm.getValues().comments;
											Ext.Ajax.request(
											{
												url			: IMS.Urls.closeTicket
												,jsonData	: Ext.encode(formValues)
												,method		: 'POST'
												,success	: function(response)
												{
													var res = Ext.JSON.decode(response.responseText);
													if (res.success)
													{
														Utils.showAlert('Success', res.message);
														grid.getStore().load();
														closeForm.up('window').close();
														form.up('window').close();
													}
													else
													{
														Utils.showAlert('Success', res.message, Ext.Msg.ERROR);
														return;
													}
												}
												,failure	: function(response)
												{
													Utils.showAlert('Failure',"Unable to update ticket", Ext.Msg.ERROR);
												}
											});
										}
									}
								]
							});

							return	Utils.showWindow({
								title	: "Close Ticket"
								,items	: closeForm
								,width	: 400
							});
					
					
					
					
					
					
					
				/*	Utils.showProgresText();
					Ext.Ajax.request(
					{
						url			: IMS.Urls.closeTicket
						,jsonData	: Ext.encode(formValues)
						,method		: 'POST'
						,success	: function(response)
						{
							var res = Ext.JSON.decode(response.responseText);
							if (res.success)
							{
								Utils.showAlert('Success', res.message);
								grid.getStore().load();
								form.up('window').close();
							}
							else
							{
								Utils.showAlert('Success', res.message, Ext.Msg.ERROR);
								return;
							}
						}
						,failure	: function(response)
						{
							Utils.showAlert('Failure',"Unable to update ticket", Ext.Msg.ERROR);
						}
					});*/
				}
			},
			{
				xtype		: 'customformsubmitbutton'
				,text		: 'Submit'
				,hidden		: true
				,action		: 'submtBtn'
				,handler	: function ()
				{
					var form = this.up('form');
					var grid = Ext.ComponentQuery.query('#ticketGrid')[0];
					var satisfyChkboxValue = form.down('[action=satisfyChkbox]').getValue().satisfy;
					Utils.showProgresText();
					Ext.Ajax.request(
					{
						url			: IMS.Urls.userSatisfy
						,params		: {satisfy : satisfyChkboxValue,ticketId : form.getValues().id}
						,method		: 'GET'
						,success	: function(response)
						{
							Utils.showAlert('Success',"Ticket updated Successfully");
							grid.getStore().load();
							form.up('window').close();
						}
						,failure	: function(response)
						{
							Utils.showAlert('Failure',"Unable to update ticket", Ext.Msg.ERROR);
						}
					});
				}
			}
		]
	
});
