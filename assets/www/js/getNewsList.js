/**
 * Get news list
 *
 *  */
(function() {

	var url = window.localStorage.getItem("categoryToNewsList"), listUrl = "http://m.bistu.edu.cn/api/api.php?table=yellowpage", newsList;
	url = "http://m.bistu.edu.cn/api/api.php?table=newslist&url=" + url;

	function replaceURL(oriUrl) {
		var matchUrl = oriUrl.replace('http://newsfeed.bistu.edu.cn', '');
		matchUrl = matchUrl.replace('.xml', '');
		return matchUrl;
	}
	
	document.addEventListener("deviceready", insertTableYP, false);
	console.log("before insert YP");
	function insertTableYP() {
		console.log("insertYP execute");
		$.get(listUrl, null, function(data) {

			var resp = eval('(' + data + ')'), len = resp.length;
			console.log("length-->" + len);
			
			if (iBistuDB != undefined) {
				iBistuDB.transaction(function(tx) {
					console.log("start to insert yellowpagelist");
					tx.executeSql('DROP TABLE IF EXISTS yellowpagelist');
					tx.executeSql('create table if not exists yellowpagelist (id INTEGER PRIMARY KEY,name,telnum,depart)');

					for (var i = 0; i < len; i++) {
						tx.executeSql('insert into yellowpagelist (id,name,telnum,depart) values ("' + resp[i].id + '","' + resp[i].name + '","' + resp[i].telnum + '","' + resp[i].depart + '")');
					}

				}, function() {
					console.log("insert into yellowpagelist error!");
				}, function() {
					console.log("insert into yellowpagelist success");
				});
			}

		});
	}

	/**
	 * Get from news list
	 *  */
	function getNewsListFromServer() {
		console.log("enter in news list from server");
		var xhr = new XMLHttpRequest(), list = "";
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var response = eval('(' + xhr.responseText + ')'), len = response.d.length;
					console.log("length is-->" + len);
					console.log("hello");
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

