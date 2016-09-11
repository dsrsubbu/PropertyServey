<%@page import="org.codehaus.jackson.map.ObjectMapper"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<!-- <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>:: IMS ::</title>
		<link rel="shortcut icon" href="./images/home/ims-background.png" type="image/png" />
		<link rel="stylesheet" type="text/css" href="css/home.css">
		<link rel="stylesheet" type="text/css" href="js/lib/ExtJs-5.1.1/packages/ext-theme-neptune/resources/navigation.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.5.0/css/font-awesome.min.css">
	
		<%@ include file="common/userDetails.jsp"%>
		<%@ include file="common/common-js-css.jsp"%>
		
		<script type="text/javascript">
			var forcedLogout	=	'<%=session.getAttribute("FORCEDLOGOUT")%>';
			var ticketNo		=	'<%=session.getAttribute("ticketNo")%>';
			var refresh			=	'<%=request.getParameter("r")%>';
			var FC_PWD_FLAG		=	0;
		</script>

		<!-- <script type="text/javascript" src="js/modules/home/home.js"></script> -->
		<script type="text/javascript" src="js/modules/masters/category.js"></script>
		<script type="text/javascript" src="js/modules/masters/subCategory.js"></script>
		<script type="text/javascript" src="js/modules/masters/hybrid.js"></script>
		<script type="text/javascript" src="js/modules/masters/user.js"></script>
		<script type="text/javascript" src="js/modules/masters/dashboard.js"></script>
		<script type="text/javascript" src="js/modules/parivaarDataSync/parivaarDataSync.js"></script>
		<script type="text/javascript" src="js/app.js"></script>

	</head>
<style type="text/css">
html {
	height: 100%;
	width: 100%;
}
body {
	height: 100%;
	width: 100%;
	margin: 0 auto;
}
</style>
<body id="home-body" style='background-color:#fff; font-family: "Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif,FontAwesome;'>

</body>
</html>