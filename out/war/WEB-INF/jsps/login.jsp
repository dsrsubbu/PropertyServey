<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	    <% 
   			String message 		=   request.getAttribute("message") != null ? "*"+(String) request.getAttribute("message") : "";
		%>
		
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
     <title>IMS</title>
     
		<link rel="stylesheet" type="text/css" href="js/lib/ExtJs-5.1.1/packages/ext-theme-neptune/resources/navigation.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.5.0/css/font-awesome.min.css">
		<%@ include file="common/common-js-css.jsp"%>
      <script type="text/javascript" src="js/modules/masters/ticket.js"></script>
      <script type="text/javascript" src="js/lib/jquery/jquery-1.11.2.min.js"></script>
     
 <style type="text/css">
 body
 {
	 margin : 0px;
     background-color: #ededed;
 }
 #header_part {
    background-color: seagreen;
    box-shadow: 0 14px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    height: 75px;
    margin: 1px;
    width: 99.8%;
}
 #validate {
    margin-left: 10px !important;
    margin-top: 14px !important;
}
#header_text {
    color: #ddddce;
    font-family: cursive;
    font-size: 20px;
    font-weight: bold;
    padding: 19px;
    text-align: center;
}
 
#raise_issue {
    margin: 44px 75px 75px 189px;
    width: 70%;
}
.ticketForm .x-title-text {
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
.ticketForm {
    box-shadow: 0 14px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.x-toolbar-footer {
    background-color: #EAEAEA;
    background-image: none;
    border-color: #c1c1c1;
    border-style: solid;
    border-width: 0;
    padding: 6px 0 6px 6px;
}
.x-panel-body-default {
    margin-left: 82px;
    width: 852px !important;
}
.login_form_Div{
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
.login_form_Div:hover{
background-color : green;
}

#login_block {
    float: right;
    margin-right: 5px;
    margin-top: -18px;
}

.form{
border-radius:2px;
padding:20px 30px;
box-shadow:0 0 15px;
font-size:14px;
font-weight:bold;
width:350px;
margin:20px 250px 0 35px;
float:left;
}
.inputclass{
width:100%;
height:35px;
margin-top:5px;
border:1px solid #999;
border-radius:3px;
padding:5px;
}
.x-btn.x-btn-default-small {
    padding: 8px 30px;
    border: 0px;
    background: #919191;
    color: #fff;
    font-size: 16px;
    box-shadow: 0px 4px 0px #716F6F;
}

#logindiv{
opacity:0.92;
position: absolute;
top: 0px;
left: 0px;
height: 100%;
width: 100%;
background: #000;
display: none;
}

#login{
width:350px;
margin:0px;
background-color:white;
font-family: 'Fauna One', serif;
position: relative;
border: 5px solid rgb(90, 158, 181);
}

.img {
    background-color: #ccc;
    border: 1px solid #ccc;
    border-radius: 12px;
    float: right;
    margin-right: -26px;
    margin-top: -17px;
}

#login{
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
.login_btn {
    border-radius: 3px !important;
    color: #fff;
    font-family: Times New Roman;
    font-size: 15px;
    font-weight: bold;
    width: 80px;
    box-shadow: 2px 3px #cccccb;
}
.login_btn:HOVER {
	background-color: #2E8B57!important;
}
 </style>   
 <script>
 var message = '<%=message%>';
 $(document).ready(function() {
	 
	 $(".login_form_Div").click(function() {
		 $("#raise_issue").css("display", "none");
		 $("#logindiv").css("display", "block");
		 });

	
	 $("#cancel").click(function() {
	 $(this).parent().parent().hide();
	 $("#raise_issue").css("display", "block");
	 });
	 $("#cancel_btn").click(function() {
		 $("#logindiv").css("display", "none");
		 $("body").css("display", "block");
		 $("#raise_issue").css("display", "block");
		 });
 });
 
 </script>
</head>
<body>
<div id='header_part'>
<div id='header_text'>PHI Issue Management Service</div>
<div id='login_block'><input class = 'login_form_Div' type="submit" value="Login">
</div>
</div>
 <div id='raise_issue'>
 </div>   
 
 <!--Login Form -->
<div id="logindiv">
<form class="form" id="login"  action="home.htm?actionName=login" method="post" name="loginForm" onsubmit="return validate()">
<img src="./images/delete.png" class="img" id="cancel"/>
<h3>Login</h3>
<hr/><br/>
<div id="errorMsg" class="alert"><%= message%></div>
<label>Username : </label>
<br/>
<input class='inputclass' type="text" id="username" name ='userName'/><br/>
<br/>
<label>password : </label>
<br/>
<input class='inputclass' type="password" id="password" name="password"/><br/>
<br/>
<button type = "submit" class="login_btn x-btn x-btn-default-small">Login</button>
<input  type="button" class = "login_btn x-btn x-btn-default-small " id="cancel_btn" value="Cancel"/>
<br/>

</form>

</div>
 
</body>
</html>