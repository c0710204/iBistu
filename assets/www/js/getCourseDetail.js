(function() {
    
    var courseName = window.localStorage.getItem("courseDetailName");
    var queryId = window.localStorage.getItem("courseDetailQueryId");
    var courseInfo = window.localStorage.getItem("courseDetailInfo");
    
    iBistuDB.transaction(function(tx) {

        tx.executeSql("select * from coursedetail where id="+"'"+queryId+"'", [], function(tx, results) {
            var r = results.rows;
            var len = r.length;
            var teacher = "";
            var classroom = "";
            var courseTime = "";
            for(var i = 0; i < len; i++) {
                console.log("courseTeacher-->" + r.item(i).courseTeacher);
                teacher = r.item(i).courseTeacher;
                classroom = r.item(i).coursePlace;
                courseTime = r.item(i).courseTime;
            }
            
            console.log("ready to change the courseName");
            $("#detail_courseName").text(courseName);
            $("#detail_courseInfo").text(courseInfo);
            $("#courseDetailTeacher").text(teacher);
            $("#courseDetailClassroom").text(classroom);
            $("#courseDetailTime").text(courseTime);
            
        }, function() {
            console.log("get from coursedetail error!")
        });

    }, errorCB, successCB);
    
    $(document).bind("mobileinit", function() {
        
    });

})();

