
(function() {

    var courseListQueryId = window.localStorage.getItem("courseListQueryId");
    var majorName = window.localStorage.getItem("majorQueryCourse");
    var innerHTML = "",updateCourseFlag = 1;
    console.log("QueryID-->"+courseListQueryId);
    if(iBistuDB != undefined) {
        iBistuDB.transaction(function(tx) {
            tx.executeSql("select * from courseList where majorId = " + "'" + courseListQueryId + "'", [], function(tx, results) {
                var r = results.rows;
                console.log("courseList length-->" + r.length);

                for(var i = 0; i < r.length; i++) {
                    innerHTML += '<li><a href="coursedetail.html" id="' + r.item(i).id + '" value="'+r.item(i).courseCode+'">' + r.item(i).courseName + '</a></li>';
                }
                
                $("#courseListCollege").text(majorName);
                $("#courseList").html(innerHTML);
                $("#courseList").listview('refresh');
                
                //based on network state
                if(updateCourseFlag == 1){
                    updateCourseTable();
                    updateCourseDetailTable();
                    
                    
                }
                
                /*
                 * 将下面代码放在其他地方都无法执行！Bug...
                 * */
                $("li a").each(function(index) {
                    $(this).click(function() {
                        var queryID = $(this).attr("id");
                        var name = $(this).text();
                        var courseCode = $(this).attr("value");
                        
                        iBistuDB.transaction(function(tx){
                            console.log("courseCode-->" + courseCode);
                            //从course表里取得相应课程的信息，转为本地存储然后给下一个页面使用。
                            tx.executeSql("select * from course where courseCode='" + courseCode + "'",[], function(tx, result) {
                                var re = result.rows, len = re.length;
                                console.log("courseCode execute length-->" + len);
                                
                                if(0 == len){
                                    window.localStorage.setItem("courseDetailInfo", "");
                                }
                                else{
                                    for(var i = 0; i < len; i++) {
                                        console.log("start to get course info -->" + re.item(0).courseInfo);
                                        // window.localStorage.setItem("courseDetailName", re.item(i).CourseName);
                                        window.localStorage.setItem("courseDetailInfo", re.item(0).courseInfo);
                                        window.localStorage.setItem("courseDetailPeriod", re.item(0).courseXs);
                                        window.localStorage.setItem("courseDetailScore", re.item(0).courseXf);
                                        window.localStorage.setItem("courseDetailType", re.item(0).courseXz +"   "+ re.item(0).courseLb);
                                    }
                                }
                            }, function() {
                                console.log("select from course error!")
                            }); 
                        },errorCB,
                        successCB);
                        //设置下一个页面的查询ID以及课程的名称。
                        window.localStorage.setItem("courseDetailQueryId", queryID);
                        window.localStorage.setItem("courseDetailName", name);
                    });
                });
            }, function(){
                console.log("select from courselistError");
            });
        }, errorCB, successCB);
    }

})();

