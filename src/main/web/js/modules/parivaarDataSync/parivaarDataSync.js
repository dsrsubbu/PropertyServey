/**
 * @author rabindranath.s
 */

var DATA_SYNC =	
{
	init: function()
	{
		
	}
	,synching: false
	,syncingEntity: null
	,getStore: function()
	{
		return Ext.create('Ext.data.ArrayStore',
		{
			storeId	: 'myStore'
			,fields	: ['id', 'name', 'url']
			,data	:
			[
			
				[1, 'Parivaar Data'		, './parivaarDataSync/syncParivarData']


				/* [1, 'Commercial Units'		, './parivaarDataSync/cu']
				,[2, 'Regions'				, './parivaarDataSync/region']
				,[3, 'States'				, './parivaarDataSync/state']
				,[4, 'Districts'			, './parivaarDataSync/district']
				,[5, 'Users'				, './parivaarDataSync/user']*/
			]
		});
	}
	,getTpl: function()
	{
		//xcount
		return new Ext.XTemplate(
			'<div class="datasync-heading">',
				'<span>Double click respective section to start data Syncing</span>',
				//'</br><span>Note. Please Sync them in order of their sequence no.</span>',
			'</div>',
			'<div class="datasync-view">',
				'<tpl for=".">',
					'<div class="noselect datasync-section" style="margin: 10px; width: calc(50% - 20px); height: 50px;">', //height: calc(100%/({[xcount]}/2) - 20px); width: calc(50% - 20px);
						'<span class="wrap">',
							'<span class="inner-wrap">',
								'<span class="icon"></span>',
								'<span class="text">{#}. {name}</span>',
							'</span>',
						'</span>',
					'</div>',
				'</tpl>',
			'</div>'
		);
	}
	,getView: function()
	{
		var me = this;
		var view = {
			xtype		: 'dataview'
			,store		: me.getStore()
			,tpl		: me.getTpl()
			,itemSelector: 'div.datasync-section'
			,style		: 'background-color: #a8a8a8;'
			,listeners	:
			{
				afterrender: function(dataView)
				{
					if (me.synching)
					{
						dataView.setLoading({msg: 'Syncing ' + me.syncingEntity + '. Please wait...'});
					}
				}
				,itemdblclick: function(view, record, item, index)
				{
					me.sync(view, record.get('url'), record.get('name'));
				}
			}
		};

		return view;
	}
	,getDataSyncPanel: function()
	{
		var me = this;
		return {
			xtype	: 'panel'
			,title	: 'Parivaar Data Sync'
			,layout	: 'fit'
			,iconCls: 'fa-circle-o-notch'
			,items	: me.getView()
		}
	}
	,sync: function(dataView, url, name)
	{
		var me = this;
		if (!me.synching)
		{
			me.showAlert('Warning', 'Do you want to sync the ' + name + '.', Ext.MessageBox.WARNING, Ext.MessageBox.YESNO
			,function(confirmBtn)
			{
				if(confirmBtn == 'yes')
				{
					me.synching = true;
					me.syncingEntity = name;
					dataView.setLoading({msg: 'Syncing ' + name + '. Please wait...'});
					Ext.Ajax.request(
					{
						url 		: url
						,method		: 'POST'
						,timeout	: 1000 * 60 * 60
						,success	: function (response) 
						{
							var responseData = Ext.decode(response.responseText);
							if (responseData.success)
							{
								me.showAlert(getLabel('IMS.GLOBAL.SUCCESS'), name + ' ' + responseData.message);
							}
							else
							{
								me.showAlert(getLabel('IMS.GLOBAL.FAILURE'), responseData.message, Ext.Msg.ERROR);
							}
						}
						,failure: function (response) 
						{
							var responseData = response.responseText && Ext.decode(response.responseText, true);
							if (responseData && responseData.message)
							{
								me.showAlert(getLabel('IMS.GLOBAL.FAILURE'), responseData.message, Ext.Msg.ERROR);
							}
							else
							{
								me.showAlert(getLabel('IMS.GLOBAL.FAILURE'), response.statusText, Ext.Msg.ERROR);
							}
						}
						,callback: function()
						{
							if (dataView)	dataView.setLoading(false);
							me.synching = false;
						}
					});
				}
				else
				{
					return false;
				}
			});
		}
		else
		{
			me.showAlert('Info', 'Currently syncing in progress. Please wait while it completes.');
		}
	}
	,showAlert: function(title, msg, icon, button, fn, animateTarget)
	{
		var me = this;
		if (!me.messageBox)	me.messageBox = Ext.create('Ext.window.MessageBox', {closeAction: 'destroy'});
		me.messageBox.show(
		{
			title		: title ? title : "Info"
			,cls		: 'x-custom-window'
			,msg		: msg? msg: ""
			,modal		: true
			,closable	: false
			,icon		: icon ? icon : Ext.MessageBox.INFO
			,buttons	: button? button : Ext.MessageBox.OK
			,fn			: fn ? fn : Ext.emptyFn
			,animateTarget: animateTarget ? animateTarget : null
		});
	}
};

DATA_SYNC.init();
