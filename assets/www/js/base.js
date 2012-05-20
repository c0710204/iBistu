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
var updateAllTables = window.localStorage.getItem("updateAllTables");

console.log("database status--->" + databaseExist);

/*
 * create a ajax function to get the data frome server!
 * then parse and return the responseText to json!
 * */
function getFromServer(type,url){
    //If url is null,then return;
    if(url == "" || url == null){
        return;
    }
    
    var xhr = new XMLHttpRequest();
    var resp = null;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if((xhr.status >= 200 && xhr.status < 300)|| xhr.status == 304){
                try{
                    resp = JSON.parse(xhr.responseText);

                    switch(type){
                        case "college": (function(){
                            iBistuDB.transaction(function(tx){
                                tx.executeSql('DROP TABLE IF EXISTS college');
                                tx.executeSql('create table if not exists college (id INTEGER PRIMARY KEY,collegeName,collegeCode)')
                                for(var i = 0, len = resp.length; i < len; i++){
                                    tx.executeSql('insert into college (collegeName,collegeCode)' +
                                ' values ("'+ resp[i].collegeName + '","' + resp[i].collegeCode +'")');
                                }
                            },
                            errorCB,
                            successCB);
                        })();break;
                        case "major": (function(){
                            iBistuDB.transaction(function(tx){
                                tx.executeSql('drop table if exists major');
                                tx.executeSql('create table if not exists major (id INTEGER PRIMARY KEY, majorName,majorCode,collegeId)');
                                for(var i = 0, len = resp.length; i < len; i++){
                                    tx.executeSql("insert into major (majorName,majorCode,collegeId) values ('" + resp[i].majorName + "','" + resp[i].majorCode + "','" + resp[i].collegeID + "')");
                                }
                            },
                            errorCB,
                            successCB);
                        })();break;
                        case "building": (function(){
                            iBistuDB.transaction(function(tx){
                                tx.executeSql('drop table if exists building');
                                
                            },
                            errorCB,
                            successCB);
                        })();break;
                        case "courseDetail": (function(){
                            
                        })(); break;
                        case "courseList": (function(){
                            
                        })();break;
                        case "course": (function(){
                            
                        })();break;
                        case "classTime": (function(){
                            
                        })();break;
                        case "classroom": (function(){
                            
                        })();break;
                        default: (function(){
                           console.log("Update error!"); 
                        })();
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
 * create database or open the database;
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
    
    if(iBistuDB != undefined){
        databaseExist = true;
        window.localStorage.setItem("databaseExist","true");
    }
    else {
        window.localStorage.setItem("databaseExit","false");
    }
    
    //Update all tables if necessary!
    if(updateAllTables != "updated"){
        
        updateBuildingTable();
        updateClassroomTable();
        updateClasstimeTable();
        updateCollegeTable();
        updateCourseDetailTable();
        updateCourseListTable();
        updateCourseTable();
        updateMajorTable();
        
        window.localStorage.setItem("updateAllTables","updated");
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

    db.executeSql('CREATE TABLE IF NOT EXISTS building (id INTEGER PRIMARY KEY, buidingId,buidingName)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS classroom (id INTEGER PRIMARY KEY, roomName,roomCode,buildingId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS college (id INTEGER PRIMARY KEY,collegeName,collegeCode)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY, courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS coursedetail (id INTEGER PRIMARY KEY,courseListId,courseTeacher,coursePlace,courseTime)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS courselist (id INTEGER PRIMARY KEY,courseCode,courseName,majorId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS major (id INTEGER PRIMARY KEY, majorName,majorCode,collegeId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS classtime (id INTEGER PRIMARY KEY, classroomId,date,courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)', [], createTableOrNot);
    
    console.log("create tables because it's not exist!");
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

function updateBuildingTable() {
    
    var url = "";
    var type = "building";
    getFromServer(type,url);

// tx.executeSql("insert into building (id,buildingCode,buildingName) values (" + "'" + buildingID + "','" + buildingCode + "','" + buildingName + "')");
}

function updateCourseDetailTable(){
    var url = "http://m.bistu.edu.cn/api/api.php?table=coursedetail&action=getcoursedetail";
    var type = "courseDetail";
    getFromServer(type,url);
}

function updateCourseListTable(){
    var url = "http://m.bistu.edu.cn/api/api.php?table=courselist&action=getcourselist";
    var type = "courseList";
    getFromServer(type,url);
}

function updateClassroomTable() {
    
    var url = "";
    var type = "classroom";
    getFromServer(type,url);
    
// tx.executeSql("insert into classroom (id,roomName,roomCode,buildingId) values('" + roomID + "','" + roomName + "','" + roomCode + "','" + buildingID + "')");
}

function updateCollegeTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=college&action=getcollegelist";
    var type = "college";
    getFromServer(type,url);
}

function updateCourseTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=course&action=getcourse";
    var type = "course";
    course = getFromServer(type,url);

// tx.executeSql("insert into course (id,courseName,courseCode,courseTeacher,courseInfo,majorId) " + "values (" + "'" + courseID + "','" + courseName + "','" + courseCode + "','" + courseTeacher + "','" + courseInfo + "','" + majorID + "')");
}

function updateMajorTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=major&action=getmajorlist";
    var type = "major";
    getFromServer(type,url);
}

function updateClasstimeTable() {
    var url = "";
    var type = "classtime";
    getFromServer(type,url);

// tx.executeSql("insert into classtime (id,classroomId,date," + "courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)" + "values (" + "'" + classtimeID + "','" + classroomID + "','" + classDate + "','" + courseID1 + "','" + courseID2 + "','" + courseID3 + "','" + courseID4 + "','" + courseID5 + "','" + courseID6 + "','" + courseID7 + "','" + courseID8 + "','" + courseID9 + "','" + courseID10 + "','" + courseID11 + "')");
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

