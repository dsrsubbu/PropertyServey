var DASH_BOARD =	
{
	init: function()
	{
		
	}
	,synching: false
	,syncingEntity: null
	,getStore: function()
	{
		return Ext.create('Ext.data.ArrayStore',
		{
			storeId	: 'myStore'
			,fields	: ['id', 'name', 'url']
			,data	:
			[
			
				[1, 'Retailer'		],
				[2, 'Farmer'		],
				[3, 'Employee'		],
				[4, 'Total'			]
			]
		});
	}
	,getTpl: function()
	{
		var tpl;
		Ext.Ajax.request(
		{
			url 		: './admin/getTicketDashboard'
			,method		: 'GET'
			,async: false
			,success	: function (response) 
			{
				console.log(response.responseText);
				var json = Ext.decode(response.responseText)
				console.log(json);
				
				var allTickets  = json.allTickets[0];
				var assignedTickets  = json.assignedTickets[0];
				var openTickets  = json.openTickets[0];
				var escalatedTickets = json.escalatedTickets[0];
				var heightLevelTickets = json.heightLevelTickets[0];
				
				tpl = new Ext.XTemplate(
						'<div style="line-height: 60px;height: 100%;font-size: 14px;font-weight:bold;font-family: Georgia, Geneva, sans-serif;color: #6b6b6b ;background: url(&quot;./images/home/ims-background.jpg&quot;);background-size: cover;">',
						'<table cellpadding="0" Cellspacing="0" width="60%" border="0" style="margin:0 auto; ">',
			                '<tr style="background: #218297;">',
			                '<th style="text-align: center; width:230px;"> </th>',
							 '<th style="text-align: center; color:#fff;"> Retailer</th>',
							 '<th style="text-align: center;color:#fff;"> Farmer</th>',
							 '<th style="text-align: center; color:#fff;"> Employee</th>',
							 '<th style="text-align: center; color:#fff;"> Total</th>',
			             '</tr>',
			             '<tr style="background: #F9F9F9;">',
			                '<th style="text-align: center;"> Total Tickets</th>',
						 '<td style="text-align: center;">'+allTickets.retailer+'</td>',
			               '<td style="text-align: center;">'+allTickets.farmer+'</td>',
							 '<td style="text-align: center;">'+allTickets.employee+'</td>',
			                '<td style="text-align: center;">'+allTickets.total+'</td>',
			             '</tr>',
			             
			             '<tr style="background: #f0f2f4;"><th style="text-align: center;">Open Tickets</th>',
			             '<td style="text-align: center;">'+assignedTickets.retailer+'</td>',
			             '<td style="text-align: center;">'+assignedTickets.farmer+'</td>',
						 '<td style="text-align: center;">'+assignedTickets.employee+'</td>',
			             '<td style="text-align: center;">'+assignedTickets.total+'</td>',
			             '</tr>',
			             '<tr style="background: #F9F9F9;">',
						 '<th style="text-align: center;">Escalated Tickets</th>',
			             '<td style="text-align: center;">'+escalatedTickets.retailer+'</td>',
			             '<td style="text-align: center;">'+escalatedTickets.farmer+'</td>',
						 '<td style="text-align: center;">'+escalatedTickets.employee+'</td>',
			             '<td style="text-align: center;">'+escalatedTickets.total+'</td></tr>',
			             
			             '<tr style="background: #f0f2f4">',
			             '<th style="text-align: center;">Tickets @ highest Level</th>',
			             '<td style="text-align: center;">'+heightLevelTickets.retailer+'</td>',
			             '<td style="text-align: center;">'+heightLevelTickets.farmer+'</td>',
						 '<td style="text-align: center;">'+heightLevelTickets.employee+'</td>',
			             '<td style="text-align: center;">'+heightLevelTickets.total+'</td></tr>',
			            
			             '<tr style="background: #F9F9F9;">',
			             '<th style="text-align: center;">Reassigned Tickets</th> ',
			             '<td style="text-align: center;">0</td>',
			             '<td style="text-align: center;">0</td>',
						'<td style="text-align: center;">0</td> ',
			             '<td style="text-align: center;">0</td></tr>',
			       
			             '<tr style="background: #f0f2f4;">',
			             '<th style="text-align: center;">Unassigned Tickets</th>',
			            ' <td style="text-align: center;">'+openTickets.retailer+'</td>',
			            '<td style="text-align: center;">'+openTickets.farmer+'</td>',
						'<td style="text-align: center;">'+openTickets.employee+'</td>',
			            '<td style="text-align: center;">'+openTickets.total+'</td></tr>',
			     '</table>',
			     '</div>'
					);
			}
			,failure: function (response) 
			{
				
			}
		});
		console.log(tpl)
		return tpl;
	}
	,getView: function()
	{
		var me = this;
		var view = {
			xtype		: 'dataview'
			,store		: me.getStore()
			,tpl		: me.getTpl()
			,itemSelector: 'div.datasync-section'
			,style		: 'background-color: #a8a8a8;'
			,listeners	:
			{
				/*afterrender: function(dataView)
				{
					if (me.synching)
					{
						dataView.setLoading({msg: 'Syncing ' + me.syncingEntity + '. Please wait...'});
					}
				}
				,itemdblclick: function(view, record, item, index)
				{
					me.sync(view, record.get('url'), record.get('name'));
				}*/
			}
		};

		return view;
	}
	,getDataSyncPanel: function()
	{
		var me = this;
		
		return {
			xtype	: 'panel'
			,title	: 'Dashboard'
			,layout	: 'fit'
			,iconCls: 'fa-circle-o-notch'
			,items	:me.getView()
			,tbar : [{text :'Submit'}]
		}
	}
	
};

DASH_BOARD.init();
