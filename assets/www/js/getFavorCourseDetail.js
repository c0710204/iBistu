
(function(){
    
    var favorCourseId = window.localStorage.getItem("favorDetailId");
    window.localStorage.removeItem("favorDetailId");
    
    // if(iBistuDB != undefined){
        // iBistuDB.transaction(function(tx){
            // tx.executeSql("select * from favorCourses where id = '" + favorCourseId + "'",[],querySuccess,queryFailed);
        // },errorCB,
        // successCB);
    // }
//     
    // function querySuccess(tx,results){
//         
        // var r = results.rows,
            // l = r.length;
//             
        // console.log("length is " + l);
//         
        // for(var i = 0; i < l; i++){
            // $("#favorCourseDetailContent").html(r.item(0).secondPart);
        // }    
        // $("#favorCourseDetailContent").trigger("create");
    // }
//     
    // function queryFailed(){
        // console.log("get favor course error");
    // }
    
    var favDir = new DirectoryEntry("favor",Bistu.rootDir+"/iBistu/favor");
    favDir.getFile(favorCourseId,{create: true, exclusive: false},getFavorInfo,function(){
        console.log("can't get the file:" + favorCourseId);
    });
    
    function getFavorInfo(fileEntry){
        fileEntry.file(gotFile,fail);
    }
    
    function gotFile(file){
        console.log("I am in gotFile,first line");
        var fr = new FileReader();
        
        fr.onloadend = function(evt){
            $("#favorCourseDetailContent").html(evt.target.result);
        }
        
        fr.readAsText(file);
    }
    
    
    function fail(){
        console.log("failed in getFavorCourseDetail");
    }
    
})();


