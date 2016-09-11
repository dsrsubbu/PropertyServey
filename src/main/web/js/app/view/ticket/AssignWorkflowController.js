/**
 * @author suman.t
 */

Ext.define('IMSAPP.view.ticket.AssignWorkflowController',
{
	extend		 : 'Ext.app.ViewController'
	,alias		 : 'controller.assignworkflow-controller'
	,afterRender : function()
	{
		var form = this.getView();
		var grid = form.grid;
		var record = grid.getSelectionModel().getSelection()[0];

		form.down('[itemId=ticketDetails]').setTitle('Details of Ticket No : ' + record.data.ticketNo);
		form.loadRecord(record);
		form.down('[name=createdDate]').setValue(Utils.renderFormattedDate(record.data.createdDate))
	}
	,submit : function()
	{
		var form  		= this.getView();
		form.setLoading(true);
		var grid 		= form.grid;
		var formValues  = form.getValues();
		var record 		= grid.getSelectionModel().getSelection()[0];
		formValues.ticketId = record.data.id;
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.assignWorkflow
			,method		: 'GET'
			,params		: {ticketId: record.data.id,workflowId : formValues.workflowId,issueTypeId : formValues.issueTypeId}
			,success	: function (response) 
			{
				form.setLoading(false);
				if (response.responseText=='Success')
				{
					form.up('window').close();
					Utils.showAlert(getLabel('IMS.GLOBAL.SUCCESS'), "Workflow assigned successfully.", false, false, function()
					{
						grid.getStore().load();
					});
				}
				else
				{
					Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Unable to save.", Ext.Msg.ERROR);
				}
			}
			,failure: function (response) 
			{
				form.setLoading(false);
				Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Unable To Save.", Ext.Msg.ERROR);
			}
		});
	},
	getsubcategory :  function()
	{
		var form  		= this.getView();
		var grid 		= form.grid;
		var record 		= grid.getSelectionModel().getSelection()[0];
		var recomendedCategory = form.down('[name=recomendedCategory]');
		recomendedCategory.setLoading(true);
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.getWorkflowDetails 
			,params		: {ticketId: record.data.id}
			,method		: 'GET'
			,success	: function (response) 
			{
				recomendedCategory.setValue(response.responseText)
				recomendedCategory.setLoading(false);
			}
			,failure: function (response) 
			{
			}
		});
	},
	onCategorySelect	: function(categoryCombo)
	{
		var form = this.getView();
		var subcategoryCombo = categoryCombo.nextSibling('combo[name=subCategory]');
		subcategoryCombo.store.getProxy().extraParams['extraParams'] = categoryCombo.getValue();
		subcategoryCombo.store.load();
		form.down('[action=workflowDetailsSection]').hide();
		form.up('window').center();
	}
	,onSubCategorySelect : function(subCategoryCombo)
	{
		var form  		  = this.getView();
		form.setLoading(true);
		var issuTypeCombo 		= form.down('[name=issueTypeId]');
		var categoryCombo 		= form.down('[name=category]');
		var subCategoryCombo 	= form.down('[name=subCategory]');
		var grid 		  		= form.grid;
		var record 		  		= grid.getSelectionModel().getSelection()[0];
		if (record.get('assignedTo') != null && record.get('assignedTo') !='')
		{
			form.down('[action=workflowDetailsSection]').setTitle('Workflow Details - Current Assigned User is : <b> '+ record.get('role') + " -- "+ record.get('assignedTo') + '</b>')
		}
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.getWorkflowDetails 
			,params		: {issueType : issuTypeCombo.getValue(),category : categoryCombo.getValue(),ticketId : record.data.id,subCatgory : subCategoryCombo.getValue()}
			,method		: 'GET'
			,success	: function (response) 
			{
				form.setLoading(false);
				var responseData = Ext.decode(response.responseText);
				if (responseData.message == 'WNF')
				{
					Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Workflow/Default Workflow not available .Please contact your Admin to create a Workflow/Default workflow");
					return;
				}
				form.down('[action=workflowDetailsSection]').show();
				var map = responseData.escLevels;
				form.down('[name=workflowNo]').setValue(responseData.workflowNo);
				form.down('[name=workflowName]').setValue(responseData.workflowName);
				form.down('[name=workflowId]').setValue(responseData.workflowId);
				form.down('[name=newUser]').setValue(responseData.isNewUser ? 'No' : 'Yes');
				form.down('[name=noOfIssues]').setValue(responseData.noofIssues);
				form.down('[action=ageOfIssue]').show();
				form.down('[name=sameIssue]').setValue("<b>Same Issue Raised  <u>" +responseData.noOfDays+ "</u>  days before.</b>");
				
				var levelsContainer = form.down('[action=levelsContainer]');
				var rolesContainer  = form.down('[action=rolesContainer]');
				var usersContainer  = form.down('[action=usersContainer]');
				var tatContainer    = form.down('[action=tatContainer]');
				var leversArray = [];
				var rolesArray = [];
				var usersArray = [];
				var tatArray = [];
				levelsContainer.removeAll();
				rolesContainer.removeAll();
				usersContainer.removeAll();
				tatContainer.removeAll();
				levelsContainer.add({
										xtype		: 'displayfield'
										,fieldLabel	: 'Levels'
										,submitValue: false
								})
				rolesContainer.add({
										xtype		: 'displayfield'
										,fieldLabel	: 'Roles'
										,submitValue: false
								})
				usersContainer.add({
										xtype		: 'displayfield'
										,fieldLabel	: 'User Name'
										,submitValue: false
					});
				tatContainer.add({
										xtype		: 'displayfield'
										,fieldLabel	: 'TAT'
										,submitValue: false
					});
				for (var i = 0, keys = Object.keys(map), ii = keys.length; i < ii; i++) 
				{
					var users = map[keys[i]].split("$");
					leversArray.push({
			 							xtype		: 'displayfield'
			 							,value		: 'Level '+keys[i]
			 							,submitValue: false
				 					});
					rolesArray.push({
											xtype		: 'displayfield'
											,value		: users[2]
											,submitValue: false
											,width		: 200
 										})
 					usersArray.push({
											xtype		: 'displayfield'
											,value		:  users[0] != null && users[0] != 'null' ? users[0] : "Not Available"
											,submitValue: false
											,width		: 200
 										})
 					tatArray.push({
											xtype		: 'displayfield'
											,value		:  users[1]
											,submitValue: false
 										})					
				}
				levelsContainer.add(leversArray);
				rolesContainer.add(rolesArray);
				usersContainer.add(usersArray);
				tatContainer.add(tatArray);
				form.up('window').center();
			}
			,failure: function (response) 
			{
				form.setLoading(false);
			}
		});
	}
});
