/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.authentication.ChangePasswordForm',
{
	extend			: 'Ext.custom.form.Panel'
	,alias			: 'widget.changepasswordform'
	,requires		: ['IMSAPP.view.authentication.AuthenticationController']
	,fieldDefaults	: {labelWidth: 130}
	,controller		: 'authentication-controller'
	,initComponent	: function()
	{
		var me = this;

		me.items =
		[
			{
				fieldLabel	: 'Existing Password'
				,name		: 'existingPassword'
				,allowBlank	: false
				,inputType	: 'password'
				,xtype		: 'textfield'
			},{
				fieldLabel	: 'New Password'
				,name		: 'newPassword'
				,inputType	: 'password'
				,allowBlank	: false
				,xtype		: 'textfield'
				,vtype		: 'password'
			},{
				fieldLabel	: 'Confirm Password'
				,name		: 'confirmPassword'
				,xtype		: 'textfield'
				,inputType	: 'password'
				,vtype		: 'password'
				,initialPassField: 'newPassword'
				,allowBlank	: false
				,listeners	:
				{
					specialkey: function (field, e)
					{
						if (e.getKey() == e.ENTER)
						{
							var form = field.up('form');
							if (form.isValid())	form.down('button').fireHandler(e);
						}
					}
				}
			}
		];

		me.callParent();
	}
	,buttons		: 
	[
		{	xtype: 'customformsubmitbutton'		,text : 'Submit'	,handler: 'onSubmit'	}
	]
});
