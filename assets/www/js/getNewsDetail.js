(function() {

    var NEWS_BASIC_URL = "http://m.bistu.edu.cn/api/api.php?table=news&url=", 
        CATEGORY_URL = window.localStorage.getItem("categoryToNewsList"), 
        ULTURL = NEWS_BASIC_URL + CATEGORY_URL;

    function getNewsDetailFromServer() {
        var xhr = new XMLHttpRequest(), list = "";
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    var response = eval('(' + xhr.responseText + ')'),
                        len = response.d.length;
                    console.log("length is " + len);

                    for(var i = 0; i < len; i++) {
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
        xhr.open("GET", ULTURL, true);
        xhr.send(null);
    }
    
    getNewsDetailFromServer();

})();

