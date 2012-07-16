/**
 * Get news list
 *
 *  */
(function() {

	var url = window.localStorage.getItem("categoryToNewsList"), newsList;
	url = "http://m.bistu.edu.cn/api/api.php?table=newslist&url=" + url;

	function replaceURL(oriUrl) {
		var matchUrl = oriUrl.replace('http://newsfeed.bistu.edu.cn', '');
		matchUrl = matchUrl.replace('.xml', '');
		return matchUrl;
	}

	/**
	 * Get from news list
	 *  */
	function getNewsListFromServer() {
		var xhr = new XMLHttpRequest(), list = "";
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var response = eval('(' + xhr.responseText + ')'), len = response.d.length;
					console.log("length is " + len);
					for (var i = 0; i < len; i++) {
						var ra = response.d[i].attributes, addon = replaceURL(ra.url);
						list += "<li><a href='newsdetail.html' title='" + addon + "'>" + ra.n + "</a><p>" + ra.rt + "</p></li>";
					}
					
					$("#newsListContent").html(list);
					$("#newsListContent").listview('refresh');
					
					$("#newsListContent a").each(function(index) {
						$(this).click(function() {
							var addon = $(this).attr("title");
							console.log("addon is " + addon);
							window.localStorage.setItem("newsListToDetail", addon);
						});
					});
				}
				
			}
		}
		xhr.open("GET", url, true);
		xhr.send(null);
	}

	getNewsListFromServer();

})();

