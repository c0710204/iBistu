(function() {
    var url = "http://m.bistu.edu.cn/api/api.php?table=activity";
    if(iBistuDB != null && iBistuDB != undefined) {
        console.log("iBistuDB is ready");
        if(Bistu.updateActivityFlag == 1) {
            // if network is ok, and need to update activity.
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        var resp = eval('(' + xhr.responseText + ')'), len = resp.length;
                        iBistuDB.transaction(function(tx) {
                            tx.executeSql('DROP TABLE IF EXISTS activity');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id,title,intro,tel,website)');
                            for(var i = 0; i < len; i++) {
                                tx.executeSql('INSERT INTO activity (id,title,intro,tel,website) values("' + resp[i].id + '","' + resp[i].title + '","' + resp[i].intro + '","' + resp[i].tel + '","' + resp[i].website + '")',[],function(){
                                    console.log("insert into activity success!");
                                },fail);
                                // update the activity list here.
                            }
                            updateList(resp,"JSON");
                        }, errorCB, successCB);
                    }
                }
            }
            xhr.open("GET",url,true);
            xhr.send(null);
        }
        else{
            // don't need to update activity table
            iBistuDB.transaction(function(tx){
                tx.executeSql('SELECT id,title from activity',[],function(tx,results){
                    var r = results.rows,
                        l = r.length;
                    console.log("activity length is " + l);
                    updateList(r,"TABLE");
                    
                },fail);
            },errorCB,
            successCB);
            
        }

    }
    else {
        console.log("iBistuDB is not ready");
    }
    
    
    function fail(){
        console.log("Activity table error!!!!");
    }
    
    function updateList(results,flag){
        
        var r,l,listView = "";
        
        if(flag == "JSON"){
            r = results;
        }
        else if(flag == "TABLE"){
            r = results.item;
        }
        
        l = r.length;
        
        console.log("updatelist length is " + l);
        
        for(var i = 0; i < l; i++){
            listView += "<li><a>" + r[i].title +"</a></li>";
        }
        
        $("#activityListContent").html(listView);
        $("#activityListContent").listview("refresh");
        
    }
    

})();

