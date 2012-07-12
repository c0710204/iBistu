(function() {

	var url = "http://m.bistu.edu.cn/api/api.php?table=yellowpage&list=true";

	$.get(url, null, function(data) {

		var list = "", resp = eval('(' + data + ')'), len = resp.length;
		console.log("length " + len);

		for (var i = 0; i < len; i++) {
			var depart = resp[i].depart;
			list += "<li><a href='yellowpageDetail.html' title='" + depart + "'>" + resp[i].name + "</a></li>";
		}

		$("#yellowPageList").html(list);
		$("#yellowPageList").listview('refresh');

		$("#yellowPageList a").each(function(index) {
			$(this).click(function() {
				var addon = $(this).attr("title");
				console.log("addon is " + addon);
				window.localStorage.setItem("yellowpageToDetail", addon);
			});
		});

	});

})();

