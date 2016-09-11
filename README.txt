Installation of the workspace
-----------------------------

1. Install ant 1.7.1
2. Copy the build.properties.template as build.properties and make change with appropriate property values
3. Change the properties to actual values in build.properties


Note: Please do not commit or add the following files [Add to SVN ignore list]
    1. build.properties
    2. thumbs.db
	3. .settings
	4. .classpath
	5. .project
	
Create a XML file with IA.xml with appropriate content similar to the following.. and paste it into <<TOMCAT-HOME>>\conf\Catalina\localhost

	<Context path="/IA" docBase="H:/SVN-WORKS/IA/out/war" debug="0" reloadable="true"/>
	

Build Targets:
--------------
The following are the build target are avaiable for developers
Note: Ignore the targets which are not recommended at the time of development
	01. clean - Clean output dirs
	02. build - Compile main Java sources and copy libraries
	03. publishALL - To publish all files inside "web" directory to out-war directory
	04. publishCSS - To publish all files inside css" directory to out-war directory
	05. publishJS - To publish all files inside "scripts" directory to out-war directory
	06. publishImages - To publish all files inside "images" directory to out-war directory
	07.	publishJSPs - To publish all files inside "jsps" directory to out-war directory

Build Database:
---------------
1. If you are using Mysql, Ensure to "set global max_allowed_packet = 1073741824;" for huge file uploads
   this will support adding blob objects of size upto 1GB file per transaction. if you need more, you can set the same.
    Steps to increase the max_allowed_packet size:
    1. open mysql command prompt using root priveleges
    2. type the following syntax which sets max packet size allowed to 1024*1024*1024
        Syntax: set global max_allowed_packet = 1073741824;
