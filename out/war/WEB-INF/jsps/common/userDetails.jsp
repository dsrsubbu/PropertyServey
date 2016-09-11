<%@page import="com.ims.Constants"%>
<%@page import="com.ims.hibernate.models.UserInfo"%>
<%@page import="java.util.List"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%
    UserInfo userInfo = ((UserInfo) session.getAttribute(Constants.USERSESSION));
	Long ticketId = ((Long) session.getAttribute("TICKETID"));
%>
<script type="text/javascript">
var CURRENTUSER = {
	ROLE	: <%=userInfo.getRole() != null ? userInfo.getRole().getId() : null%>,
	ID		: <%=userInfo.getId()%>,
	NAME	: '<%=userInfo.getName()%>',
	CU		: <%=userInfo.getCommercialUnit() != null ? userInfo.getCommercialUnit().getId() : null %>,
	REGION	: <%=userInfo.getRegion() != null ? userInfo.getRegion().getId() : null %>,
	ACCESS_LEVEL: '<%= userInfo.getRole() != null ? userInfo.getRole().getAccessLevel() : null%>',
	MOBILE_NO: '<%=userInfo.getMobileNo()%>',
	USER_TYPE: <%=userInfo.getUserType().getId()%>
}

var CONSTANTS = {
		STATUS	: {
			ACTIVE_KEY		: <%=Constants.Staus.ACTIVE_KEY%>,
			INACTIVE_KEY	: <%=Constants.Staus.INACTIVE_KEY%>,
			ACTIVE			: '<%=Constants.Staus.ACTIVE%>',
			INACTIVE		: '<%=Constants.Staus.INACTIVE%>'
		},
		ROLES	: {
			AG_DEV_MANAGER				:	<%=Constants.Roles.AG_DEV_MANAGER%>,
			CORPORATE_DATA_ANALYST		: <%=Constants.Roles.CORPORATE_DATA_ANALYST%>,
			COUNTRY_HEAD				:	<%=Constants.Roles.COUNTRY_HEAD%>,
			COUNTRY_DIRECTOR			:	<%=Constants.Roles.COUNTRY_DIRECTOR%>,
			NMSS						:	<%=Constants.Roles.NMSS%>,
			SSM							:	<%=Constants.Roles.SSM%>,
			NATIONAL_SALES_EFFECTIVENESS_TRAINING : <%=Constants.Roles.NATIONAL_SALES_EFFECTIVENESS_TRAINING%>,
			REGIONAL_BUSINESS_HEAD		: <%=Constants.Roles.REGIONAL_BUSINESS_HEAD%>,
			STRATEGIC_AGRONOMY_MANAGER 	: <%=Constants.Roles.STRATEGIC_AGRONOMY_MANAGER%>,
			STRATEGIC_MARKETING_MANAGER	: <%=Constants.Roles.STRATEGIC_MARKETING_MANAGER%>,
			ADMIN						:	<%=Constants.Roles.ADMIN%>,
			CAMPAIGN_ANALYST_MANAGER 	: <%=Constants.Roles.CAMPAIGN_ANALYST_MANAGER%>,
			COMMERCIAL_UNIT				:	<%=Constants.Roles.COMMERCIAL_UNIT_DIRECTOR%>,
			CU_AGRONOMY_MANAGER 		: <%=Constants.Roles.CU_AGRONOMY_MANAGER%>,
			CU_DATA_ANALYST				: <%=Constants.Roles.CU_DATA_ANALYST%>,
			CU_MARKETING_MANAGER 		: <%=Constants.Roles.CU_MARKETING_MANAGER%>,
			CU_SALES_EFFECTIVENESS_MANAGER : <%=Constants.Roles.CU_SALES_EFFECTIVENESS_MANAGER%>,
			RBM							:	<%=Constants.Roles.RBM%>,
			TBL							:	<%=Constants.Roles.TBL%>,
			CC							:	<%=Constants.Roles.CC%>
		},
		ROLES_ACCES_LEVEL : {
			COUNTRY	: '<%=Constants.RolesAccesLevel.COUNTRY%>',
			CU	: '<%=Constants.RolesAccesLevel.CU%>',
			REGION	: '<%=Constants.RolesAccesLevel.REGION%>',
			TERRITORY	: '<%=Constants.RolesAccesLevel.TERRITORY%>'
		},
		TICKET_STATUS: {
			OPEN: '<%=Constants.TicketStatus.OPEN%>',
			ASSIGNED: '<%=Constants.TicketStatus.ASSIGNED%>',
			CLOSED: '<%=Constants.TicketStatus.CLOSED%>'
		},
		USER_TYPE: {
			FARMER: <%=Constants.UserType.FARMER%>,
			RETAILER: <%=Constants.UserType.RETAILER%>,
			EMPLOYEE: <%=Constants.UserType.EMPLOYEE%>
		},
		ISSUE_TYPE: {
			COMPLAINT: <%=Constants.IssueType.COMPLAINT%>,
			QUERY: <%=Constants.IssueType.QUERY%>,
			FEEDBACK: <%=Constants.IssueType.FEEDBACK%>,
			PAYBACK: <%=Constants.IssueType.PAYBACK%>
		},
		TICKET : {
			TICKETID : <%=ticketId%>
		}
}

</script>
</head>
<body>
</body>
</html>