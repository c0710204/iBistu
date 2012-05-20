/*
* This file is the base javascript file for all other javascript
* files.You should add this file into your project.
* Author: Allen Heavey
* E-mail: ista.allen@gmail.com
* Date: 2012/04/19
* */

/***********************************************************
 * iBistuGap
 * This file is used to create a database!
 * author: Allen
 * Data: 2012/04/16
 *
 ***********************************************************/

var iBistuDB,collegeItemLength;
var databaseExist = window.localStorage.getItem("databaseExist");
var updateCollege = window.localStorage.getItem("updateCollege");

console.log("database status--->" + databaseExist);

/*
 * create a ajax function to get the data frome server!
 * then parse and return the responseText to json!
 * */
function getFromServer(type,url){
    var xhr = new XMLHttpRequest();
    var resp = null;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if((xhr.status >= 200 && xhr.status < 300)|| xhr.status == 304){
                try{
                    resp = JSON.parse(xhr.responseText);
                    // collegeItemLength = resp.length;
                    // for(var i = 0, len = resp.length; i < len; i++){
                        // console.log("collegeName="+resp[i].collegeName + ",collegeCode=" + resp[i].collegeCode);
                        // var temName = "collegeName" + i;
                        // var temCode = "collegeCode" + i;
                        // window.localStorage.setItem(temName,resp[i].collegeName);
                        // window.localStorage.setItem(temCode,resp[i].collegeCode);
                        // }
                    switch(type){
                        case "college": (function(){
                            iBistuDB.transaction(function(tx){
                                console.log("Transaction execute!");
                                tx.executeSql('DROP TABLE IF EXISTS college');
                                tx.executeSql('create table if not exists college (collegeName,collegeCode)')
                                for(var i = 0, len = resp.length; i < len; i++){
                                    tx.executeSql('insert into college (collegeName,collegeCode)' +
                                ' values ("'+ resp[i].collegeName + '","' + resp[i].collegeCode +'")');
                                }
                            },
                            errorCB,
                            successCB);
                        })();break;
                        case "building": updateBuilding;break;
                        
                        
                        default: noUpdate;
                    }    
                    
                }catch(e){
                    console.log("insert into college error!");
                }
            }
            else {
                console.log("Get data from server error" + xhr.status);
            }
        }
    }
    xhr.open("GET",url,true);
    xhr.send(null);
}

/*
 * database create!
 * */
(function onDeviceReady() {
    /*
     * 创建数据库，其中由Android源代码可知：
     * 仅有第一个参数有效果，其它参数现在无效。
     * */
    iBistuDB = window.openDatabase("iBistu", "0.1", "BistuDB", 100000);
    
    if(databaseExist == false){
        iBistuDB.transaction(populateDB, errorCB, successCB);
    }
    
    if(iBistuDB == undefined){
        databaseExist = true;
        window.localStorage.setItem("databaseExist","true");
    }
    else {
        window.localStorage.setItem("databaseExit","false");
    }
    //just for test & use funciotn insertCollegeNow!
    if(updateCollege != null){
        
        iBistuDB.transaction(insertCollegeTable, errorCB, successCB);
        window.localStorage.setItem("updateCollege","update");
    }
    
})();

var insertFlag = -1;

function createTableOrNot(tx, results) {
    if(results.rowsAffected == 0) {
        insertFlag = 0;
    } else {
        insertFlag = 1;
    }
    console.log("createTable flag--->" + insertFlag);
}

// 数据库操作(事务处理)
// 初始化各个表(如果表格不存在的话)
function populateDB(db) {

    db.executeSql('CREATE TABLE IF NOT EXISTS building (id unique, buidingCode,buidingName)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS classroom (id unique, roomName,roomCode,buildingId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS college (collegeName,collegeCode)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS course (id unique, courseName,courseCode,courseTeacher,courseInfo,majorId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS major (id unique, majorName,majorCode,collegeId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS classtime (id unique, classroomId,date,courseId1,courseId2,courseId3,' + 'courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)', [], createTableOrNot);
    
    
    console.log("populateDB execute!");
}

// 当执行SQL失败后调用此方法
function errorCB(error) {
    console.log("executeSql error");
}

// 当执行SQL成功后调用此方法
function successCB() {
    console.log("executeSql success");
}

