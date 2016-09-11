/**
 * @author rabindranath.s
 * @override Avoided default creation of Proxy
 */

Ext.define('IMSAPP.override.model.Model', 
{
	override: 'Ext.data.Model'
	,statics: {
	getProxy: function()
	{
		var me = this,
		proxy = me.proxy,
		defaults;

		if (!proxy) {
			// Check what was defined by the class (via onClassExtended):
			proxy = me.proxyConfig;

			if (!proxy || !proxy.isProxy) {
				if (typeof proxy === 'string') {
					proxy = {
						type: proxy
					};
				}
				// We have nothing or a config for the proxy. Get some defaults from
				// the Schema and smash anything we've provided over the top.
				//defaults = me.schema.constructProxy(me);
				proxy = proxy ? Ext.merge(defaults, proxy) : defaults;
			}

			proxy = me.setProxy(proxy);
		}

		return proxy;
	}}
});