var appLbls = new Ext.util.HashMap();

/**   Global Labels   */

appLbls.add('IMS.GLOBAL.CONFIRM','Confirm');
appLbls.add('IMS.GLOBAL.SUCCESS','Success');
appLbls.add('IMS.GLOBAL.FAILURE','Failure');
appLbls.add('IMS.GLOBAL.MESSAGE','Message');
appLbls.add('IMS.GLOBAL.REGRET','Regret');
appLbls.add('IMS.GLOBAL.INFO'	, 'Info');
appLbls.add('IMS.GLOBAL.SELECT','Please select a record.');
appLbls.add('IMS.GLOBAL.RELOGIN','Re-Login');
appLbls.add('IMS.GLOBAL.PWDCHNG','Password Changed successfully. Please Re-Login with new password.');
appLbls.add('IMS.GLOBAL.CONFIRM','Confirm');
appLbls.add('IMS.GLOBAL.FAILURE.MSG','Unable Process your request');
appLbls.add('IMS.GLOBAL.ATTACHMENTS.TITLE','Attachments');
appLbls.add('IMS.GLOBAL.WARNING', 'Warning');
appLbls.add('IMS.GLOBAL.ERROR', 'Error');
appLbls.add('IMS.GLOBAL.EXPORT', 'No records are available');
appLbls.add('IMS.GLOBAL.RESET.PASSWORD', 'You Want To Reset Your Password');
appLbls.add('IMS.RESET.PASSWORD.SECCESS', 'Password Changed Successfully');
appLbls.add('IMS.RESET.PASSWORD.FAILURE', 'Unable To Reset Password');
/*** Common Form Dirty Close ***/

appLbls.add('FORM.DIRTY.CLOSE', 'Unsaved Changes Detected. You will loss the changes, if you close the window.<br>Do you want to close the window ?');
appLbls.add('FORM.UNDIRTY.SAVE', 'Nothing Changes has been done to Save.');

/***  Module Specific Labels ***/



/**
 * To return the label
 * @param labelKey
 * @returns
 */		
function getLabel(labelKey)
{
	return appLbls.get(labelKey);
}
