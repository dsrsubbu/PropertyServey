/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.plugin.ContainerReplicator',
{
	alias: 'plugin.containerreplicator'
	,pluginId: 'containerreplicator'
	,ptype: 'containerreplicator'
	,init: function(container)
	{
		var fields = container.query('field[isFormField]');
		var field = fields[fields.length-1];
		if (!container.replicatorId)
		{
			container.replicatorId = Ext.id();
		}

		for (var i = 0, len = fields.length; i < len; i++)
		{
			fields[i].on('blur', this.onBlur, this, {args: [container]});
		}

		if (!container.fieldLabel) container.fieldLabel = 'Level 1';
		//container.on('destroy', this.updateLabels , this);
	}
	,onBlur: function(container, field)
	{
		var ownerCt = container.ownerCt,
			replicatorId = container.replicatorId,
			siblings = ownerCt.query('[replicatorId=' + replicatorId + ']'),
			isLastInGroup = siblings[siblings.length - 1] === container,
			clone, idx, fields, newNode, scroller,
			isValid = false;

		isValid = container.isValid();
		idx = ownerCt.items.indexOf(container);
		if (isValid)
		{
			if (isLastInGroup)
			{
				// Create New Container
				if (container.onReplicate)
				{
					container.onReplicate();
				}

				clone = container.cloneConfig({replicatorId: replicatorId, fieldLabel: 'Level ' + (idx + 2)});
				newNode = ownerCt.add(idx + 1, clone);

				scroller = ownerCt.getScrollable();
				if (scroller) {scroller.scrollIntoView(newNode.getEl());}
				//ownerCt.scrollTo(newNode.getXY());
			}
			else
			{
				// Do nothing
			}
		}
		else
		{
			if (isLastInGroup)
			{
				// Do nothing
			}
			else
			{
				// Remove The Container
				// ownerCt.setLoading(true);
				container.on('destroy', this.updateLabels , this, {args: [ownerCt, idx], single: true});
				Ext.Function.defer(container.destroy, 10, container); //delay to allow tab key to move focus first
			}
		}
	}
	,updateLabels: function(ownerCt, idx)
	{
		ownerCt.setLoading(true);
		ownerCt.suspendLayouts();
		for (var i = idx, len = ownerCt.items.length;  i < len; i++)
		{
			ownerCt.items.items[i].setFieldLabel('Level ' + (i + 1));
		}
		ownerCt.resumeLayouts();
		ownerCt.setLoading(false);
	}
});
