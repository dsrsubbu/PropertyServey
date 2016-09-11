/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.workflow.WorkflowController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.workflow-controller'
	,onSubmit: function()
	{
		var data = {},
			workflow 	= {},
			escals		= [],
			workflowForm = this.getView(),
			escalations = workflowForm.query('escalation'),
			grid = workflowForm.grid,
			record = workflowForm.record,
			i, len;

		Utils.showProgresText();
		for (i = 0, len = escalations.length; i < len; i++)
		{
			if (escalations[i].isValid())
			{
				escals.push(Ext.apply(escalations[i].getValues(), {levelNo: (i + 1)}));
			}
		}

		if (!escals.length)
		{
			Utils.showAlert(getLabel('IMS.GLOBAL.INFO'), "At Least One Escalation Level Required.");
			return;
		}

		if (record)
		{
			workflow.id = record.get('id');
			workflow.status = record.get('status');
		}

		workflow.name = workflowForm.down('[name=name]').getValue();
		workflow.isDefault = workflowForm.down('[name=isDefault]').getValue();
		workflow.description = workflowForm.down('[name=description]').getValue();
		workflow.userType = workflowForm.down('[name=userType]').getValue();
		workflow.issueType = workflowForm.down('[name=issueType]').getValue();
		workflow.category = workflowForm.down('[name=category]').getValue();
		workflow.subCategory = workflowForm.down('[name=subCategory]').getValue();

		data.workflow = workflow;
		data.escalationLevels = escals;
		Ext.Ajax.request(
		{
			url 		: IMS.Urls.command
			,params		: {actionType: 'workflowService'}
			,method		: 'POST'
			,jsonData	: Ext.encode(data)
			,success	: function (response) 
			{
				var responseData = Ext.decode(response.responseText);
				if (responseData.success)
				{
					workflowForm.up('window').close();
					/**
					 * Remove the reference
					 */
					workflowForm.grid = null;
					workflowForm.record = null;
					Utils.showAlert(getLabel('IMS.GLOBAL.SUCCESS'), responseData.message, false, false, function()
					{
						grid.getStore().load();
					});
				}
				else
				{
					Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), responseData.message, Ext.Msg.ERROR);
				}
			}
			,failure: function (response) 
			{
				Utils.showAlert(getLabel('IMS.GLOBAL.FAILURE'), "Unable To Save.", Ext.Msg.ERROR);
			}
		});

		//Ext.create('IMSAPP.model.Workflow', {workflow});
		/*var user = new IMSAPP.model.Workflow();
		user.load({
		    scope: this,
		    failure: function(record, operation) {
		    	console.log(record);
		    },
		    success: function(record, operation) {
		    	console.log(record);
		    },
		    callback: function(record, operation, success) {
		    	console.log(record);
		    }
		});*/
	}
	,updateErrorState: function(cmp, state)
	{
		var me = this,
			view, form, errorCmp, fields, errors;

		view = me.getView();
		form = view.getForm();

		// If we are called from the form's validitychange event, the state will be false if invalid.
		// If we are called from a field's errorchange event, the state will be the error message.
		if (state === false || (typeof state === 'string' && state.length))
		{
			errorCmp = me.lookupReference('formErrorState');

			fields = form.getFields();
			errors = [];

			fields.each(function(field) {
				Ext.Array.forEach(field.getErrors(), function(error) {
					errors.push({name: field.getFieldLabel(), error: error});
				});
			});

			errorCmp.setErrors(errors);
			me.hasBeenDirty = true;
		}
	}
	,onRender: function()
	{
		/**
		 * For Escalation
		 */
		var escalation = this.getView();
		// if (escalation.ownerCt)	this.setDisabled(!escalation.ownerCt || escalation.ownerCt.items.indexOf(escalation) == 0);
		// if (escalation.ownerCt)	this.setDisabled(!escalation.ownerCt || escalation.ownerCt.items.indexOf(escalation) == escalation.ownerCt.items.length - 1);
		var prevEscalation = escalation.prev('escalation');
		//if (prevEscalation) prevEscalation.down('button[action=delete]').show();
		if (prevEscalation) prevEscalation.down('button[action=delete]').removeCls('x-ims-hide');
	}
	,onDelete: function()
	{
		/**
		 * For Escalation
		 */
		var escalation = this.getView();
		var idx = escalation.ownerCt.items.indexOf(escalation);
		var invokeMethod = escalation.findPlugin('containerreplicator').updateLabels || escalation.updateLabels;
		// escalation.ownerCt.setLoading(true);
		escalation.on('destroy', invokeMethod, escalation, {args: [escalation.ownerCt, idx], single: true});
		escalation.destroy();
	}
	,onDefaultChange: function(comp, newValue, oldValue)
	{
		var form = comp.up('form'),
			userTypeField = form.down('[name=userType]'),
			issueTypeField = form.down('[name=issueType]'),
			categoryField = form.down('[name=category]');
			subCategory = form.down('[name=subCategory]');

		userTypeField.setDisabled(newValue);
		issueTypeField.setDisabled(newValue);
		categoryField.setDisabled(newValue);
		subCategory.setDisabled(newValue);
		if (newValue)
		{
			userTypeField.clearValue();
			issueTypeField.clearValue();
			categoryField.clearValue();
			subCategory.clearValue();
		}
	}
	,onCategorySelect: function(categoryCombo)
	{
		var subcategoryCombo = categoryCombo.nextSibling('combo[name=subCategory]');
		subcategoryCombo.store.getProxy().extraParams['extraParams'] = categoryCombo.getValue();
		subcategoryCombo.store.load();
	}
});
