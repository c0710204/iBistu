
(function(){
	
	var CATEGORY_URL = "http://m.bistu.edu.cn/api/api.php?table=newschannel";
	var categoryList = document.getElementById("categoryNews");
	
	function getCategoryFromServer(url){
		
		var xhr = new XMLHttpRequest();
		var response = null;
		var cateList = "";
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
					resp = eval('(' + xhr.responseText + ')');
					var length = resp.length;
					console.log(resp.length);
					
					for(var i = 0; i < length; i++){
					    var t = resp[i].attributes.url.replace(/http:\/\/newsfeed.bistu.edu.cn\//,"");
					    console.log("replace url " + t);
					    cateList += '<li data-role="list-divider"><a href="news.html" >' + resp[i].attributes.n + '</a></li>';
					}
					
					$("#categoryNews").html(cateList);
					$("#categoryNews").listview('refresh');
				}
			}
			
		}
		
		xhr.open("GET",url,true);
		xhr.send(null);
		console.log("after send");
		
	}
	
	getCategoryFromServer(CATEGORY_URL);
	
})();




























