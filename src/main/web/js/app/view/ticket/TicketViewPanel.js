/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.ticket.TicketViewPanel',
{
	extend		: 'Ext.container.Container'
	,alias		: 'widget.ticketviewpanel'
	,requires	: ['IMSAPP.view.ticket.TicketGrid', 'IMSAPP.view.ticket.TicketViewPanelController', 'IMSAPP.view.ticket.TicketUpdate']
	,controller	: 'ticketgrid-controller'
	,title		: 'Ticket Details'
	,layout		: 'border' // 'hbox'
	,flex		: 1
	,defaults	: {height: '100%'}
	,removePanelHeader: true
	,controller	: 'ticketviewpanel-controller'
	,ticketGridStore: null
	,initComponent: function()
	{
		var me = this;
		var ticketGrid = {
 				xtype		: 'ticketgrid'
				,flex		: 1
				,region		: 'center'
				,listeners	:
				{
					selectionchange: 'updateDetails'
				}
			};

		if (me.ticketGridStore)
		{
			Ext.apply(ticketGrid, {store: me.ticketGridStore})
			ticketGrid.tbar = false;
		};

		me.items = 
		[
			ticketGrid
			,{
				xtype		: 'panel'
				,title		: 'Ticket Details'
				,itemId		: 'detailSection'
				,width		: 270
				,layout		: 'vbox'
				,defaults	: {width: '100%'}
				//,headerPosition: 'left'
				,region		: 'east'
				,split		: {style: 'background-color: #DADADA;'}
				/*,header		:
				{
					titlePosition: 1
					,padding:  '0'
					//,width: 12
				}*/
				,collapsible: true
				,titleCollapse: false
				,animCollapse: false		// animCollapse: true doesn't work correctly
				//,collapseDirection: 'right'
				,collapseMode: 'mini'
				,hideCollapseTool: true
				,items		:
				[
					{
						xtype		: 'component'
						,itemId		: 'detailContainer'
						,flex		: 1
						,scrollable	: true
						,tpl		: me.getCommentTemplate()
						,html		: 'Select a Ticket'
					},{
						xtype		: 'toolbar'
						,layout		: 'hbox'
						,padding	: '0 0 2 0'
						,items		:
						[
							'->',
							{
								xtype		: 'customtbarbutton'
								,text		: 'Close Ticket'
								,itemId		: 'updateTicket'
								,iconCls	: ''
								,handler	: 'updateTicket'
								,hidden		: true
								,disabled	: true
							},'->'
						]
					}
				]
			}
		];

		this.callParent(arguments);
	}
	,getCommentTemplate: function()
	{
		return new Ext.XTemplate(
				'<div>'
				,'<tpl for=".">'
					,'<ul class="x-ims-ticket-comment-tpl">'
						,'<li><b>Updated By:</b> {transactedBy}</li>'
						,'<li><b>Updated On:</b> {transactedOn}</li>'
						,'<li><b>Status:</b> {status}</li>'
						,'<li><b>Internal Status:</b> {internalStatus}</li>'
						,'<li><b>Comments:</b> {comment}</li>'
					,'</ul>'
					,'<span> ------------------------------------------------------</span>'
				,'</tpl>'
			,'</div>'
			,{
				disableFormats: true
			}
		);
	}
});
