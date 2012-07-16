


(function(){
	
	var data = window.localStorage.getItem("personalCourseData");
	console.log("data is " + data);
	var	index = window.localStorage.getItem("courseIndex");
	console.log(index);
	var	resp = eval('('+data+')'),
		len = resp.length;
	
	console.log("index is " + index);	
	
	$("#detail_pcourseName").text(resp[index].courseName);
	$("#pcourseDetailTeacher").text(resp[index].courseTeacher)		
	$("#pcourseDetailClassroom").text(resp[index].coursePlace);
	$("#pcourseDetailTime").text(resp[index].courseTime)
	$("#personalCourseDetail").listview("refresh");
	
})();


























