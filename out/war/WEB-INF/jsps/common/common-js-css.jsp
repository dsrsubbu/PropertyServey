<%@page import="com.ims.Constants"%>
<%
    String contextPath      =   request.getContextPath();
%>
<style type="text/css" title="currentStyle" media="screen">
    @import "<%=contextPath %>/js/lib/ExtJs-5.1.1/packages/ext-theme-neptune/resources/ext-theme-neptune-all-debug.css";
    <%-- @import "<%=contextPath %>/js/lib/ExtJs-5.1.1/packages/sencha-charts/neptune/resources/sencha-charts-all.css"; --%>
    @import "<%=contextPath %>/css/iconCls.css";
    @import "<%=contextPath %>/css/override.css";
    @import "<%=contextPath %>/theme/custom";
    @import "<%=contextPath %>/theme/default";
</style>

<script type="text/javascript" src="<%=contextPath %>/js/lib/ExtJs-5.1.1/ext-all-debug.js"></script>
<%-- <script type="text/javascript" src="<%=contextPath %>/js/lib/ExtJs-5.1.1/sencha-charts.js"></script> --%>
<script type="text/javascript" src="<%=contextPath %>/js/lib/ExtJs-5.1.1/packages/ext-theme-neptune/ext-theme-neptune-debug.js"></script>
<script type="text/javascript" src="<%=contextPath %>/js/common/overrides.js"></script>
<script type="text/javascript">
	var IMS = window.IMS || { };
	IMS.APPLICATION_MODE = 'DEVELOPMENT'; //DEPLOYMENT/DEVELOPMENT
	var contextPath = '<%=contextPath%>';
	Ext.Loader.setConfig({enabled: true, disableCaching: false});
	Ext.Loader.setPath('Ext.ux', contextPath + '/js/lib/ExtJs-5.1.1/ux');
</script>

<script type="text/javascript" src="<%=contextPath %>/js/common/Utilities.js"></script>
<script type="text/javascript" src="<%=contextPath %>/js/common/appLabels.js"></script>
<script type="text/javascript" src="<%=contextPath %>/js/common/ext-custom-components.js"></script>
<script type="text/javascript" src="<%=contextPath %>/js/common/ext-common.js"></script>
