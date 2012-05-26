/*
 * This is the main JS.
 *
 * */

$(document).bind("mobileinit", function() {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;

});

$("#displayIntroduce").load("http://m.bistu.edu.cn/api/api.php?table=intro&action=list", function(response, status) {
    $("#displayIntroduce").html = response;
});

$(document).ready(function() {

    $(".mainpage a").each(function(index) {
        
        //点击每一个图标时候，把相应的ID存入localStorage中。
        $(this).click(function() {
            var id = $(this).attr("id").slice(6);
            window.localStorage.setItem("collegeQueryId",id);
        });

    });


});

