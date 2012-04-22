/*
 * This file is the base javascript file for all other javascript
 * files.You should add this file into your project.
 * Author: Allen Heavey
 * E-mail: ista.allen@gmail.com
 * Date: 2012/04/19
 * */
(function(){
	/***********************************************************
	 * iBistuGap
	 * This file is used to create a database!
	 * author: Allen
	 * Data: 2012/04/16
	 * 
	 ***********************************************************/
	//全局后缀名MAIN
	GLOBAL.namespace("MAIN");

	var log = document.getElementById("logs");
	var iBistuDB;
	
	(function onDeviceReady(){
		/*
		 * 创建数据库，其中由Android源代码可知：
		 * 仅有第一个参数有效果，其它参数现在无效。
		 * */
		iBistuDB = window.openDatabase("iBistu","0.1","BistuDB",100000);
		iBistuDB.transaction(populateDB,errorCB,successCB);
		
	})();
	

	var insertFlag = -1;

	function createTableOrNot(tx,results) {
		if(results.rowsAffected == 0){
			insertFlag = 0;
		}
		else {
			insertFlag = 1;
		}
	}

	// 数据库操作(事务处理)
	// 初始化各个表(如果表格不存在的话)
	function populateDB(db){
		
		db.executeSql('CREATE TABLE IF NOT EXISTS iBistu (id unique, data)',[],createTableOrNot);
		db.executeSql('CREATE TABLE IF NOT EXISTS building (id unique, buidingCode,buidingName)',[],createTableOrNot);
		db.executeSql('CREATE TABLE IF NOT EXISTS classroom (id unique, roomName,roomCode,buildingId)',[],createTableOrNot);
		db.executeSql('CREATE TABLE IF NOT EXISTS college (id unique, collegeName,collegeCode)',[],createTableOrNot);
		db.executeSql('CREATE TABLE IF NOT EXISTS course (id unique, courseName,courseCode,courseTeacher,courseInfo,majorId)',
						[],createTableOrNot);
		db.executeSql('CREATE TABLE IF NOT EXISTS major (id unique, majorName,majorCode,collegeId)',[],createTableOrNot);
		db.executeSql('CREATE TABLE IF NOT EXISTS classtime (id unique, classroomId,date,courseId1,courseId2,courseId3,' +
			'courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)',
				[],createTableOrNot);
	}
	// 当执行SQL失败后调用此方法
	function errorCB(error){
		log.innerHTML = "<p>Oh,SQL failed!</p>";
	}

	// 当执行SQL成功后调用此方法
	function successCB(){
		log.innerHTML = "<p>Congratulation!SQL success!</p>";
	}
	
	//用来显示查询得到的数据的div
	var showList = document.getElementById("lists");

	//当查询成功后调用的方法
	function querrySuccess(tx,results){
		var len = results.rows.length;
		for(var i = 0; i < len; i++){
			var oldHTML = showList.innerHTML;
			showList.innerHTML = oldHTML + "<p>" + results.rows.item(i).id + "--->" + results.rows.item(i).data + "</p>";
		}
	}
	// 这里存放查询语句。查询数据库。
	function getAllItems(db){
		db.executeSql("select * from iBistu",[],querrySuccess,errorCB);
	}
	
	//执行数据库操作
	function getFromSql(){
		iBistuDB.transaction(getAllItems,errorCB);
	}

	var inputString;
	var counter = 1;

	function addIntoSql(){
		inputString = document.getElementById("inputText").value + "";
		iBistuDB.transaction(executeAddSql,errorCB,successCB);
	}

	//'INSERT INTO iBistu (id, data) VALUES (2, "Second row")'
	function executeAddSql(db){
		//这里有一处调试了很久的BUG------> "+ "'"+ inputString + "'" +" <-----------必须形如这样的才能被添加进数据库
		//即须加单引号.经网上查询得，如果不加引号或空格，将会把逗号与字符串等看成一个字符串。
		db.executeSql("INSERT INTO iBistu (id, data) VALUES ("+ counter + ",'"+ inputString + "')");
		counter++;
	}
	
	GLOBAL.MAIN.getInfo = function(){
		getFromSql();
	}
	
	var clickButton = document.getElementById("getSql");
	clickButton.addEventListener("click",GLOBAL.MAIN.getInfo,false);
	
	var addButton = document.getElementById("addButton");
	addButton.addEventListener("click",addIntoSql,false);

//**************************************************************
	//This just use for test!!!!!!!!!!!!!
	var jsonButton = document.getElementById("jsonTest");
	jsonButton.addEventListener("click",parseJson,false);
	
	function parseJson(){
		var jsonString = {"name":"Allen Heavey","age":21};
		var json = JSON.parse(jsonString);
		alert(json.name + "--->" +json["age"] + "");
		
	}
//**************************************************************	
	//处理传过来的JSON数据(Table------>building)
	function getBuildingInfo(jsonBuilding){
		
		var building;
		
		try {
			building = JSON.parse(jsonBuilding);
			
			return building;
		} catch (e) {
			console.log("Get building data error!");
			return null;
		}
		
	}
	
	function insertBuildingTable(tx){
		
		var building = getBuildingInfo();
		
		if(building != null){
			var buildingID = building["id"];
			var buildingCode = building["buildingCode"];
			var buildingName = building["buildingName"];
			
			tx.executeSql("insert into building (id,buildingCode,buildingName) values (" + 
					"'" + buildingID + "','" + buildingCode + "','" + buildingName + "')");
		}
	}
	
	//处理传过来的JSON数据(Table------>classroom)
	function getClassroomInfo(jsonClassroom){
		
		var classroom;
		try {
			classroom = JSON.parse(jsonClassroom);
			return classroom;
		} catch (e) {
			console.log("Get the classroom data failed!");
			return null;
		}
	}
	
	function insertClassroomTable(tx){
		
		var classroom = getClassroomInfo();
		
		if(classroom != null){
			var roomID = classroom["id"];
			var roomName = classroom['roomName'];
			var roomCode = classroom["roomCode"];
			var buidingID = classroom["buildingId"];
			
			tx.executeSql("insert into classroom (id,roomName,roomCode,buildingId) values("
					+ "'" + roomID + "','" + roomName + "','" + roomCode + "','" + buildingID + "')");
		}
		
	}
	
	//处理传过来的JSON数据(Table------>college)
	function getCollegeInfo(jsonCollege){
		
		var college;
		
		try {
			college = JSON.parse(jsonCollege);
			return college;
		} catch (e) {
			console.log("Get college data failed!");
			return null;
		}
	}
	
	function insertCollegeTable(tx){
		
		var college = getCollegeInfo();
		
		if(college != null){
			var collegeID = college["id"];
			var collegeName = college["collegeName"];
			var collegeCode = college["collegeCode"];
			
			tx.executeSql("insert into college (id,collegeName,collegeCode) values ("
					+ "'" + collegeID + "','" + collegeName + "','" + collegeCode + "')");
		}
		
	}
	
	
	//处理传过来的JSON数据(Table------>course)
	function getCourseInfo(jsonCourse){
		
		var course;
		
		try {
			course = JSON.parse(jsonCourse);
			return course;
		} catch (e) {
			console.log("Get the course data failed!");
			return null;
		}
	}
	
	function insertCourseTable(tx){
		var course = getCourseInfo();
		
		if(course != null){
			var courseID = course["id"];
			var courseName = course["courseName"];
			var courseCode = course["courseCode"];
			var courseTeacher = course["courseTeacher"];
			var courseInfo = course["courseInfo"];
			var majorID = course["majorId"];
			
			tx.executeSql("insert into course (id,courseName,courseCode,courseTeacher,courseInfo,majorId) " +
					"values (" + "'" + courseID + "','" + courseName + "','" + courseCode + "','" + courseTeacher 
					+ "','" + courseInfo + "','" + majorID + "')");
		}
	}
	
	//处理传过来的JSON数据(Table------>major)
	function getMajorInfo(jsonMajor){
		
		var major;
		
		try {
			major = jsonMajor.parse(jsonMajor);
			return major;
		} catch (e) {
			console.log("Get the major data failed!");
			return null;
		}
		
	}
	
	function insertMajorTable(tx){
		
		var major = getMajorInfo();
		
		if(major != null){
			var majorID = major["id"];
			var majorName = major["majorName"];
			var majorCode = major["majorCOde"];
			var collegeID = major["collegeId"];
			
			tx.executeSql("insert into major (id,majorName,majorCode,collegeId) values (" + "'" 
					+ majorID + "','" + majorName + "','" + majorCode + "','" + collegeID + "')");
		}
	}
	
	//处理传过来的JSON数据(Table------>classtime)
	function getClasstimeInfo(jsonClasstime){
		
		var classtime;
		
		try {
			classtime = JSON.parse(jsonClasstime);
			return classtime;
		} catch (e) {
			console.log("Get classtime data failed!");
			return null;
		}
	}
	
	function insertClasstimeTable(tx){
		
		var classtime = getClasstimeInfo();
		
		if(classtime != null){
			var classtimeID = classtime["id"];
			var classroomID = classtime["classroomId"];
			var classDate = classtime["date"];
			var courseID1 = classtime["courseId1"];
			var courseID2 = classtime["courseId2"];
			var courseID3 = classtime["courseId3"];
			var courseID4 = classtime["courseId4"];
			var courseID5 = classtime["courseId5"];
			var courseID6 = classtime["courseId6"];
			var courseID7 = classtime["courseId7"];
			var courseID8 = classtime["courseId8"];
			var courseID9 = classtime["courseId9"];
			var courseID10 = classtime["courseId10"];
			var courseID11 = classtime["courseId11"];
			
			tx.executeSql("insert into classtime (id,classroomId,date," + 
					"courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)" +
					"values (" + "'" + classtimeID + "','" + classroomID + "','" + classDate + "','" + courseID1 + "','" + courseID2 
					 + "','" + courseID3 + "','" + courseID4 + "','" + courseID5 + "','" + courseID6 + "','" + courseID7 + "','" + courseID8 + "','" 
					 + courseID9 + "','" + courseID10 + "','" + courseID11+ "')");
		}
	}
	
	var getIntro = document.getElementById("getIntro");
	
	getIntro.addEventListener("click",getIntroInfo,false);
	
	var myXML = new XMLHttpRequest();
	
	function getIntroInfo(){
		
		function getInfo(){
		
		console.log("Get info");
		if(myXML.readyState == 4){
			var respons = myXML.responseText;
			var jsonText = JSON.parse(respons);
			
			log.innerHTML = "<p>" + jsonText[0].id + "-->" + jsonText[0].introName + "</p>";
			
			}
		}
		
		myXML.onreadystatechange = getInfo;
		myXML.open("GET","http://m.bistu.edu.cn/api/api.php?table=intro&action=list",true);
		myXML.send(null);
		console.log("Get success");
		
	

	}
	
	
	
	
	
	
	
	
})();




















