/*
 * This is the main JS.
 * 
 * */

$(document).bind("mobileinit", function(){
    $.mobile.defaultPageTransition = 'fade';
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
    
});

$("#displayIntroduce").load(
    "http://m.bistu.edu.cn/api/api.php?table=intro&action=list",
    function(response,status){
        $("#displayIntroduce").html = response;
    }
);

$().ready(function(){
    //当点击课程按钮时候，课程页面显示。
    $("#index2course").click(function() {
        
        
        
        
        $("#home").hide();
        $("#course").show();
        
        
    });
    
    
    
});















