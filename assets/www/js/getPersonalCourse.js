

(function(){
	
	var token = window.localStorage.getItem("loginToken"),
		url = "http://m.bistu.edu.cn/api/api.php?table=courseStudent&action=getcourseStudent_school_Bytoken&accessToken=" + (token.replace(/\"/,'')).replace(/\"/,''),
		list = "";
	
	console.log("url is " + url);
	
	
	$.get(url,null,function(data){
		
		window.localStorage.setItem("personalCourseData",data);
		var resp = eval('(' + data + ')'),
			len = resp.length;
			
		console.log("length is " + len);
		
		for(var i = 0; i < len; i++){
			
			list += "<li><a href='pCourseDetail.html' title=" + i + ">" + resp[i].courseName + "</a></li>";
			
		}
		
		$("#personalCourseContent").html(list);
		$("#personalCourseContent").listview("refresh");
		
		$("#personalCourseContent a").each(function(index){
			$(this).click(function(){
				var ind = $(this).attr("title");
				window.localStorage.setItem("courseIndex",ind);
				
			});
		});
		
		
	});
	
	
	
	
	
	
})();



























