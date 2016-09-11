/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.store.grid.GridStore',
{
	extend		: 'IMSAPP.store.Store'
	,alias		: 'store.gridstore'
	,requires	: 'IMSAPP.store.Store'
	,pageSize	: 20
	,autoLoad 	: false
	,autoDestroy: true
	,remoteSort	: true
	,remoteFilter: true
	,config		: {pageSize	: 20}
	,isFirstLoad: true
	,listeners	:
	{
		beforeload: function(s) {
			/**
			 * To prevent the first default loading bug when filter plug-in applied
			 */
			if (s.remoteFilter && s.isFirstLoad)
			{
				s.isFirstLoad = false;
				return false;
			}
		}
	}
});
