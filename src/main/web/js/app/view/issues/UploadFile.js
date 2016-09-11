/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.UploadFile',
{
	extend			: 'Ext.custom.form.Panel'
	,xtype			: 'uploadfile'
	,layout			: {type: 'vbox'}
	,fieldDefaults	: {labelWidth: 100}
	,defaults		: {width: '100%', padding: 20, scrollable: true}
	,controller		: 'issuegrid-controller'
	,initComponent	: function()
	{
		var me = this;
		me.items	=
		[
			{
				xtype	: 'filefield'
				,name	: 'file'
			}
		];
		me.callParent(arguments);
	}
	,buttons	:
	[
		{
			xtype		: 'customformsubmitbutton'
			,formBind	: true
			,handler 	: 'submitFile'
		}
	]
});
