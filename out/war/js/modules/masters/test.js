/**
 * @author suman.t
 */

var TEST =	
{
	init: function()
	{
		this.defineTest();
	}
	,defineTest : function()
	{
		Ext.define('Test', 
		{
			extend	: 'Ext.data.Model',
			fields	:
			[
				 {	name: 'id'		}
				,{	name: 'name'	}
			]
		});
	}
	,getTests: function(extraParams)
	{
		var proxy = {
				type		: 'ajax'
				,url		: IMS.Urls.gridData
				,extraParams: {actionType : 'categoryService'}
				,reader		: 'jsonreader'
			}

		if (extraParams) proxy.extraParams.extraParams = extraParams;

		return Ext.create('Ext.data.Store',
				{
					 model	: 'Test'
					,proxy	: proxy
					,pageSize	: 20
					,autoLoad 	: false
					,autoDestroy: true
					,remoteSort	: true
					,remoteFilter: true
				});
	}
	,getTestGrid : function()
	{
		var me			=	this;
		var testGrid	=	Ext.create('Ext.custom.grid.Panel', 
		{
			title			: 'Category Details'
			,itemId			: 'testGrid'
			,store			: me.getTests()
			,iconCls		: 'fa-crop'
			,tbar			:
			[
				 {xtype : 'customtbarbutton'	,text: 'Add Category'		,iconCls:'fa-plus'	,handler:function(){me.addTest(testGrid)}	}
			]
			,columns		: 
			[
				 {	text : 'Name'			,dataIndex : 'name'		}
			]
			
		});

		return testGrid;
	}
	
	,addTest : function(categoryGrid)
	{
		var me = this;
		var form = me.getTestForm(categoryGrid).down('form#testForm');
	}
	,getTestForm : function(grid, id)
	{
		var me = this;
		var testForm = Ext.create('Ext.custom.form.Panel',
		{
			itemId			: 'testForm'
			,layout			: 'vbox'
			,items			: 
			[
			 	{
		 				xtype  : 'fieldcontainer'
				 	   ,layout : 'hbox'
				 	   ,items  : [
									{
										xtype		: 'textfield'
										,name		: 'name'
										,itemId		: 'category'
										,fieldLabel	: 'Category'
										,allowBlank : false
										,padding	: {right: 20}
									},
									{
										xtype : 'filefield'
										,name : 'file'
										,fieldLabel	: 'File'
										,padding	: {right: 20}
									}
									,
									{
										xtype : 'button'
										,name : 'btn'
										,text :'Add'
										,handler : me.addElemelnts
									}
				 	        ]
				 	}
			]
			,buttons			:
			[
				{
					xtype	: 'customformcancelbutton'
				},{
					xtype	: 'customformsubmitbutton'
					,handler : function()
					{
						me.saveTest(grid, testForm)
					}
				}
			]
		});

		return	Utils.showWindow({
			title	: "Category Info"
			,items	: testForm
			,width	: 800
		});
	}
	,addElemelnts : function()
	{
		var me = this;
		var form = me.up('form#testForm');
		var items = {
 						xtype  : 'fieldcontainer'
 						,layout : 'hbox'
 						,items  : [
							{
								xtype		: 'textfield'
								,name		: 'name'
								,itemId		: 'category'
								,fieldLabel	: 'Category'
								,allowBlank : false
								,padding	: {right: 20}
							},
							{
								xtype : 'filefield'
								,name : 'file'
								,fieldLabel	: 'File'
								,padding	: {right: 20}
							}
							,
							{
								xtype : 'button'
								,name : 'delbtn'
								,text :'Delete'
								,handler: function (button) 
								{
									button.ownerCt.destroy();
								}
							}
		 	        ]
		 	};
		form.add(items);
	}
	,saveTest	: function(grid,categoryForm)
	{
		var me = this;
		categoryForm.submit({
			 url		: './admin/uploadFile'
			,method	: 'POST'
			,success : function(form, action)
			{
				
			}
			,failure : function(form, action)
			{
			}
		});
	}
}

TEST.init();
