/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.ticket.TicketController',
{
	extend		: 'Ext.app.ViewController'
	,alias		: 'controller.ticket-controller'
	,afterFormRender: function()
	{
		var ticketForm = this.getView();
		var userTypeRadioGroup = ticketForm.down('[action="userType"]');
		var boxes = userTypeRadioGroup.items.items;;
		for (var i = 0, len = boxes.length; i < len; i++)
		{
			boxes[i].setReadOnly(true);
		}
		userTypeRadioGroup.setValue({userType: CURRENTUSER.USER_TYPE});
	}
	,onUserTypeSelectionChange: function(radioGroup)
	{
		var ticketForm = this.getView();
		var raisingForRadioGroup = ticketForm.down('[fieldLabel="Raising For"]');
		var raisingForUserTypeField = ticketForm.down('[name=raisingForUserType]');
		var retailerSection = ticketForm.down('#retailerSection');
		raisingForRadioGroup.reset();
		retailerSection.setDisabled(true).hide();
		switch (radioGroup.getValue().userType)
		{
			case CONSTANTS.USER_TYPE.FARMER :
				raisingForRadioGroup.setDisabled(true);
				raisingForUserTypeField.setValue(CONSTANTS.USER_TYPE.FARMER);
				/*raisingForRadioGroup.down('[inputValue=' + CONSTANTS.USER_TYPE.FARMER + ']').setDisabled(true);
				raisingForRadioGroup.down('[inputValue=' + CONSTANTS.USER_TYPE.RETAILER + ']').setDisabled(true);
				raisingForRadioGroup.down('[inputValue=3]').setDisabled(true);*/
			break;
			case CONSTANTS.USER_TYPE.RETAILER :
				raisingForRadioGroup.setDisabled(false);
				raisingForRadioGroup.down('[inputValue=' + CONSTANTS.USER_TYPE.FARMER + ']').setDisabled(false);
				raisingForRadioGroup.down('[inputValue=' + CONSTANTS.USER_TYPE.RETAILER + ']').setDisabled(true);
				raisingForRadioGroup.down('[inputValue=3]').setDisabled(false);
			break;
			case CONSTANTS.USER_TYPE.EMPLOYEE :
				raisingForRadioGroup.setDisabled(false);
				raisingForRadioGroup.down('[inputValue=' + CONSTANTS.USER_TYPE.FARMER + ']').setDisabled(false);
				raisingForRadioGroup.down('[inputValue=' + CONSTANTS.USER_TYPE.RETAILER + ']').setDisabled(false);
				raisingForRadioGroup.down('[inputValue=3]').setDisabled(false);
			break;
		}
	}
	,onRaisingForSelectionChange: function(radioGroup)
	{
		var ticketForm = this.getView();
		var userTypeRadioGroup = ticketForm.down('radiogroup[action=userType]');
		var raisingForUserTypeField = ticketForm.down('[name=raisingForUserType]');
		var userType = userTypeRadioGroup.getValue().userType;
		var retailerSection = ticketForm.down('#retailerSection');
		var raisingForCheckedField = radioGroup.getChecked().length && radioGroup.getChecked()[0];
		var issueTypeRadioGroup = ticketForm.down('[fieldLabel="Issue Type"]');
		var raisingfor;

		if (raisingForCheckedField)
		{
			raisingfor = radioGroup.getValue().raisingfor;
			if (raisingfor == 3)
			{
				raisingForUserTypeField.setValue(userTypeRadioGroup.getValue().userType);
				/**
				 * 
				 */
				issueTypeRadioGroup.down('[inputValue=' + CONSTANTS.ISSUE_TYPE.PAYBACK + ']').setDisabled(CONSTANTS.USER_TYPE.RETAILER != userTypeRadioGroup.getValue().userType);
			}
			else
			{
				raisingForUserTypeField.setValue(raisingfor);
				issueTypeRadioGroup.down('[inputValue=' + CONSTANTS.ISSUE_TYPE.PAYBACK + ']').setDisabled(CONSTANTS.USER_TYPE.RETAILER != raisingfor);
			}

			if ((userType == CONSTANTS.USER_TYPE.RETAILER || userType == CONSTANTS.USER_TYPE.EMPLOYEE) && raisingfor != 3)
			{
				retailerSection.setDisabled(false).show();
				retailerSection.setTitle(raisingForCheckedField.boxLabel + ' Details');
				retailerSection.down('[name=retailerMobileNo]').setValue('').setReadOnly(false);
				retailerSection.down('[name=retailerName]').setValue('').setReadOnly(false);
				retailerSection.down('[name=retailerMobileNo]').setFieldLabel(raisingForCheckedField.boxLabel + ' Mobile No');
				retailerSection.down('[name=retailerName]').setFieldLabel(raisingForCheckedField.boxLabel + ' Name');
			}
			else
			{
				retailerSection.setDisabled(true).hide();
			}
		}
		else
		{
			issueTypeRadioGroup.down('[inputValue=' + CONSTANTS.ISSUE_TYPE.PAYBACK + ']').setDisabled(true);
		}
	}
	,onCropSelect: function(cropCombo)
	{
		var hybridCombo = cropCombo.nextSibling('combo[name=hybrid]');
		hybridCombo.store.getProxy().extraParams['extraParams'] = cropCombo.getValue();
		hybridCombo.store.load();
	}
	,onDistrictSelect: function(districtCombo)
	{
		var pincodeCombo = districtCombo.nextSibling('combo[name=pincode]');
		pincodeCombo.store.getProxy().extraParams['extraParams'] = districtCombo.getValue();
		pincodeCombo.store.load();
	}
	,submitTicket : function()
	{
		var form  = this.getView();
		var grid = form.grid;
		Utils.showProgresText();
		form.submit({
			 url		: './command?actionType=ticketService'
			,jsonSubmit : true
			,method		: 'POST'
			,success 	: function(frm, action)
			{
				form.up('window').close();
				Utils.showAlert('Success', action.result.message);
				grid.getStore().load();
			}
			,failure : function(form, action)
			{
				Utils.showAlert('Failure', "Unable to raise ticket", Ext.Msg.ERROR);
			}
		});
	}
});
