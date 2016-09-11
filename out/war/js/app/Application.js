/**
 * @author rabindranath.s
 */
/**
 * Asterisk loading fails(i.e. namespace.*), need to be tested
 */
Ext.define('IMSAPP.Application',
{
	extend		: 'Ext.app.Application'
	,name		: 'IMSAPP'
	//,namespaces	: ['']
	,requires	:
	[
		 'IMS.Urls'
		, 'IMSAPP.override.model.Model'
		, 'IMSAPP.override.*'
		, 'IMSAPP.model.ComboModel'
		, 'IMSAPP.store.Store'
		, 'IMSAPP.store.grid.GridStore'
		, 'IMSAPP.store.combo.ComboStore'
		, 'IMSAPP.view.authentication.ChangePasswordForm'
	]
	,views		: ['main.Viewport']
	,enableQuickTips: true
	,appFolder	: 'js/app'
	,paths		: {'Ext.ux': './js/lib/ExtJs-5.1.1/ux'}
	,glyphFontFamily: 'FontAwesome'
	// ,mainView	: 'IMSAPP.view.main.Viewport'
	,launch		: function(profile)
	{
		var me = this;
		if (!FC_PWD_FLAG)
		{
			var isSessionExists = 0;
			Ext.Ajax.request(
			{
				 url		: 'sessionHandler?date=' + new Date()
				,waitMsg	: 'Checking the session info....'
				,callback	: function (options, success, response)
				{
					if (success)
					{
						isSessionExists = Ext.decode(response.responseText);
						if (isSessionExists == "1")
						{
							Ext.create('IMSAPP.view.main.Viewport', { });
							if (forcedLogout == "1" && refresh == "1")
							{
								Utils.showAlert('Information' , 'Another User has logged in with your credentials and his session is forcefully destroyed while you logged in.')
							}
						}
						else
						{
							location.href = location.href + "?actionName=signout";
						}
					}
				}
			});
		}
		else
		{
			me.passwordToChange();
		}

		setInterval(me.hitServer, 1000 * 60 * 32); //  After Every 32 minutes
	}
	,passwordToChange: function()
	{
		return	Utils.showWindow({
			title		: 'Change Password'
			,items		: {xtype: 'changepasswordform'	,itemId: 'changePasswordForm'}
			,closable	: false
			,width		: 400
		});
	}
	,hitServer: function()
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
});
