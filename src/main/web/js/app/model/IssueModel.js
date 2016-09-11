/**
 * @author suman.t
 */

Ext.define('IMSAPP.model.IssueModel', 
{
	extend	: 'Ext.data.Model',
	fields	:
	[
	   { name :   "id"       	  			},
	   { name :   "ticketNo"       	  		},
	   { name :   "issueTypeId"       		},
	   { name :   "issueType"         		},
	   { name :   "userTypeId"        		},
	   { name :   "userType"          		},
	   { name :   "raisingForUserTypeId"    },
	   { name :   "raisingForUserType"      },
	   { name :   "categoryId"       		},
	   { name :   "category"       			},
	   { name :   "workflowNo"       		},
	   { name :   "assignedTo"       		},
	   { name :   "escalationLevel"       	},
	   { name :   "raisedBy"       			},
	   { name :   "callcenterUser"       	},
	   { name :   "crop"       				},
	   { name :   "district"       			},
	   { name :   "pincode"       			},
	   { name :   "hybrid"       			},
	   { name :   "raisingforUser"       	},
	   { name :   "name"       				},
	   { name :   "mobileNo"       			},
	   { name :   "lotNo"       			},
	   { name :   "damagePerc"       		},
	   { name :   "qty"       				},
	   { name :   "createdDate"       		},
	   { name :   "updatedDate"       		},
	   { name :   "status"       			},
	   { name :   "description"       		},
	   { name :   "comments" 				}
		
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