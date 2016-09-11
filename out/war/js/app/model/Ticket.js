/**
 * @author suman.t
 */

Ext.define('IMSAPP.model.Ticket', 
{
	extend	: 'Ext.data.Model'
	,fields	:
	[
		 { name : "id"							}
		,{ name : "ticketNo"					}
		,{ name : "issueTypeId"					}
		,{ name : "issueType"					}
		,{ name : "userTypeId"					}
		,{ name : "userType"					}
		,{ name : "raisingForUserTypeId"		}
		,{ name : "raisingForUserType"			}
		,{ name : "categoryId"					}
		,{ name : "category"					}
		,{ name : "subCategoryId"				}
		,{ name : "subCategory"					}
		,{ name : "workflowNo"					}
		,{ name : "assignedToId"				}
		,{ name : "assignedTo"					}
		,{ name : "escalationLevel"				}
		,{ name : "raisedBy"					}
		,{ name : "callcenterUser"				}
		,{ name : "callcenterUserId"			}
		,{ name : "crop"						}
		,{ name : "district"					}
		,{ name : "pincode"						}
		,{ name : "hybrid"						}
		,{ name : "name"						}
		,{ name : "mobileNo"					}
		,{ name : "lotNo"						}
		,{ name : "damagePerc"					}
		,{ name : "qty"							}
		,{ name : "createdDate"					}
		,{ name : "updatedDate"					}
		,{ name : "status"						}
		,{ name : "description"					}
		,{ name : "comments"					}
		,{ name : "role"						}
		,{ name : "defaultWorkflow"				}
		,{ name : "isUserSatisfy"				}
	]
});