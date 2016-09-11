Ext.define('IMSAPP.view.authentication.AuthenticationController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.authentication-controller'
	,onSubmit	: function (btn)
	{
		// console.log(this.getView());
		var changePasswordForm 	= this.getView();
		var oldPwd = changePasswordForm.down('[name=existingPassword]').getValue();
		var newPwd = changePasswordForm.down('[name=newPassword]').getValue();
		if (oldPwd != newPwd)
		{
			Ext.Ajax.request(
			{
				url			: IMS.Urls.changePassword
				,method		: 'POST'
				,waitMsg	: 'Saving...'
				,params		: {"newPassword": newPwd, "existingPassword": oldPwd}
				,success	: function (response)
				{
					var responseData = Ext.decode(response.responseText);
					if (!responseData.success)
					{
						changePasswordForm.down('[name=existingPassword]').setValue("");
						changePasswordForm.down('[name=existingPassword]').markInvalid("The password does not match with existing password");
						changePasswordForm.down('[name=existingPassword]').focus();
					}
					else
					{
						changePasswordForm.up('window').close();
						Ext.Msg.minWidth = 430;
						Utils.showAlert(getLabel('IMS.GLOBAL.RELOGIN'), getLabel('IMS.GLOBAL.PWDCHNG') ,null,null,
							function (btn, text)
							{
								if (btn == 'ok')
									window.location = location.href + "?actionName=signout";
							});
					}
				}
				,failure: function (response)
				{
					Utils.showAlert("Failure", "Unable to change the password.", Ext.MessageBox.ERROR)
					changePasswordForm.down('[name=existingPassword]').setValue("");
				}
			});
		}
		else
		{
			changePasswordForm.down('[name=newPassword]').setValue("");
			changePasswordForm.down('[name=confirmPassword]').setValue("");
			changePasswordForm.down('[name=newPassword]').markInvalid('New password should not match with old password.');
		}
	}
});
