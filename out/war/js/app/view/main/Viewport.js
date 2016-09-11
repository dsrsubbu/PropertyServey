/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.main.Viewport',
{
	extend		: 'Ext.tab.Panel'
	,plugins	: 'viewport'
	,requires	:
	[
		 'Ext.plugin.Viewport'
		,'Ext.window.MessageBox'
		,'IMSAPP.view.main.ViewportController'
		,'IMSAPP.view.workflow.Workflow'
		,'IMSAPP.view.workflow.WorkflowGrid'

		,'IMSAPP.view.ticket.TicketViewPanel'

		,'IMSAPP.view.issues.UploadFile'
		//,'IMSAPP.view.issues.ShowComments'
		//,'IMSAPP.view.issues.AssignWorkflow'
		//,'IMSAPP.view.issues.UpdateTicket'
		//,'IMSAPP.view.issues.CreateIssue'
		//,'IMSAPP.view.issues.IssuesGrid'
	]
	,controller	: 'viewport-controller'
	,ui			: 'navigation'
	,tabBarHeaderPosition: 1
	,titleRotation: 0
	,tabRotation: 0
	,removePanelHeader: false
	,header		:
	{
		layout	: {align: 'stretchmax'}
		,title	: {text: 'IMS'		,flex: 0	,textAlign: 'center'}
		,iconCls: 'fa-ticket'
		,tools	:
		[
			{
				type		: 'gear'
				,cls		: 'navicon'
				,width		: 120
				,margin		: '0 0 0 0'
				,handler	: 'onSwitchTool'
				,plugins	: 'responsive'
				,responsiveConfig:
				{
					wide	: {visible: false}
					,tall	: {visible: true}
				}
			}
		]
	}
	,tabBar		:
	{
		flex	: 1
		,layout	:
		{
			align: 'stretch'	//,overflowHandler: 'none'
		}
		,items	:
		[
			{
				xtype	: 'tbfill'
			},{
				xtype	: 'customtbarbutton'
				,text	: 'Change Password'
				,handler: 'passwordToChange'
				,iconCls: 'x-ims-home-change-password-icon'
			},{
				xtype	: 'tbseparator'
				,height	: 1
			},{
				xtype	: 'customtbarbutton'
				,text	: 'Signout'
				,handler: 'signOut'
				,iconCls: 'x-ims-home-signout-icon'
			}
		]
		,defaults:
		{
			plugins	: 'responsive'
			,responsiveConfig:
			{
				wide	: {visible: true}
				,tall	: {visible: false}
			}
		}
	}
	,responsiveConfig:
	{
		tall	: {headerPosition: 'top'}
		,wide	: {headerPosition: 'left'}
	}
	,initComponent: function()
	{
		var me = this, menuItems = [];
		var tabConfig = {
			plugins	: 'responsive'
			,responsiveConfig:
			{
				wide	: {iconAlign: 'left'	,textAlign: 'left'		,visible: true		}
				,tall	: {iconAlign: 'top'		,textAlign: 'center'	,visible: false		/*,width: 100*/}
			}
		};

		/**
		 * Tab Items
		 */
		me.items = me.getItems();

		for (var i = 0, len = me.items.length; i < len; i++)
		{
			/**
			 * 
			 */
			if (me.items[i].tabConfig)
			{
				Ext.applyIf(me.items[i].tabConfig, tabConfig);
				menuItems.push({text: me.items[i].tabConfig.title ? me.items[i].tabConfig.title : me.items[i].title
							,iconCls: me.items[i].tabConfig.iconCls ? me.items[i].tabConfig.iconCls : me.items[i].iconCls
						});
			}
			else
			{
				me.items[i].tabConfig	= { };
				Ext.applyIf(me.items[i].tabConfig, tabConfig);
				menuItems.push({text:  me.items[i].title	,iconCls: me.items[i].iconCls});
			}
		}

		menuItems.push({
				 text	: 'Change Password'
				,handler: 'passwordToChange'
				,iconCls: 'x-ims-home-change-password-icon'
			},{
				 text	: 'Signout'
				,handler: 'signOut'
				,iconCls: 'x-ims-home-signout-icon'
			});

		me.assistiveMenu = {
			items		: menuItems
			,defaults	: {height: 50}
			,cls		: 'assistiveMenu'
			,listeners	: {click: 'onMenuClick'}
		};

		me.callParent(arguments);
	}
	,getItems: function()
	{
		/**
		 * Define the items here
		 */
		var items = [];
		if (CURRENTUSER.ROLE == null)
		{
			 items.push(
						{
							xtype	: 'ticketviewpanel'
							,iconCls: 'fa-ticket'
							,title	: 'Ticket Details'
						}
			 		)
		}
		else
		{
			items.push(
					{
						xtype	: 'ticketviewpanel'
						,iconCls: 'fa-ticket'
						,title	: 'Ticket Details'
					}
		 		)
			if (CURRENTUSER.ROLE != null && CONSTANTS.ROLES.ADMIN == CURRENTUSER.ROLE)
			{
				items.push(DASH_BOARD.getDataSyncPanel())
				items.push(USER.getUserGrid());
				items.push({
							xtype	: 'workflowgrid'
							,iconCls: 'fa-laptop'
							,title	: 'Workflow'
					})
			}
			
				if (CURRENTUSER.ROLE != null && CONSTANTS.ROLES.ADMIN == CURRENTUSER.ROLE)
				{
					items.push(HYBRID.getHybridGrid(),CATEGORY.getCategoryGrid(),SUBCATEGORY.getSubCategoryGrid());
					items.push(DATA_SYNC.getDataSyncPanel());
				}
		}
		return items;
	}
});
