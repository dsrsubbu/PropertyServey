/**
 * @author rabindranath.s
 */

var SUBCATEGORY =	
{
	init: function()
	{
		this.defineSubCategory();
	}
	,categorys	: null
	,defineSubCategory : function()
	{
		Ext.define('SubCategory', 
		{
			extend	: 'Ext.data.Model',
			fields	:
			[
				 {	name: 'id'											}
				,{	name: 'name'										}
				,{	name: 'categoryName'			,mapping: 'category.name'	}
				,{	name: 'category'				,mapping: 'category.id'		}
			]
		});
	}
	,getSubCategorys: function(extraParams)
	{
		var proxy = {
				type		: 'ajax'
				,url		: IMS.Urls.gridData
				,extraParams: {actionType : 'subCategoryService'}
				,reader		: 'jsonreader'
			}

		if (extraParams) proxy.extraParams.extraParams = extraParams;

		return Ext.create('Ext.data.Store',
				{
					 model	: 'SubCategory'
					,proxy	: proxy
					,pageSize	: 20
					,autoLoad 	: false
					,autoDestroy: true
					,remoteSort	: true
					,remoteFilter: true
				});
	}
	,getSubCategoryGrid : function()
	{
		var me			=	this;
		me.categorys = me.getCategoryStore();
		var subCategoryGrid	=	Ext.create('Ext.custom.grid.Panel', 
		{
			title			: 'SubCategory Details'
			,itemId			: 'subCategoryGrid'
			,store			: me.getSubCategorys()
			,iconCls		: 'fa-crop'
			,tabConfig		: {title: 'SubCategory'}
			,tbar			:
			[
				 {xtype : 'customtbarbutton'	,text: 'Add SubCategory'		,iconCls:'fa-plus'	,handler:function(){me.addSubCategory(subCategoryGrid)}	}
				,{xtype : 'customtbarbutton'	,text: 'Edit SubCategory'	,iconCls:'fa-edit'	,handler:function(){me.editSubCategory(subCategoryGrid)}	,itemId: 'editSubCategory'	,disabled : true	}
			]
			,columns		: 
			[
				 {	text : 'Name'			,dataIndex : 'name'			}
				,{	text : 'Category Name'		,dataIndex : 'categoryName'		}
			]
			,listeners	: 
			{
				itemdblclick	: function(grid,record)
				{
					me.editSubCategory(subCategoryGrid);
				}
				,selectionchange	: function(selectionModel, records)
				{
					if(records.length > 0)
					{
						subCategoryGrid.down('button#editSubCategory').setDisabled(false);
					}
					else
					{
						subCategoryGrid.down('button#editSubCategory').setDisabled(true);	
					}
				}
			}
		});

		return subCategoryGrid;
	}
	,getCategoryStore : function()
	{
		var categoryStore =   Ext.create('Ext.data.Store',
		{
			autoLoad	: true
			,autoDestroy: false
			,model		: 'ComboModel'
			,pageSize	: 0
			,proxy		: 
			{
				type	: 'ajax'
				,url	: './comboData?actionType=categoryService'
				,reader	: 'combojsonreader'
			}
		});
		return categoryStore;
	}
	,addSubCategory : function(subCategoryGrid)
	{
		var me = this;
		var form = me.getSubCategoryForm(subCategoryGrid).down('form#subCategoryForm');
		var categoryStore = form.down('combo#categoryCombo').getStore();
		if(categoryStore.getCount() > 0)
		{
			form.down('combo#categoryCombo').setValue(categoryStore.getAt(0));
		}
	},
	editSubCategory : function(subCategoryGrid)
	{
		var me = this;
		var record = subCategoryGrid.getSelectionModel().getSelection()[0];
		var form = me.getSubCategoryForm(subCategoryGrid, record.get('id')).down('form#subCategoryForm');
		form.loadRecord(record);
	}
	,getSubCategoryForm : function(grid, id)
	{
		var me = this;
		var subCategoryForm = Ext.create('Ext.custom.form.Panel',
		{
			itemId			: 'subCategoryForm'
			,items			: 
			[
				{
					xtype		: 'hidden'
					,name		: 'id'	
				}
				,{
					xtype		: 'customcombo'
					,fieldLabel	: 'Category'
					,itemId		: 'categoryCombo'
					,name		: 'category'
					,store		: me.categorys
					,listeners	:
					{
						/*select : function(combo,record)
						{
							var subCategoryfield = combo.next('textfield#subCategory');
							subCategoryfield.clearInvalid();
							var value = subCategoryfield.getValue();
							var category = { category : record.get('id')};
							if(value)
							Utils.validateUniqueness(combo, value, id, IMS.Urls.validateSubCategoryName, category);
						}*/
					}
				}
				,{
					xtype		: 'textfield'
					,name		: 'name'
					,itemId		: 'subCategory'
					,fieldLabel	: 'Sub Category'
					,allowBlank : false
					,listeners	: 
					{
						/*change	: function(field)
						{
							var categorycombo = field.previousSibling('combo#categoryCombo');
							categorycombo.clearInvalid();
							var categoryId = categorycombo.getValue();
							if(categoryId)
							{
								var category = { category : categoryId};
								Utils.validateUniqueness(field, field.getValue(), id, IMS.Urls.validateSubCategoryName, category);
							}
						}*/
					}
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
						me.saveSubCategory(grid, subCategoryForm)
					}
				}
			]
		});

		return	Utils.showWindow({
			title	: "SubCategory Info"
			,items	: subCategoryForm
			,width	: 400
		});
	}
	,saveSubCategory	: function(grid,subCategoryForm)
	{
		var me = this;
		var mask = Utils.showLoadMask(subCategoryForm.up('window')).show();
		subCategoryForm.submit({
			url		: './command?actionType=subCategoryService'
			,jsonSubmit : true
			,method	: 'POST'
			,success : function(form, action)
			{
				mask.destroy();
				subCategoryForm.up('window').close();
				Utils.showAlert('Success', action.result.message);
				grid.getStore().load();
			}
			,failure : function(form, action)
			{
				mask.destroy();
				Utils.showAlert('Failure',"Unable to save SubCategory Info");
			}
		});
	}
}

SUBCATEGORY.init();
