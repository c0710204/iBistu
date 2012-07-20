(function() {

	var courseName = window.localStorage.getItem("courseDetailName"),
	    queryId = window.localStorage.getItem("courseDetailQueryId"),
	    courseInfo = window.localStorage.getItem("courseDetailInfo"),
	    coursePeriod = window.localStorage.getItem("courseDetailPeriod"),
	    courseScore = window.localStorage.getItem("courseDetailScore"),
	    courseType = window.localStorage.getItem("courseDetailType");
	    
	window.localStorage.removeItem("courseDetailName");
	window.localStorage.removeItem("courseDetailQueryId");
	window.localStorage.removeItem("courseDetailInfo");
	window.localStorage.removeItem("courseDetailPeriod");
	window.localStorage.removeItem("courseDetailScore");
	window.localStorage.removeItem("courseDetailType");
	
	//set texts
    $("#detail_courseName").text(courseName);
    $("#detail_courseInfo").text(courseInfo);
    $("#courseDetailPeriod").text(coursePeriod);
    $("#courseDetailClassScore").text(courseScore);
    $("#courseDetailClassType").text(courseType);
	
	console.log("courseName is "+courseInfo);
	console.log("Detail query id is " + queryId);
    
    if(iBistuDB == undefined || iBistuDB == null){
        iBistuDB = window.openDatabase("iBistu", "0.1", "BistuDB", 100000);
    }
    else if(iBistuDB != undefined){
        iBistuDB.transaction(function(tx) {
        console.log("start to coursedetail");
		tx.executeSql("select * from coursedetail where courseListId=" + "'" + queryId + "'", [], function(tx, results) {
			var r = results.rows,
			     len = r.length,
			     teacher = "",
			     classroom = "",
			     courseTime = "",
			     innerhtm = "",
			     beginList = '<ul data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
			for (var i = 0; i < len; i++) {
				innerhtm += beginList + "<li><a href='#'>" + r.item(i).courseTeacher + "</a></li>" +
				             "<li><a href='#'>" + r.item(i).courseTime + "</a></li>" +
				             "<li><a href='#'>" + r.item(i).coursePlace + "</a></li>" + "</ul>";
			}
			
			$("#courseDetailListView").html(innerhtm);
			$("#courseDetailListView").trigger("create");
			// $(".ui-listview").listview("refresh");

			// $("#courseDetailTeacher").text(teacher);
			// $("#courseDetailClassroom").text(classroom);
			// $("#courseDetailTime").text(courseTime);
            // $("#courseDetailListView").listview("refresh");
            
    		}, function() {
    			console.log("get from coursedetail error!")
    		});
		}, errorCB, successCB);
    }
    	
	$("#addMyFavor").click(function() {
	    alert("添加成功");
    });

})();

