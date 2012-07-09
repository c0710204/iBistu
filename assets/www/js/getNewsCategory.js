(function() {

	var CATEGORY_URL = "http://m.bistu.edu.cn/api/api.php?table=newschannel";
	var networkFlag;
	
	
	/**
	 * Get data from server.
	 * 
	 * */
	function getCategoryFromServer(url) {

		var xhr = new XMLHttpRequest();
		var response = null;
		var cateList = "";

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					resp = eval('(' + xhr.responseText + ')');
					var length = resp.length;
					console.log(resp.length);

					iBistuDB.transaction(function(tx) {
						tx.executeSql('DROP TABLE IF EXISTS newscategory');
						tx.executeSql("create table if not exists newscategory (id, name, type, lastUpdateTime, icon, url)");
						
						for(var i = 0; i < length; i++){
							var ra = resp[i].attributes;
							tx.executeSql("insert into newscategoty (id, name, type, lastUpdateTime, icon, url) values ('" + ra.id + "','" + ra.n + "','" + ra.t + "','" + ra.lmt + "','" + ra.ic + "','" + ra.url.replace(/http:\/\/newsfeed.bistu.edu.cn/, "") + ")");
						}

					}, errorCB, successCB);

					for (var i = 0; i < length; i++) {
						var t = resp[i].attributes.url.replace(/http:\/\/newsfeed.bistu.edu.cn/, "");
						console.log("after replace url " + t);
						cateList += '<li data-role="list-divider"><a href="news.html" title="' + t + '">' + resp[i].attributes.n + '</a></li>';
					}

					$("#categoryNews").html(cateList);
					$("#categoryNews").listview('refresh');
				}
			}

		}

		xhr.open("GET", url, true);
		xhr.send(null);

	}

	//seems not useful now.
	$("#categoryNews a").each(function(index) {

		var addon = $(this).attr("title");
		window.localStorage.setItem("categoryToNews", addon);

		$(this).click(function() {

		});

	});

	/**
	 * base on network status and decide to write database or not
	 * networkFlag: 	1 network is good.
	 * 			    0 network is bad.
	 *
	 * */
	function readDatabaseOrNot(networkFlag) {

		if (networkFlag) {
			//If network is well, then get data from server.
			getCategoryFromServer(CATEGORY_URL);
		} else {
			/**
			 * If network is bad,
			 * if database has built, then get data from database,
			 * else return an error page.
			 * 
			 * */
			iBistuDB.transaction(function(tx){
				
				tx.executeSql("select * from newscategory",[],function(tx, results){
					//execute success
					var row = results.rows;
					var len = row.length;
					console.log("newscategory length is " + len);
					
					for(var i = 0; i < len; i++){
						categList += '<li data-role="list-divider"><a href="news.html" title="' + row(i).url + '">' + row(i).name + '</a></li>';
					}
					
					$("#categoryNews").html(categList);
					$("#categoryNews").listview('refresh');
					
				},function(){
					/**
					 * execute error!
					 * network is bad and database hasn't created;
					 * redirect to networkErrorPage
					 * */
					window.location.href = "../networkError.html";
				});
				
			},errorCB,
			successCB)
		}

	}
	
	if(networkState == Connection.NONE){
		networkFlag = 0;
		console.log("networkFlag is 0");
	}else{
		networkFlag = 1;
		console.log("networkFlag is 1");
	}
	
	readDatabaseOrNot(networkFlag);

})();

