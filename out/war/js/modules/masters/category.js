/**
 * @author rabindranath.s
 */

var CATEGORY =	
{
	init: function()
	{
		this.defineCategry();
	}
	,defineCategry : function()
	{
		Ext.define('Category', 
		{
			extend	: 'Ext.data.Model',
			fields	:
			[
				 {	name: 'id'											}
				,{	name: 'name'										}
			]
		});
	}
	,getCategories: function(extraParams)
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
					 model		: 'Category'
					,proxy		: proxy
					,pageSize	: 20
					,autoLoad 	: false
					,autoDestroy: true
					,remoteSort	: true
					,remoteFilter: true
				});
	}
	,getCategoryGrid : function()
	{
		var me			=	this;
		var categoryGrid	=	Ext.create('Ext.custom.grid.Panel', 
		{
			title			: 'Category Details'
			,itemId			: 'categoryGrid'
			,store			: me.getCategories()
			,iconCls		: 'fa-crop'
			,tabConfig		: {title: 'Category'}
			,tbar			:
			[
				 {xtype : 'customtbarbutton'	,text: 'Add Category'		,iconCls:'fa-plus'	,handler:function(){me.addCategory(categoryGrid)}	}
				,{xtype : 'customtbarbutton'	,text: 'Edit Category'	,iconCls:'fa-edit'	,handler:function(){me.editCategory(categoryGrid)}	,itemId: 'editCategory'	,disabled : true	}
			]
			,columns		: 
			[
				 {	text : 'Name'			,dataIndex : 'name'		}
			]
			,listeners	: 
			{
				itemdblclick	: function(grid,record)
				{
					me.editCategory(categoryGrid);
				}
				,selectionchange	: function(selectionModel, records)
				{
					if(records.length > 0)
					{
						categoryGrid.down('button#editCategory').setDisabled(false);
					}
					else
					{
						categoryGrid.down('button#editCategory').setDisabled(true);	
					}
				}
			}
		});

		return categoryGrid;
	}
	
	,addCategory : function(categoryGrid)
	{
		var me = this;
		var form = me.getCategoryForm(categoryGrid).down('form#categoryForm');
	},
	editCategory : function(categoryGrid)
	{
		var me = this;
		var record = categoryGrid.getSelectionModel().getSelection()[0];
		var form = me.getCategoryForm(categoryGrid, record.get('id')).down('form#categoryForm');
		form.loadRecord(record);
	}
	,getCategoryForm : function(grid, id)
	{
		var me = this;
		var categoryForm = Ext.create('Ext.custom.form.Panel',
		{
			itemId			: 'categoryForm'
			,items			: 
			[
				{
					xtype		: 'hidden'
					,name		: 'id'	
				}
				,{
					xtype		: 'textfield'
					,name		: 'name'
					,itemId		: 'category'
					,fieldLabel	: 'Category'
					,allowBlank : false
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
						me.saveCategory(grid, categoryForm)
					}
				}
			]
		});

		return	Utils.showWindow({
			title	: "Category Info"
			,items	: categoryForm
			,width	: 400
		});
	}
	,saveCategory	: function(grid,categoryForm)
	{
		var me = this;
		var mask = Utils.showLoadMask(categoryForm.up('window')).show();
		categoryForm.submit({
			url		: './command?actionType=categoryService'
			,jsonSubmit : true
			,method	: 'POST'
			,success : function(form, action)
			{
				mask.destroy();
				categoryForm.up('window').close();
				Utils.showAlert('Success', action.result.message);
				grid.getStore().load();
			}
			,failure : function(form, action)
			{
				mask.destroy();
				Utils.showAlert('Failure',"Unable to save CategoryInfo");
			}
		});
	}
}

CATEGORY.init();
