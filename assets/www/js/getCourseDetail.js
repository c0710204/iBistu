(function() {

	var courseName = window.localStorage.getItem("courseDetailName");
	var queryId = window.localStorage.getItem("courseDetailQueryId");
	var courseInfo = window.localStorage.getItem("courseDetailInfo");
	
	function split(original, regex) {
		var startIndex = 0;
		var tempArray = new Array();
		var index = 0;
		startIndex = original.indexOf(regex);
		while (startIndex < original.length && startIndex != -1) {
			temp = original.substring(index, startIndex);
			tempArray.push(temp);
			index = startIndex + regex.length;
			startIndex = original.indexOf(regex, startIndex + regex.length);
		}
		tempArray.push(original.substring(index + 1 - regex.length));
		return tempArray;
	}
	
	//var info = split(courseInfo,'&');
	console.log("courseName is "+courseInfo);
	console.log("Detail query id is " + queryId);

	iBistuDB.transaction(function(tx) {

		tx.executeSql("select * from coursedetail where courseListId=" + "'" + queryId + "'", [], function(tx, results) {
			var r = results.rows;
			var len = r.length;
			var teacher = "";
			var classroom = "";
			var courseTime = "";
			for (var i = 0; i < len; i++) {
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

})();