// var counter = 1;
// 
// //'INSERT INTO iBistu (id, data) VALUES (2, "Second row")'
// function executeAddSql(db) {
    // //这里有一处调试了很久的BUG------> "+ "'"+ inputString + "'" +" <-----------必须形如这样的才能被添加进数据库
    // //即须加单引号.经网上查询得，如果不加引号或空格，将会把逗号与字符串等看成一个字符串。
    // db.executeSql("INSERT INTO iBistu (id, data) VALUES (" + counter + ",'" + inputString + "')");
    // counter++;
// }

//**************************************************************

function insertBuildingTable(tx) {
    
    var url = "";
    var building = getFromServer(url);

    if(building != null) {
        var buildingID = building["id"];
        var buildingCode = building["buildingCode"];
        var buildingName = building["buildingName"];

        tx.executeSql("insert into building (id,buildingCode,buildingName) values (" + "'" + buildingID + "','" + buildingCode + "','" + buildingName + "')");
    }
}

function insertClassroomTable(tx) {

    if(classroom != null) {
        var roomID = classroom["id"];
        var roomName = classroom['roomName'];
        var roomCode = classroom["roomCode"];
        var buidingID = classroom["buildingId"];

        tx.executeSql("insert into classroom (id,roomName,roomCode,buildingId) values('" + roomID + "','" + roomName + "','" + roomCode + "','" + buildingID + "')");
    }
}

function insertCollegeTable(tx) {
    var url = "http://m.bistu.edu.cn/api/api.php?table=college&action=getcollegelist";
    // var college = getFromServer(url);
//     
    // for(var i = 0, len = college.length; i < len; i++){
        // console.log("name: "+college[i].collegeName);
    // }
//     
    // console.log(typeof college);
    
    var type = "college";
    getFromServer(type,url);
    
    // if(college != null) {
        // var collegeName = college["collegeName"];
        // var collegeCode = college["collegeCode"];
// 
        // tx.executeSql("insert into college (collegeName,collegeCode) values ('" + collegeName + "','" + collegeCode + "')");
    // }
}

function insertCourseTable(tx) {
    var url = "";
    var course = getFromServer(url);

    if(course != null) {
        var courseID = course["id"];
        var courseName = course["courseName"];
        var courseCode = course["courseCode"];
        var courseTeacher = course["courseTeacher"];
        var courseInfo = course["courseInfo"];
        var majorID = course["majorId"];

        tx.executeSql("insert into course (id,courseName,courseCode,courseTeacher,courseInfo,majorId) " + "values (" + "'" + courseID + "','" + courseName + "','" + courseCode + "','" + courseTeacher + "','" + courseInfo + "','" + majorID + "')");
    }
}

function insertMajorTable(tx) {
    var url = "";
    var major = getFromServer(url);

    if(major != null) {
        var majorID = major["id"];
        var majorName = major["majorName"];
        var majorCode = major["majorCOde"];
        var collegeID = major["collegeId"];

        tx.executeSql("insert into major (id,majorName,majorCode,collegeId) values (" + "'" + majorID + "','" + majorName + "','" + majorCode + "','" + collegeID + "')");
    }
}

function insertClasstimeTable(tx) {
    var url = "";
    var classtime = getFromServer(url);

    if(classtime != null) {
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

        tx.executeSql("insert into classtime (id,classroomId,date," + "courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)" + "values (" + "'" + classtimeID + "','" + classroomID + "','" + classDate + "','" + courseID1 + "','" + courseID2 + "','" + courseID3 + "','" + courseID4 + "','" + courseID5 + "','" + courseID6 + "','" + courseID7 + "','" + courseID8 + "','" + courseID9 + "','" + courseID10 + "','" + courseID11 + "')");
    }
}

//--------------------------------------------------------------------------------
//下面代码为测试代码（Ajax调用）
// var getIntro = document.getElementById("getIntro");
//
// getIntro.addEventListener("click",getIntroInfo,false);
//
// var myXML = new XMLHttpRequest();
//
// function getIntroInfo(){
//
// function getInfo(){
//
// console.log("Get info");
// if(myXML.readyState == 4){
// var respons = myXML.responseText;
// var jsonText = JSON.parse(respons);
//
// log.innerHTML = "<p>" + jsonText[0].id + "-->" + jsonText[0].introName + "</p>";
//
// }
// }
//
// myXML.onreadystatechange = getInfo;
// myXML.open("GET","http://m.bistu.edu.cn/api/api.php?table=intro&action=list",true);
// myXML.send(null);
// console.log("Get success");
//
// }
//-------------------------------------------------------------------------------------------

