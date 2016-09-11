/**
 * @author rabindranath.s
 */

var HYBRID =	
{
	init: function()
	{
		this.defineHybrid();
	}
	,crops	: null
	,defineHybrid : function()
	{
		Ext.define('Hybrid', 
		{
			extend	: 'Ext.data.Model',
			fields	:
			[
				 {	name: 'hybridId'					,mapping: 'id'					,persist: true	}
				,{	name: 'name'										}
				,{	name: 'cropName'			,mapping: 'crop.name'	}
				,{	name: 'crop'				,mapping: 'crop.id'		}
			]
		});
	}
	,getHybrids: function(extraParams)
	{
		var proxy = {
				type		: 'ajax'
				,url		: IMS.Urls.gridData
				,extraParams: {actionType : 'hybridInfoService'}
				,reader		: 'jsonreader'
					,idProperty	: 'id'
			}

		if (extraParams) proxy.extraParams.extraParams = extraParams;

		return Ext.create('Ext.data.Store',
				{
					 model	: 'Hybrid'
					,proxy	: proxy
					,pageSize	: 20
					,autoLoad 	: false
					,autoDestroy: true
					,remoteSort	: true
					,remoteFilter: true
				});
	}
	/*,getRowEditing   : function()
	{
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
	        clicksToMoveEditor: 1,
	        autoCancel: false
	    });
		return rowEditing;
	}*/
	,getHybridGrid : function()
	{
		var me			=	this;
		me.crops = me.getCropStore();
		var hybridGrid	=	Ext.create('Ext.custom.grid.Panel', 
		{
			title			: 'Hybrid Details'
			,itemId			: 'hybridGrid'
			,id				: 'hybridGrid'
			,store			: me.getHybrids()
			,iconCls		: 'fa-crop'
			,tabConfig		: {title: 'Hybrid'}
			,selType		: 'rowmodel'
			,plugins		: [{
								ptype: 'rowediting',
								clicksToEdit: 2,
								pluginId : 'hybridRowEditor',
								listeners	: { 'canceledit': function(editor, e)
												{
									
													if(!e.record.data.hybridId)
														hybridGrid.store.remove(e.record);
												}
												,'edit' : function (editor,e)
												{
													if (e.field == 'cropName')
													{
													}
												}
										}
								
			}]
			,tbar			:
			[
				 {xtype : 'customtbarbutton'	,text: 'Add Hybrid'		,iconCls:'fa-plus'	,handler:function(){me.addHybrid(hybridGrid)}	}
				,{xtype : 'customtbarbutton'	,text: 'Delete Hybrid'	,iconCls:'fa-edit'	,handler:function(){me.editHybrid(hybridGrid)}	,itemId: 'editHybrid'	,disabled : true	}
				,{xtype : 'customtbarbutton'	,text: 'Save Hybrid'	,iconCls:'fa-edit'	,handler:function(){me.saveHybrid(hybridGrid)}	,itemId: 'saveHybrid'		}
			]
			,columns		: 
			[ {
					header		: 'Id'
         		   ,dataIndex	: 'hybridId'
		           ,name		: 'hybridId'
		           ,hidden		: true
         		   ,editor		: {
         			   				xtype		: 'textfield'
         			   				,readOnly	: true
         			   				,hidden		: true
									 }
         	   },
			   { text : 'Name'			,dataIndex : 'name'		  ,editor: {xtype : 'textfield' ,allowBlank : false} 	}
         	  ,{
					 header		: ''
					,dataIndex	: 'crop'
					,name		:'crop'
					,sortable	: false	
					,hidden		: true
					,editor		: {
									xtype		: 'textfield'	
									,id			: 'crop'
									,hidden		: true
								}	
				}
				,{	text : 'Crop Name'		,dataIndex : 'cropName'	  ,editor : {
					
						xtype		: 'customcombo'
						,itemId		: 'cropCombo'
						,name		: 'crop'
						,valueField : 'name'
						,displayField: 'name'
						,store		: me.crops
						,allowBlank : false
						,listeners	:
						{
							select : function(combo,record)
							{
								var crop = record.data.id;
								Ext.getCmp('crop').setValue(crop);
							}
						}
				}}
			]
			,listeners	: 
			{
				selectionchange	: function(selectionModel, records)
				{
					if(records.length > 0)
					{
						hybridGrid.down('button#editHybrid').setDisabled(false);
					}
					else
					{
						hybridGrid.down('button#editHybrid').setDisabled(true);	
					}
				}
			}
		});

		return hybridGrid;
	}
	,getCropStore : function()
	{
		var cropStore =   Ext.create('Ext.data.Store',
		{
			autoLoad	: true
			,autoDestroy: false
			,model		: 'ComboModel'
			,pageSize	: 0
			,proxy		: 
			{
				type	: 'ajax'
				,url	: './comboData?actionType=cropService'
				,reader	: 'combojsonreader'
			}
		});
		return cropStore;
	}
	,addHybrid : function(hybridGrid)
	{
		hybridGrid.plugins[0].cancelEdit();
        var r = Ext.create('Hybrid', {
            name: null,
            cropName: null,
            hybridId : null,
            crop : null
        });
        hybridGrid.store.insert(0, r);
        hybridGrid.plugins[0].startEdit(0, 0);
	},
	editHybrid : function(hybridGrid)
	{
		var sm = hybridGrid.getSelectionModel();
		hybridGrid.plugins[0].cancelEdit();
		var rec = sm.getSelection()[0];
		if (rec.data.hybridId)
		{
			Ext.Msg.show({
				title   : 'Info'
	           ,msg     : 'Are you sure you want to delete'
	           ,modal   : true
	           ,buttons : Ext.Msg.YESNO
	           ,icon    : Ext.Msg.WARNING
	           ,closable: false
	           ,fn		: function(id)
	       		{
    	   			if (id =='yes')
    	   			{
    	   				Ext.Ajax.request({
    	   					 url	: './deleteData/'+rec.data.hybridId+'?actionType=hybridInfoService'
    	   					,method : 'DELETE'
	   						,success : function(response)
	   						{
	   							Utils.showAlert('Success', response.responseText);
	   							hybridGrid.store.load();
	   						}
	   						,failure : function(form, action)
	   						{
	   						}
    	   				})
    	   			}
    	   			else hybridGrid.plugins[0].startEdit(rec, 0);
	        	   				
	           	}
			});
		}
		else
		{
			hybridGrid.store.remove(sm.getSelection());
		}
        if (hybridGrid.store.getCount() > 0) 
        {
            sm.select(0);
        }
	}
	,saveHybrid	: function(grid)
	{
		var rowEditor = grid.getPlugin('hybridRowEditor');
		var recs = grid.getSelectionModel().getSelection();
		if(rowEditor.editing)
		{
			alert('Cancel or Commit Row Editor Before Submition');
			return false;
		}
		var records = [];
		if (grid.store.getRange().length > 0)
		{
			for (var i =0 ; i < grid.store.getRange().length; i++)
			{
				var rec  = grid.store.getRange()[i].data;
				rec.id = rec.hybridId;
				records.push(rec);
			}
		}
		var me = this;
		var mask = Utils.showLoadMask(grid).show();
		Ext.Ajax.request({
			url		: './command?actionType=hybridInfoService'
			,jsonSubmit : true
			,method	: 'POST'
			,jsonData : Ext.encode(records)
			,success : function(response)
			{
				var res = Ext.JSON.decode(response.responseText)
				mask.destroy();
				grid.getStore().load();
				Utils.showAlert("Success",res.message);
			}
			,failure : function(form, action)
			{
				mask.destroy();
				Utils.showAlert('Failure',"Unable to save HybridInfo");
			}
		});
	}
}

HYBRID.init();
