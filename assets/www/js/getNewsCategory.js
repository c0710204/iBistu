
(function(){
	
	var CATEGORY_URL = "http://m.bistu.edu.cn/api/api.php?table=newschannel";
	
	function getCategoryFromServer(url){
		
		var xhr = new XMLHttpRequest();
		var response = null;
		var entry = new DirectoryEntry();
		
		entry.getMetadata(function(metadata){
			console.log("Meta info-->" + metadata.modificationTime)
		}, function(){
			console.log("Get the meta failed!");
		});
		
		xhr.onreadystatechange = function(){
			console.log("Start to get data!");
			if(xhr.readyState == 4){
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
					resp = eval('(' + xhr.responseText + ')');
					console.log("resp-->" + resp);
					
				}
			}
			
			
			
		}
		
		xhr.open("GET",url,true);
		xhr.send(null);
		console.log("after send");
		
	}
	
	getCategoryFromServer(CATEGORY_URL);
	
})();




























