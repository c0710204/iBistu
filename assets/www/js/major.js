/**
 * 
 */

function getMajorList(tx){
    
    var majorQuery = Number(window.localStorage.getItem("majorQueryId"));
    console.log("MajorID = " + majorQuery);
    tx.executeSql("select * from major where collegeId = " + "'" + majorQuery + "'",[],function(tx,results){
        var row = results.rows;
        var len = row.length;
        console.log("length = " + len);
        var innerHTML = "";
        
        for(var i = 0; i < len; i++){
            innerHTML += '<li data-role="list-divider">' + row.item(i).majorName + '</li>';
            // db.executeSql("select * from courseList where majorId = " + "'" + row.item(i).majorId +"'",
             // [],function(d,result){
                // var r = result.rows;
                // console.log("courseList length-->" + r.length);
//                 
                // for(var j = 0; j < rows.length; j++){
                    // innerHTML += '<li><a href="coursedetail.html">' + r.item(j).courseName + '</a></li>';
                // }
//                 
            // },function(e){
                // console.log("execute courseList error!");
            // });
            iBistuDB.transaction(function(db){
                console.log("start to get from courseList-->");
                db.executeSql("select * from courseList where majorId = " + "'" + row.item(i).majorId +"'",
                [],
                function(db,result){
                    var r = result.rows;
                    console.log("courseList length-->" + r.length);
                    
                    
                },
                errorCB);
            },
            errorCB,
            successCB);
        }
        
        $("#majorList").html(innerHTML);
        $("#majorList").listview('refresh');
        
    },
    getError);
}


(function(){
    
    if(iBistuDB != undefined){
        iBistuDB.transaction(getMajorList,errorCB,successCB);
    }
    
    
})();























