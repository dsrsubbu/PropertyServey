/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.Store',
{
	extend		: 'Ext.data.Store'
	,constructor: function (config)
	{
		var me = this, proxy;

		if (!me.proxy && !config.proxy)
		{
			proxy = {
				type		: 'rest'
				,paramsAsJson: true
				,batchActions: false
				,reader		: 'jsonreader'
			};

			/*if (!me.url && !config.url && !me.api && !config.api)
			{
				Ext.Error.raise({msg: 'URL(s) not defined.'});
				return;
			}*/

			if (config.api)
			{
				proxy.api = config.api;
				delete config.api;
			}
			else if (me.api)
			{
				proxy.api = me.api;
				delete me.api;
			}
			else if (config.url)
			{
				proxy.url = config.url;
				delete config.url;
			}
			else if (me.url)
			{
				proxy.url = me.url;
				delete me.url;
			}
			else
			{
				if ((me.extraParams && me.extraParams.actionType) || (config.extraParams && config.extraParams.actionType))
				{
					if (me.autoSync)
					{
						proxy.api = {
							read		: IMS.Urls.gridData
							,create		: IMS.Urls.command
							,update		: IMS.Urls.command
							,destroy	: IMS.Urls.deleteData
						};

						proxy.writer = {
							type	: 'json'
							,writeAllFields: true
							,clientIdProperty: 'clientId'
						};
					}
					else
					{
						proxy.url = me.pageSize || config.pageSize ? IMS.Urls.gridData : IMS.Urls.comboData;
					}
				}
				else
				{
					Ext.Error.raise({msg: 'URL(s) not defined.'});
					return;
				}
			}

			if (config.extraParams)
			{
				proxy.extraParams = config.extraParams;
				delete config.extraParams;
			}
			else if (me.extraParams)
			{
				proxy.extraParams = Ext.merge(proxy.extraParams || { }, me.extraParams);
				delete me.extraParams;
			}

			/**
			 * Don't set the default proxy here since there may be proxy defined in the model
			 */
			//config.proxy = proxy;
			config.appDeafaultProxy = proxy;
		}

		/**
		 * 
		 */
		if (config.filterParams)
		{
			proxy.extraParams = proxy.extraParams || { };
			Ext.apply(proxy.extraParams, config.filterParams);
			delete config.filterParams;
		}

		//this.initConfig(config);
		this.callParent([config]);
	}
	,applyProxy: function(proxy)
	{
		var model = this.getModel();

		if (proxy !== null)
		{
			/**
			 * Added Section
			 */
			if (!proxy && this.appDeafaultProxy)
			{
				if (model)
				{
					proxy = model.getProxy();
				}

				if (!proxy)
				{
					proxy = this.appDeafaultProxy;
					delete this.appDeafaultProxy;
				}
			}

			if (proxy)
			{
				if (proxy.isProxy)
				{
					proxy.setModel(model);
				}
				else
				{
					if (Ext.isString(proxy)) {
						proxy = {
							type: proxy,
							model: model
						};
					} else if (!proxy.model) {
						proxy = Ext.apply({
							model: model
						}, proxy);
					}

					proxy = Ext.createByAlias('proxy.' + proxy.type, proxy);
					proxy.autoCreated = true;
				}
			}
			else if (model)
			{
				proxy = model.getProxy();
			}

			if (!proxy) {
				proxy = Ext.createByAlias('proxy.memory');
				proxy.autoCreated = true;
			}
		}

		return proxy;
	}
});
