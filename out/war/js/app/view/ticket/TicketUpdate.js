/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.ticket.TicketUpdate',
{
	extend			: 'Ext.custom.form.Panel'
	,xtype			: 'ticketupdate'
	,requires		: 'IMSAPP.view.ticket.TicketUpdateController'
	,controller		: 'ticketupdate-controller'
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
					,grow		: true
					,height 	: 150
				}
			];
		
		me.callParent(arguments);
	}
	,buttons		:
	[
		{
			xtype		: 'customformsubmitbutton'
			,handler 	: 'submit'
		}
	]
});
