/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.ShowComments',
{
	extend		: 'Ext.custom.form.Panel'
	,xtype		: 'showcomments'
	,layout			: {type: 'vbox'}
	,fieldDefaults	: {labelWidth: 100}
	,defaults		: {width: '100%', padding: 20, scrollable: true}
	,controller		: 'issuegrid-controller'
	,initComponent	: function()
	{
		var me = this;
		me.items	=
			[
				
			];
		me.callParent(arguments);
	}
});