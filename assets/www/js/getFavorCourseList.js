

(function(){
    
    /***
     *  get data from favorCourses table
     *  put infos into list in the page and refresh page
     */
    
    iBistuDB.transaction(function(tx){
        tx.executeSql('select id,firstPart from favorCourses',[],queryFavorCourseSuccess,queryFailed);
    },errorCB,
    successCB);
    
    function queryFavorCourseSuccess(tx,results){
        var r = results.rows,
            l = r.length,
            innerhtm = "";
        
        console.log("personal course list --> " + l);
        
        for(var i = 0; i < l; i++){
            innerhtm += "<li><a href='favorCourse.html' title="+r.item(i).id+">" + r.item(i).firstPart + "</a></li>";
        }
        
        $("#personalCourseList").html(innerhtm);
        $("#personalCourseList").listview("refresh");
        
        $("#personalCourseList a").each(function(index){
            $(this).click(function(){
                var listId = $(this).attr("title");
                console.log("favorDetail id is " + listId);
                window.localStorage.setItem("favorDetailId",listId);
            });
            
        });
        
    }
    
    function queryFailed(){
        console.log("query personal course list error");
    }
    
})();



