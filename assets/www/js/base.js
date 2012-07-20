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

/**
 * Bug record!
 * course table seems has error!
 * I will fix it tomorrow!
 * 2012/06/09
 *
 *
 *  */

var iBistuDB, collegeItemLength;
var databaseExist = window.localStorage.getItem("databaseExist");
var updateAllTables = window.localStorage.getItem("updateAllTables");
var CANUPDATE = true, BASICAL_URL = "", networkState,NETWORK_READY = false;

var Bistu = {
    createNew:function(){
        
    },
    getNetworkState: function(){
        return NETWORK_READY;
    },
    latestUpdate:function(time){
        
    },
    loginStatus:function(){
        var loginOrNot = window.localStorage.getItem("loginStatus");
        
        if(loginOrNot == null || loginOrNot == undefined){
            return false;
        }
        else if(loginOrNot == "true"){
            return true;
        }
        
        return false;
    },
    loginToken:function(){
    		
    		var token = window.localStorage.getItem("loginToken");
    		if(token != null && token != "undefined"){
    			return token;
    		}
    		else{
    			return null;
    		}
    }
};


/*
 * create a ajax function to get the data frome server!
 * then parse and return the responseText to json!
 * */
function getFromServer(type, url) {
    //If url is null,then return;
    if(url == "" || url == null) {
        return null;
    }

    console.log("type=" + type + "-->url=" + url);

    var xhr = new XMLHttpRequest();
    var resp = null;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                try {
                    //xhr.responseText is a string!
                    //If you want to use JSON.parse,then there will be a problem!
                    resp = eval('(' + xhr.responseText + ')');
                    console.log("responseText's Type = " + type + " and length = " + resp.length);
                    // console.log(xhr.responseText);
                    switch(type) {
                        case "college":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('DROP TABLE IF EXISTS college');
                                    tx.executeSql('create table if not exists college (id INTEGER PRIMARY KEY,collegeName,collegeCode)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into college (collegeName,collegeCode)' + ' values ("' + resp[i].collegeName + '","' + resp[i].collegeCode + '")');
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        case "major":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists major');
                                    tx.executeSql('create table if not exists major (id INTEGER PRIMARY KEY, majorName,majorCode,collegeId)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql("insert into major (id,majorName,majorCode,collegeId) values ('" + resp[i].id + "','" + resp[i].majorName + "','" + resp[i].majorCode + "','" + Number(resp[i].collegeId) + "')");
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        case "building":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists building');
                                    tx.executeSql('create table if not exists building (id, buildingCode,buildingName)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into building (id,buildingCode,buildingName) values ("' + resp[i].id + '","' + resp[i].buildingCode + '","' + resp[i].buildingName + '")');
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        case "courseDetail":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql("drop table if exists coursedetail");
                                    tx.executeSql("create table if not exists coursedetail (id INTEGER PRIMARY KEY,courseListId,courseTeacher,coursePlace,courseTime)");
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into coursedetail (courseListId,courseTeacher,coursePlace,courseTime) values ("' + resp[i].courseListId + '","' + resp[i].courseTeacher + '","' + resp[i].coursePlace + '","' + resp[i].courseTime + '")');
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        case "courseList":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists courseList');
                                    tx.executeSql('create table if not exists courseList (id INTEGER PRIMARY KEY,courseCode,courseName,majorId)');
                                    console.log("Start to insert-->" + type);
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql("insert into courseList (id,courseCode,courseName,majorId) values ('" + resp[i].id + "','" + resp[i].courseCode + "','" + resp[i].courseName + "','" + resp[i].majorId + "')");
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        case "course":
                            (function() {
                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('create table if not exists course (id INTEGER PRIMARY KEY,courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb)');
                                    console.log("Start to insert-->" + type + "  length = " + resp.length);
                                    /*
                                     * Here has a big problem!
                                     * we can't insert table with 3 thousands
                                     * items.
                                     * This problem still don't solve!@2012/05/30
                                     * */
                                    var courseInfos = "";
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        courseInfos = resp[i].courseInfo.replace(/\n[\s| ]*\r/g, "");
                                        tx.executeSql("insert into course (courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb) values ('" + resp[i].courseName + "','" + resp[i].courseEngName + "','" + resp[i].courseCode + "','" + courseInfos + "','" + resp[i].courseXs + "','" + resp[i].courseXf + "','" + resp[i].courseXz + "','" + resp[i].courseLb + "')");
                                    }

                                }, function() {
                                    console.log("insert into course error!!!");
                                }, successCB);
                            })();
                            break;
                        case "classtime":
                            (function() {

                                iBistuDB.transaction(function(tx) {

                                    tx.executeSql('drop table if exists classtime');
                                    tx.executeSql('create table if not exists classtime (id INTEGER PRIMARY KEY, classroomId,date,courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11)');
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql("insert into classtime (classroomId,date,courseId1,courseId2,courseId3,courseId4,courseId5,courseId6,courseId7,courseId8,courseId9,courseId10,courseId11) values ('" + resp[i].classroomId + "','" + resp[i].date + "','" + resp[i].courseId1 + "','" + resp[i].courseId2 + "','" + resp[i].courseId3 + "','" + resp[i].courseId4 + "','" + resp[i].courseId5 + "','" + resp[i].courseId6 + "','" + resp[i].courseId7 + "','" + resp[i].courseId8 + "','" + resp[i].courseId9 + "','" + resp[i].courseId10 + "','" + resp[i].courseId11 + "')");
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        case "classroom":
                            (function() {

                                iBistuDB.transaction(function(tx) {
                                    tx.executeSql('drop table if exists classroom');
                                    tx.executeSql('create table if not exists classroom (id, roomName,roomCode,buildingId)')
                                    for(var i = 0, len = resp.length; i < len; i++) {
                                        tx.executeSql('insert into classroom (id,roomName,roomCode,buildingId) values ("' + resp[i].id + '","' + resp[i].roomName + '","' + resp[i].roomCode + '","' + resp[i].buildingId + '")');
                                    }
                                }, errorCB, successCB);
                            })();
                            break;
                        default:
                            (function() {
                                console.log("Update error!");
                            })();
                    }

                }
                catch(e) {
                    console.log("insert into Table error-->" + type + "-- Type-->" + e.name);
                }
            }
            else {
                console.log("Get data from server error code = " + xhr.status);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}

document.addEventListener("deviceready", onDeviceReadyNow, false);

function checkConnection() {
    networkState = navigator.network.connection.type;
    console.log("networkstate is " + networkState);
    console.log("network's on " + navigator.platform);
    
    if(networkState != "none"){
    		NETWORK_READY = true;
    		updateCollegeTable();
    		updateBuildingTable();
    }
    else{
    		NETWORK_READY = false;
    }
    
}

function onDeviceReadyNow() {
    checkConnection();
}

/*
 * create database or open the database;
 * */
(function() {
    /*
     * 创建数据库，其中由Android源代码可知：
     * 仅有第一个参数有效果，其它参数现在无效。
     * */
    iBistuDB = window.openDatabase("iBistu", "0.1", "BistuDB", 100000);

    if(databaseExist == false) {
        iBistuDB.transaction(populateDB, errorCB, successCB);
    }

    if(iBistuDB != undefined) {
        databaseExist = true;
        window.localStorage.setItem("databaseExist", "true");
    }
    else {
        window.localStorage.setItem("databaseExit", "false");
    }

})();

var insertFlag = -1;

function createTableOrNot(tx, results) {
    if(results.rowsAffected == 0) {
        insertFlag = 0;
    }
    else {
        insertFlag = 1;
    }
    console.log("createTable flag--->" + insertFlag);
}

// 数据库操作(事务处理)
// 初始化各个表(如果表格不存在的话)
function populateDB(db) {

    db.executeSql('CREATE TABLE IF NOT EXISTS building (id INTEGER PRIMARY KEY, buildingCode,buildingName)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS classroom (id INTEGER PRIMARY KEY, roomName,roomCode,buildingId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS college (id INTEGER PRIMARY KEY,collegeName,collegeCode)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY, courseName,courseEngName,courseCode,courseInfo,courseXs,courseXf,courseXz,courseLb)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS coursedetail (id INTEGER PRIMARY KEY,courseListId,courseTeacher,coursePlace,courseTime)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS courseList (id INTEGER PRIMARY KEY,courseCode,courseName,majorId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS major (id INTEGER PRIMARY KEY, majorName,majorCode,collegeId)', [], createTableOrNot);
    db.executeSql('CREATE TABLE IF NOT EXISTS favorCourses (id INTEGER PRIMARY KEY, firstPart,secondPart)', [], createTableOrNot);
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
// //这里有一处调试了很久的BUG------> "+ "'"+ inputString + "'" +"
// <-----------必须形如这样的才能被添加进数据库
// //即须加单引号.经网上查询得，如果不加引号或空格，将会把逗号与字符串等看成一个字符串。
// db.executeSql("INSERT INTO iBistu (id, data) VALUES (" + counter + ",'" +
// inputString + "')");
// counter++;
// }

//**************************************************************

function updateBuildingTable() {

    var url = "http://m.bistu.edu.cn/api/api.php?table=building";
    var type = "building";
    getFromServer(type, url);

}

function updateCourseDetailTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=coursedetail";
    var type = "courseDetail";
    getFromServer(type, url);
}

function updateCourseListTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=courselist";
    var type = "courseList";
    getFromServer(type, url);

}

function updateClassroomTable() {

    var url = "http://m.bistu.edu.cn/api/api.php?table=classroom";
    var type = "classroom";
    getFromServer(type, url);

}

function updateCollegeTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=college";
    var type = "college";
    getFromServer(type, url);

}

function updateCourseTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=course";
    var type = "course";
    getFromServer(type, url);

}

function updateMajorTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=major";
    var type = "major";
    getFromServer(type, url);
}

function updateClasstimeTable() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=classtime";
    var type = "classtime";

    getFromServer(type, url);

}

