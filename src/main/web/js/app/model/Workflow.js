/**
 * @author rabindranath.s
 */

Ext.define('IMSAPP.model.Workflow', 
{
	extend	: 'Ext.data.Model',
	fields	:
	[
		 {	name: 'id'													}
		,{	name: 'name'												}
		,{	name: 'status'				,mapping: 'status'				}
		,{	name: 'isDefault'			,mapping: 'isDefault'			}
		,{	name: 'issueTypeName'		,mapping: 'issueType.name'		}
		,{	name: 'issueType'			,mapping: 'issueType.id'		}
		,{	name: 'userTypeName'		,mapping: 'userType.name'		}
		,{	name: 'userType'			,mapping: 'userType.id'			}
		,{	name: 'categoryName'		,mapping: 'category.name'		}
		,{	name: 'category'			,mapping: 'category.id'			}
		,{	name: 'subCategoryName'		,mapping: 'subCategory.name'	}
		,{	name: 'subCategory'			,mapping: 'subCategory.id'		}
		,{	name: 'workflowNo'			,mapping: 'workflowNo'			}
	]
	/*,proxy		:
	{
		type		: 'rest'
		,paramsAsJson: true
		,batchActions: false
		,api		:
		{
			read		: IMS.Urls.gridData
			,create		: IMS.Urls.command
			,update		: IMS.Urls.command
			,destroy	: IMS.Urls.deleteData
		}
		,reader		: 'jsonreader'
		,writer		:
		{
			type	: 'json'
			,writeAllFields: true
			,clientIdProperty: 'clientId'
		}
		,extraParams: {actionType: 'workflowService'}
	}*/
});