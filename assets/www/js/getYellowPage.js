
(function(){
    
    var url = "http://m.bistu.edu.cn/api/api.php?table=yellowpage&list=true";
   
    $.get(url,null,function(data){
        
        console.log("This is data-->" + data);
        console.log("data0 id-->" + data[0].id + " name-->" + data[0].name);
        
    });
    
    
    
})();
















