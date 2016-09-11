/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.issues.UpdateTicket',
{
	extend		: 'Ext.custom.form.Panel'
	,xtype		: 'updateticket'
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
					xtype		: 'textarea'
					,fieldLabel	: 'Enter Resolution'
					,name		: 'comments'
					,labelAlign	: 'top'
					,width 		: 500
					,grow		: true
					,height 	: 150
				},
				{
					xtype : 'hidden'
					,name : 'action'
					,value : me.btnName
				}
   		   		
			];
		
		me.callParent(arguments);
	}
	,buttons		:
	[
		{
			xtype		: 'customformsubmitbutton'
			,formBind	: true
			,handler 	: 'submitTicketUpdation'
		}
	]
});
