/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.model.ComboModel', 
{
	extend	: 'Ext.data.Model'
	,requires: 'IMSAPP.override.model.Model'
	,fields	: ['id', 'name', 'refId', 'refName']
});