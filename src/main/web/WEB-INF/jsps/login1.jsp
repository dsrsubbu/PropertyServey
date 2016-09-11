<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		 <% 
   			String message 		=   request.getAttribute("message") != null ? "*"+(String) request.getAttribute("message") : "";
		%>
		<%@ include file="common/common-js-css.jsp"%>
		<link rel="shortcut icon" href="./images/home/ims-background.png" type="image/png" />
         <script type="text/javascript" src="js/modules/masters/ticket.js"></script>
         <script type="text/javascript" src="js/lib/jquery/jquery-1.11.2.min.js"></script>

<style type="text/css">
*{ margin:0; padding:0; }
body, div, span, p, a, img, ul, ol, li, table, th, tr, td, form, fieldset, legend, dl, dt, dd, blockquote, applet, object { border:0; }
body 
{ 
	padding:0; 
	font: 0.8em/1.5 "arial",sans-serif; 
	color: #000; 
}
a {color:#734105;}
a:link {color:#734105;}
a:hover {color:#a6600c;}
h1, h2, h3, h4, h5, h6 { margin:15px 0 10px 0; }
h1 { font-size:200%; }
h2 { font-size:140%;  color: #734105;font-weight: normal; margin: 0; padding: 10px 26px;}
h2 a{text-decoration: none;}
h3 { font-size:120%; }
h4 { font-size:120%; }
h5 { font-size:100%; }
#layout 
{ 
    width: 100%;
    margin: 0 auto;
    text-align: left;
}
#header 
{
    position: relative;
    height: 90px;
    background: #097B21;
    font-size: 20px;
    color: #fff; 
}
#logo 
{
	margin: 0;
    padding: 7px 0 0 30px;
	float: left;
}
.hlogo{width:70px;}
#logo a{color: #ffffff;font-weight: normal;text-decoration: none;}
#logo a:hover{color: #fff;}
#container 
{ 
    min-height: 88vh;
    background: url("./images/home/ims-background.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
} 
.content 
{
    width: 100%;
    padding-top: 11px;
}
.cform
{
	width: 86%;
    margin-left: 7%;
    padding: 0px 10px;
    position: relative;
	min-height: 15vh;
	
}
.cform h1
{
	color: #06A728;
    font-weight: bold;
    text-align:center;
    font-family: verdana;
     font-size: 176%;
}
.sbutton
{
	float:right;
}
.xsubmit
{
    padding: 8px 30px;
    border: 0px  !important;
    background: #919191  !important;
    color: #fff;
    font-size: 16px;
    font-weight:bold;
    cursor : ponter;
}
.xsubmit:hover
{
	background-color: #87b41b  !important;
	
}
.ysubmit:hover
{
	background-color: #919191  !important;
	
}
.ticketForm
{
	margin-left:110px !important;
}
.ysubmit
{
    padding: 8px 30px;
    border: 0px  !important;
    background: #87b41b !important;
    color: #fff;
    font-size: 16px;
    font-weight:bold;
    cursor : ponter;
}
#raise_issue 
{
    width: 70%;
    margin-left: 200px;
    background: rgba(255, 255, 255, 0.68) none repeat scroll 0 0;
    border: 3px solid #06a728;
    margin-top: 20px;
}
.ticketForm .x-title-text 
{
    color: seagreen;
    display: table-cell;
    font-family: cursive;
    font-size: 17px;
    font-weight: bold;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
}
.x-panel-body-default 
{
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0 !important;
}
.x-toolbar-footer 
{
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0 !important;
}
.login_form_Div
{
  background-color: black;
  border: none;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  font-family: 'Nobile',sans-serif;
  font-style: italic;
  font-weight: 900;
  margin: 1px;
  padding: 7px 23px;
}
.login_form_Div:hover
{
	background-color : green;
}
#login_block 
{
    float: right;
    margin-top: -33px;
}

.form
{
	border-radius:2px;
	padding:20px 30px;
	box-shadow:0 0 15px;
	font-size:14px;
	font-weight:bold;
	width:350px;
	margin:20px 250px 0 35px;
	float:left;
}
.inputclass
{
	width:100%;
	height:35px;
	margin-top:5px;
	border:1px solid #999;
	border-radius:3px;
	padding:5px;
}
#logindiv
{
	opacity:0.92;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 100%;
	width: 100%;
	background-image: url(./images/home/ims-background.jpg);
	 background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
	display: none;
}
#login {
    border: 5px solid green;
    color: #2b3b2b;
    font-family: verdana;
    margin: 0;
    position: relative;
    width: 350px;
}
.img 
{
    float: right;
    margin-right: -26px;
    margin-top: -17px;
}

#login
{
	left: 50%;
	top: 50%;
	margin-left:-210px;
	margin-top:-158px;
}
#cancel_btn
{
	cursor: pointer;
}
.alert
{
	font-family:Arial, Helvetica, sans-serif; 
	font-size:12px; 
	width:280px; 
	margin-left:40px;
	margin-top:5px;
	color: #B22222;
}
.login_btn 
{
    border-radius: 3px !important;
    color: #fff;
    font-family: Times New Roman;
    font-size: 15px;
    font-weight: bold;
    width: 80px;
}
.login_btn:HOVER {
	background-color: #2E8B57!important;
}
#validate {
    margin-left: 20px !important;
    top: 30px !important;
}
#header_text 
{
    color: #ccc;
    font-family: verdana,sans-serif;
    font-size: 20px;
    font-weight: bold;
    padding: 35px;
    text-align: center;
}
</style>   
<script>
var message = '<%=message%>';
$(document).ready(function() 
{
	 $(".login_form_Div").click(function() 
	  {
		 $("#raise_issue").css("display", "none");
		 $("#logindiv").css("display", "block");
	 });
	 $("#cancel").click(function() 
	 {
	 	$(this).parent().parent().hide();
	 	$("#raise_issue").css("display", "block");
	 });
	 $("#cancel_btn").click(function() 
	  {
		 $("#logindiv").css("display", "none");
		 $("body").css("display", "block");
		 $("#raise_issue").css("display", "block");
	  });
 });
</script>
</head>

<body>
<div id="header">
	<div id='header_text'>PHI Issue Management System</div>
	<div id='login_block'><input class = 'login_form_Div' type="submit" value="Login"></div>
</div>
<div id="container" class="box">
	<div id="obsah" class="content box">
		<div class="cform">
			<h1>Raise Your Ticket</h1>
			<div id="raise_issue"></div>
		</div>
	</div>
</div>

 <!--Login Form -->
<div id="logindiv">
	<form class="form" id="login"  action="home.htm?actionName=login" method="post" name="loginForm" onsubmit="return validate()">
	<img src="./images/delete.png" class="img" id="cancel"/>
	<h3>Login</h3>
	<br/>
	<div id="errorMsg" class="alert"><%= message%></div>
	<label>Username : </label>
	<br/>
	<input class='inputclass' type="text" id="username" name ='userName'/><br/>
	<br/>
	<label>Password : </label>
	<br/>
	<input class='inputclass' type="password" id="password" name="password"/><br/>
	<br/>
	<button type = "submit" class="ysubmit">Login</button>
	<input  type="button" class = "xsubmit" id="cancel_btn" value="Cancel"/>
<br/>

</form>

</div>

</body>
</html>