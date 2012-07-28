
(function(){
	
	var width = screen.width,
		moduleId = 6,
		drives = "android" + width,
		url = "http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=6&drives=" + drives;
	// http://m.bistu.edu.cn/api/api.php?table=moduletype&moduleid=6&drives=android480
	
	console.log(url);
	
	$.get(
		url,null,function(results){
			console.log("success");
			
			var pic,typename,id,len = results.length,list = "";
			//	
			for(var i = 0; i < len; i++){
				
				pic = results[i].coverpath;
				
				list += "<li title='"+results[i].id+"'><a href='album.html'>"+
				"<img src='"+pic+"'/><h2>" + results[i].typename + "</h2><a/></li>";
				
			}
			
			$("#albumListContent").html(list);
			$("#albumListContent").listview('refresh');
		},
		"JSON"
	);
	
	
})();


