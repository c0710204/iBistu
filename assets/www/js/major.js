/**
 * 
 */

function getMajorList(tx){
    
    var majorQuery = Number(window.localStorage.getItem("majorQueryId"));
    console.log("MajorID = " + majorQuery);
    tx.executeSql("select * from major WHERE collegeId = 1",[],function(tx,results){
        var len = results.rows.length;
        console.log("length = " + len);
        var innerHTML = "";
        var row = results.rows;
        
        for(var i = 0; i < len; i++){
            innerHTML += '<li data-role="list-divider">' + row.item(i).majorName + '</li>';
        }
        
        $("#majorList").html(innerHTML);
        $("#majorList").listview('refresh');
        
    },
    getError);
}


(function(){
    
    if(iBistuDB != undefined){
        iBistuDB.transaction(getMajorList,errorCB,successCB);
    }
    
    
})();























