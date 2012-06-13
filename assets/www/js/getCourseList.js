
(function() {

    var courseListQueryId = window.localStorage.getItem("courseListQueryId");
    var majorName = window.localStorage.getItem("majorQueryCourse");
    var innerHTML = "";
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
                
                /*
                 * 将下面代码放在其他地方都无法执行！Bug...
                 * */
                $("li a").each(function(index) {
                    $(this).click(function() {
                        var queryID = $(this).attr("id");
                        var name = $(this).text();
                        var courseCode = $(this).attr("value");
                        
                        iBistuDB.transaction(function(tx){
                            
                            //从course表里取得相应课程的信息，转为本地存储然后给下一个页面使用。
                            tx.executeSql("select * from course where courseCode=" + "'" + courseCode + "'",[], function(tx, result) {
                                var re = result.rows;
                                var l = re.length;
                                console.log("courseCode length-->" + l);
                                
                                if(0 == l){
                                    window.localStorage.setItem("courseDetailInfo", "");
                                }
                                else{
                                    for(var i = 0; i < l; i++) {
                                        var info = re.item(i).courseInfo;
                                        console.log("info-->" + info);
                                        window.localStorage.setItem("courseDetailInfo", info);
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
                
            }, getError);
        }, errorCB, successCB);
    }

})();

