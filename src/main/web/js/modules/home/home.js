/**
 * @author rabindranath.s
 */
var HOME = {
	activeMenuId: null
	,activeScreenId: null
	,generateToolBar: function()
	{
		var me = this, toolbarItems = [{xtype: 'image', src: './images/home/ims_logo.png', width: 145, height: '100%'}];

		var menus = me.getMenus();
		for (var index = 0; index < menus.length; index++) 
		{
			var menuId		= menus[index].id;
			var menuText	= menus[index].menuText;
			var module		= menus[index].module;
			var refMethod	= menus[index].refMethod;
			var hasSubMenu	= menus[index].hasSubMenu;
			var btnConfig	= { };

			btnConfig.xtype		= 'menubutton';
			btnConfig.menuId	= menuId;
			btnConfig.text		= menuText;
			btnConfig.iconCls	= menus[index].iconCls;

			//btnConfig.screens	= menus[index].screens;

			btnConfig.toggleGroup= 'mainMenu';
			btnConfig.handler	= me.replaceCenterRegion.bind(me, hasSubMenu, module, refMethod);
			btnConfig.listeners = {
				click: function(btn)
				{
					me.activeMenuId = btn.menuId;
					var toolbar = btn.up('toolbar');
					if (toolbar.activeBtn)
					{
						toolbar.activeBtn.removeCls('menubutton-active');
					}
					btn.addCls('menubutton-active');
					toolbar.activeBtn = btn;
				}
			};
			btnConfig.scale = 'large';
			toolbarItems.push(btnConfig, { xtype: 'tbseparator' ,cls : 'x-custom-tbseperator'});
		}

		toolbarItems.push(	
			{xtype: 'tbfill'},
			{xtype: 'tbtext', html:CURRENTUSER.NAME, style:'font-weight:bold !important;' ,cls : 'x-ims-username'},
			{text:'', overflowText: 'Change Password' , iconCls: 'x-ims-home-change-password-icon', handler: passwordToChange	,scale:'large' ,cls:'x-custom-button'},
			{text:'', overflowText: 'Signout', iconCls: 'x-ims-home-signout-icon', handler: signOut ,scale:'large' ,cls:'x-custom-button'}
		);
		return toolbarItems;
	}
	,getMenus: function()
	{
		var menus = [
			{
				id: 1			,module: ""				,menuText: "Masters"				,iconCls:'x-ims-master'		,hasSubMenu: true,
				screens:
				[
					 {id: 1		,module: "HYBRID"		,menuText: "Hybrid"					,iconCls: 'x-ims-hybrid'	,refMethod: 'getHybridGrid'}
				]
			},{
				id: 2			,module: "DATA_SYNC"	,menuText: "Parivaar Data Sync"		,iconCls:'x-ims-datasync'	,refMethod: 'getView'		,hasSubMenu: false
			}
		];

		return menus;
	}
	/**
	 * Preferred Method to update viewport centre region
	 */
	,replaceCenterRegion: function(hasSubMenu, module, refMethod, btn)
	{
		var me = this, viewport, centerRegion, content;
		try
		{
			viewport = Ext.ComponentQuery.query('viewport')[0];
			centerRegion = viewport.down('[region=center]');
			viewport.remove(centerRegion);

			viewport.setLoading(true);
			content = me.getCenterRegionContent(hasSubMenu, module, refMethod, btn);
			content.region = 'center';
			viewport.add(content);
			//viewport.updateLayout();
			viewport.setLoading(false);
		}
		catch(err)
		{
			//viewport.add({xtype: 'panel', region: 'center'});
			me.print(err);
		}
	}
	,addItems2CenterRegion: function(hasSubMenu, module, refMethod, btn)
	{
		var me = this, viewport, centerRegion, content;
		viewport = Ext.ComponentQuery.query('viewport')[0];
		centerRegion = viewport.down('[region=center]');
		content = me.getCenterRegionContent(hasSubMenu, module, refMethod, btn);
		centerRegion.removeAll();
		centerRegion.add(content);
		//centerRegion.updateLayout();
	}
	,getCenterRegionContent: function(hasSubMenu, module, refMethod, btn)
	{
		var me = this, screen;
		try 
		{
			if (!hasSubMenu)
			{
				
				screen = eval(module + '.' + refMethod + '()');
			}
			else
			{
				screen = me.getContentAsTabPanel(btn.menuId);
			}
		}
		catch(err)
		{
			throw err;
		}
		return screen;
	}
	,getContentAsTabPanel: function(menuId, screenId2Activate)
	{
		var me = this,
			screenItems,
			screenItem,
			screen,
			module,
			refMethod,
			screenName,
			iconCls,
			screenId,
			tabPanelItems = [],
			len,
			tabPanel,
			err = {message: ''},
			count,
			activeTabIndex = 0,
			activeScreenId;
		try
		{

			var menus = me.getMenus();
			for (var m = 0; m < menus.length; m++)
			{
				if (menus[m].id == menuId)
				{
					screenItems = menus[m].screens;
					break;
				}
			}

			for (var i = 0, len = screenItems.length; i < len; i++) 
			{
				screenItem = screenItems[i];
				module = screenItem.module.trim().toUpperCase();
				refMethod = screenItem.refMethod;
				screenName = screenItem.menuText;
				iconCls = screenItem.iconCls;
				screenId = screenItem.id;
				//count	= screenItem.count;

				if (!window[module] || !window[module][refMethod])
				{
					err.message = window[module] ? (module + '.' + refMethod + '() is ' + window[module][refMethod]) : (module + ' is ' + window[module]);
					me.print(err);
					continue;
				}

				screen = eval(module + '.' + refMethod + '(' + screenId +')');

				if (screen)
				{
					screen.tabConfig = {width : 153, title: screenName, iconAlign: 'left', iconCls: iconCls, tooltip: screenName};
					/*if (count != null || count != undefined)
					{
						screen.tabConfig.iconTpl = me.getIconTpl(count);
					}*/

					Ext.applyIf(screen, {
						scrollable: true
						,screenId: screenId
						,title	: screenName
					});

					if (screen instanceof Ext.panel.Panel)
					{
						
					}
					else
					{
						/**
						 * Here screen should be an object with configs and items property
						 */
						if (screen.height)	delete screen.height;
						if (screen.width)	delete screen.width;
						if (screen.maxHeight)	delete screen.maxHeight;
						if (screen.maxWidth)	delete screen.maxWidth;
						if (!screen.layout)	screen.layout = 'fit';
					}
				}

				tabPanelItems.push(screen);

				if (screenId2Activate && screenId2Activate == screenId)
				{
					activeTabIndex = i;
					activeScreenId = screenId2Activate;
				}
			}

			if (tabPanelItems.length > 0 && !activeScreenId)
			{
				activeScreenId = tabPanelItems[0].screenId;
			}

			me.activeScreenId = activeScreenId;
			tabPanel = Ext.create('Ext.tab.Panel', 
			{
				tabPosition	: 'left'
				,height		: '100%'
				,renderTo 	: document.body
				,cls		: 'x-ims-tabPanel'
				//,cls		: 'x-odch-hometab'
				//,bodyCls	: 'x-odch-hometab-body'
				,items		: tabPanelItems
				,removePanelHeader: false
				,bodyBorder	: true
				,scrollable	: false
				,itemId		: 'menuItemsTabPanel'
				,activeTab	: activeTabIndex
				,tabBar		:
				{
					plain		: true
					,tabRotation: 0
					,tabStretchMax: true
					,defaults	: {height: 60}
					,margin		: '0 2 0 0'
				}
				,listeners:
				{
					tabchange: function(tp, newCard, oldCard)
					{
						/*if (newCard.getStore())
						{
							newCard.getStore().clearFilter();
							newCard.getStore().loadPage(1);
						}*/
						me.activeScreenId = newCard.screenId;
					}
				}
			});

			return tabPanel;
		}
		catch(err) 
		{
			//me.print(err);
			throw err;
		}
	}
	,print: function(err)
	{
		var error = [err.message];
		if (err.fileName) error.push('File Name: ' + err.fileName);
		if (err.lineNumber) error.push('Line No: ' + err.lineNumber);
		if (console && IMS.APPLICATION_MODE == 'DEVELOPMENT')
			console.log(error.join('\n'));
	}
	,activateDefaultMenu: function()
	{
		var me =  this, menuId, screenId, viewport, toolbar, menu, screen;

		menuId = me.getActiveMenuId();

		viewport = Ext.ComponentQuery.query('viewport')[0];
		toolbar = viewport.down('toolbar[region=north]', 1);
		menu = toolbar.down('button[menuId=' + menuId + ']');
		if (menu && !menu.disabled)
		{
			menu.doToggle();
			if (menu.fireEvent('click', menu) !== false && !menu.isDestroyed)
			{
				menu.handler(menu);
			}
		}
	}
	,getActiveMenuId : function()
	{
		var me = this;
		return me.getMenus()[0].id;
	}
}

function hitServer()
{
	Ext.Ajax.request(
	{
		url: 'sessionHandler?date=' + new Date()
		,callback: function (options, success, response)
		{
			if (success)
			{
				var isSessionExists = response.responseText;
				if ("1" != isSessionExists) 
				{
					Ext.Msg.show(
					{
						title 		: 'Information'
						,msg  		: 'Your session has expired, please reload the page to login.'
						,modal  	: true
						,buttons	: Ext.Msg.OK
						,icon 		: Ext.window.MessageBox.INFO
						,cls		: 'x-custom-window'
						,closable   : false
						,fn 		: function(btn)
						{
							location.reload();
						}
					});
				}
			}
		}
	});
}

setInterval("hitServer()", 20000); //  After Every 2 minutes

function signOut()
{
	var curURL = ((location.href).split('?'))[0];
	curURL = curURL.replace("#", "");
	location.href = Ext.urlAppend(curURL, "actionName=signout");
}


