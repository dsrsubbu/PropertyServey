/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.view.workflow.Escalation',
{
	extend	: 'Ext.form.FieldContainer'
	,xtype	: 'escalation'
	,requires: ['IMSAPP.plugin.ContainerReplicator', 'IMSAPP.view.workflow.WorkflowController', 'IMSAPP.store.combo.Roles']
	,layout	: {type: 'hbox'}
	,plugins: [{ptype: 'containerreplicator'}]
	//,fieldLabel: 'Level'
	,controller: 'workflow-controller'
	,initComponent: function()
	{
		var me = this;
		me.items	=
		[
			{
				xtype		: 'customcombo'
				,fieldLabel	: 'ROLE'
				,name		: 'role'
				,store		: {type: 'roles', autoLoad: true}
				,allowBlank	: false
				,flex		: 1
				,padding	: {right: 20}
				,excludeForm: true
			},{
				xtype		: 'customnumberfield'
				,fieldLabel	: 'TAT'
				,name		: 'tat'
				,allowBlank	: false
				,minValue	: 1
				,flex		: 1
				,padding	: {right: 20}
				,excludeForm: true
			},{
				xtype		: 'customcombo'
				,fieldLabel	: 'CC TO'
				,name		: 'ccRoles'
				,allowBlank	: true
				,flex		: 1
				,store		: {type: 'roles', autoLoad: true}
				,padding	: {right: 10}
				,excludeForm: true
				,multiSelect: true
				,typeAhead		: false
				,listConfig : 
				{
					getInnerTpl : function() 
					{
						return '<div class="chkCombo">{name}</div>';
					}
				}
			},{
				xtype		: 'customtbarbutton'
				,width		: 20
				,padding	: 3
				,text		: ''
				,cls		: 'x-ims-escalation-remove x-ims-hide'
				,iconCls	: 'fa-remove'
				,action		: 'delete'
				//,hidden		: true
				,listeners	:
				{
					render: 'onRender'
				}
				,handler: 'onDelete'
			}
		];

		me.callParent(arguments);
	}
	,updateLabels: function(ownerCt, idx)
	{
		ownerCt.suspendLayouts();
		for (var i = idx, len = ownerCt.items.length;  i < len; i++)
		{
			ownerCt.items.items[i].setFieldLabel('Level ' + (i + 1));
		}
		ownerCt.resumeLayouts();
		ownerCt.setLoading(false);
	}
	,isValid: function()
	{
		var isValid = true;
		var fields = this.query('[isFormField]'); //[isFormField]:not([excludeForm])
		for (var i = 0, len = fields.length; i < len; i++)
		{
			if (fields[i].isValid())
			{
				isValid = true;
			}
			else
			{
				isValid = false;
				break;
			}
		}
		return isValid;
	}
	,getValues: function()
	{
		values = {};
		var fields = this.query('[isFormField]'); //[isFormField]:not([excludeForm])
		for (var i = 0, len = fields.length; i < len; i++)
		{
			values[fields[i].getName()] = fields[i].getValue();
		}

		return values;
	}
	,setValues: function(data)
	{
		var fields = this.query('[isFormField]');
		for (var i = 0, len = fields.length; i < len; i++)
		{
			fields[i].setValue(data[fields[i].name]);
		}
	}

});
