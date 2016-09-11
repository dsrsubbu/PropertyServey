/**
 * @author rabindranath.s
 */

var USER =	
{
	init: function()
	{
		this.defineUser();
	}
	,roles		: null
	,crops		: null
	,defineUser : function()
	{
		Ext.define('User', 
		{
			extend	: 'Ext.data.Model',
			fields	:
			[
				 {	name:  'id'														}
				,{	name:  'name'													}
				,{	name:  'userName'												}
				,{	name:  'mobileNo'  												}
				,{	name:  'emailId'												}
				,{	name:  'roleName'				,mapping: 'role.name'			}
				,{	name:  'role'					,mapping: 'role.id'				}
				,{	name:  'userTypeName'			,mapping: 'userType.name'		}
				,{	name:  'userType'				,mapping: 'userType.id'			}
				,{	name:  'commercialUnitName'		,mapping: 'commercialUnit.name'	}
				,{	name:  'commercialUnit'			,mapping: 'commercialUnit.id'	}
				,{	name:  'regionName'				,mapping: 'region.name'			}
				,{	name:  'region'					,mapping: 'region.id'			}
				,{	name:  'districtName'			,mapping: 'district.name'		}
				,{	name:  'district'				,mapping: 'district.id'			}
				,{	name:  'status'													}
				,{	name:  'empId'													}
			 ]
		});
	}
	,getUsers: function(extraParams)
	{
		var proxy = {
				type		: 'ajax'
				,url		: IMS.Urls.gridData
				,extraParams: {actionType : 'userInfoService'}
				,reader		: 'jsonreader'
			}

		if (extraParams) proxy.extraParams.extraParams = extraParams;

		return Ext.create('Ext.data.Store',
				{
					 model	: 'User'
					,proxy	: proxy
					,pageSize	: 20
					,autoLoad 	: true
					,autoDestroy: true
					,remoteSort	: true
					,remoteFilter: true
				});
	}
	,getUserGrid : function()
	{
		var me			=	this;
		var userGrid	=	Ext.create('Ext.custom.grid.Panel', 
		{
			title			: 'User Details'
			,itemId			: 'userGrid'
			,store			: me.getUsers()
			,iconCls		: 'fa-user'
			,tbar			:
			[
				 {xtype : 'customtbarbutton'	,text : 'Add User'	,iconCls:'fa-plus'	,handler : function() {me.getUserForm(userGrid)}	}
				// {xtype : 'customtbarbutton'	,text : 'Add User'	,iconCls:'fa-plus'	,handler : function() {me.uploadFile(userGrid)}		}
			]
			,columns		: 
			[
			 	 {	text : 'Role'				,dataIndex : 'roleName'				}
				,{	text : 'Name'				,dataIndex : 'name'					}
				,{	text : 'User Name'			,dataIndex : 'userName'				}
				,{	text : 'EmpId'				,dataIndex : 'empId'				}
				,{	text : 'Email Id'			,dataIndex : 'emailId'				}
				,{	text : 'Mobile No'			,dataIndex : 'mobileNo'				}
				,{	text : 'District'			,dataIndex : 'districtName'			}
				,{	text : 'Region'				,dataIndex : 'regionName'			}
				,{	text : 'CU'					,dataIndex : 'commercialUnitName'	}
				,{	text : 'User Type'			,dataIndex : 'userTypeName'			}
				,{	text : 'Status'				,dataIndex : 'status'				}
			]
			,listeners	: 
			{
				
			}
		});
		return userGrid;
	},
	getUserForm : function(userGrid)
	{
		var me = this;
		var userForm = Ext.create('Ext.custom.form.Panel',
				{
					itemId			: 'userForm'
					,defaultType	: 'textfield'
					,fieldDefaults	: {labelWidth: 100}
					,items			: 
					[
						{
							xtype		: 'hidden'
							,name		: 'id'
						},
						{
							xtype		: 'hidden'
							,name		: 'role'
							,value 		: 20
						}
						,{
							xtype		: 'hidden'
							,name		: 'userType'
							,value 		: 3
						}
						,{
							xtype		: 'hidden'
							,name		: 'status'
							,value 		: 'Open'
						}
						,{
							xtype		: 'textfield'
							,fieldLabel	: 'Role'
							,name		: 'roless'
							,allowBlank	: false
							,value		: 'Customer Care'
							,readOnly	: true
						},
						{
							xtype		: 'textfield'
							,fieldLabel	: 'Name'
							,name		: 'name'
							,allowBlank	: false
						},
						{
							xtype		: 'textfield'
							,fieldLabel	: 'Emp Id'
							,name		: 'empId'
						}
						,{
							fieldLabel		: 'Login Id'
							,name			: 'userName'
							,allowBlank		: false
							,checkChangeBuffer: 100
							,listeners		: 
							{
								change: function(field, value)
								{
									var id;
									Utils.validateUniqueness(field, value, id, IMS.Urls.validateLoginId);
								}
							}
							
						},
						{
							xtype 		: 'textfield'
							,fieldLabel	: 'Password'
							,name		: 'password'
							,allowBlank	: false
						}
						,{
							fieldLabel	: 'Email Id'
							,name		: 'emailId'
							,vtype		: 'email'
							,allowBlank	: false
						}
						,{
							xtype		: 'numberfield'
							,fieldLabel	: 'Mobile No'
							,hideTrigger: true
							,name		: 'mobileNo'
							,enforceMaxLength	: true
							,minLength	: 10
							,maxLength	: 10
							,allowBlank	: false
						}
					]
					,buttons	: 
					[
						{
							xtype	: 'customformcancelbutton'
						},{
							xtype	: 'customformsubmitbutton'
							,handler : function()
							{
								me.saveUser(userForm, userGrid)
							}
						}
					]
				});
			return	Utils.showWindow({
					title	: 'Create User'
					,items	: userForm
					,width	: 500
				});
	}
	,saveUser : function(userForm, userGrid)
	{
		var me = this;
		var data = userForm.getValues();
		var mask = Utils.showLoadMask(userForm.up('window')).show();
		userForm.submit({
			url		: './command?actionType=userInfoService'
			,jsonSubmit : true
			,method	: 'POST'
			,success : function(form, action)
			{
				mask.destroy();
				userForm.up('window').close();
				Utils.showAlert('Success', action.result.message);
				userGrid.getStore().load();
			}
			,failure : function(form, action)
			{
				mask.destroy();
				Utils.showAlert('Failure',action.result.message);
			}
		});
	}
	,uploadFile : function()
	{
		Ext.Ajax.request({
			url		: './parivaarDataSync/uploadFile'
			,method	: 'POST'
			,success : function(response)
			{
			}
			,failure : function(form, action)
			{
				
			}
		});
	}
}

USER.init();
