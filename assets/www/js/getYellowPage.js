(function() {

	var url = "http://m.bistu.edu.cn/api/api.php?table=yellowpage&list=true", listUrl = "http://m.bistu.edu.cn/api/api.php?table=yellowpage";

	$.get(url, null, function(data) {

		var list = "", resp = eval('(' + data + ')'), len = resp.length;
		console.log("length is " + len);

		for (var i = 0; i < len; i++) {
			var depart = resp[i].depart;
			list += "<li><a href='yellowpageDetail.html' title='" + depart + "'>" + resp[i].name + "</a></li>";
		}

		$("#yellowPageList").html(list);
		$("#yellowPageList").listview('refresh');

		insertTableYP();

		$("#yellowPageList a").each(function(index) {
			$(this).click(function() {
				var addon = $(this).attr("title");
				console.log("addon is " + addon);
				window.localStorage.setItem("yellowpageToDetail", addon);
			});
		});

	});

	function insertTableYP() {
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

})();

