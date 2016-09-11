/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.main.ViewportController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.viewport-controller'
	,destroy	: function ()
	{
		Ext.destroyMembers(this, 'menu');
		this.callParent();
	}
	,onMenuClick: function (menu, item)
	{
		if (!(item instanceof Ext.Button))
		this.getView().setActiveTab(menu.items.indexOf(item));
	}
	,onSwitchTool: function (e)
	{
		var menu = this.menu;

		if (!menu) {
			menu = this.getView().assistiveMenu;
			this.menu = menu = Ext.create('Ext.menu.Menu', menu);
		}

		menu.showAt(e.getXY());
	}
	,signOut: function()
	{
		var curURL = ((location.href).split('?'))[0];
		curURL = curURL.replace("#", "");
		console.log(Ext.urlAppend(curURL, "actionName=signout"));
		location.href = Ext.urlAppend(curURL, "actionName=signout");
	}
	,passwordToChange: function()
	{
		return	Utils.showWindow({
			title		: 'Change Password'
			,items		: {xtype: 'changepasswordform'	,itemId: 'changePasswordForm'}
			,width		: 400
		});
	}
});
