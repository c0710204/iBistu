(function() {

    var buildingQueryId = window.localStorage.getItem("buildingQueryId") + '';
    var flags = 0;
    var innerHTML = "", liHeader = [], imgs = [];
    
    iBistuDB.transaction(function(tx) {

        tx.executeSql("select * from classroom where buildingId = " + "'" + buildingQueryId + "'", [], function(tx, results) {
            var r = results.rows, now = new Date();
            var len = r.length, counter = 0;
            imgs.length = len;
            var year = now.getFullYear(), month = now.getMonth() + 1, day = now.getDate();
            
            if(month < 10){
                month = '0' + month;
            }
            
            if(day < 10){
                day = '0' + day;
            }
            
            var dateQuery = year + "-" + month + "-" + day;
            console.log(dateQuery);
            var date = "2012-03-08";
            
            $("#currentDate_classroom").text(dateQuery);
            
            for(var i = 0; i < len; i++) {
                liHeader[i] = '<li><a href="#" id="' + r.item(i).id + '">' + r.item(i).roomName + '<div data-enhance="false">';
                tx.executeSql('select * from classtime where classroomId = "' + r.item(i).id + '" and date = "' + dateQuery + '" ORDER BY classroomId ASC', [], function(t, result) {

                    var row = result.rows, images = "", l = row.length;
                    
                    function getImage(o){
                        if(o == 'null' || o == null){
                            return '<img src="images/cre.png"></img>&nbsp;';
                        }
                        else if(o == undefined){
                            return '<img src="images/cre.png"></img>&nbsp;';
                        }
                        else if(o != undefined){
                            return '<img src="images/cro.png"></img>&nbsp;';
                        }
                    }
                    
                    if(l == 0){
                        for(var n = 0; n < 11; n++){
                            images += '<img src="images/cre.png"></img>&nbsp;';
                        }
                    }
                    
                    for(var j = 0, l = row.length; j < l; j++){
                        
                        images += getImage(row.item(j).courseId1);
                        images += getImage(row.item(j).courseId2);
                        images += getImage(row.item(j).courseId3);
                        images += getImage(row.item(j).courseId4);
                        images += getImage(row.item(j).courseId5);
                        images += getImage(row.item(j).courseId6);
                        images += getImage(row.item(j).courseId7);
                        images += getImage(row.item(j).courseId8);
                        images += getImage(row.item(j).courseId9);
                        images += getImage(row.item(j).courseId10);
                        images += getImage(row.item(j).courseId11); 

                    }
                    
                    
                    
                    // for(var k = 0; k < 11; k++) {
                        // images += '<img src="images/cre.png"></img>&nbsp;&nbsp;';
                        // // if(row.item(0).courseNumber == 'null'){
                        // // liHeader[i] += '<img src="images/cre.png"/>';
                        // // }
                    // }

                    imgs[counter] = images;
                    liHeader[counter] += imgs[counter];
                    counter++;
                    
                }, function() {
                    console.log("Get from classtime error!");
                });

                // liHeader[i] += '</div></a></li>';
            }
            
            console.log("inner flags-->" + flags)
            flags++;
            
        }, function() {
            console.log("get from classroom error!")
        });

    }, errorCB, function() {
        
        console.log("flags-->" + flags);
        flags++;
        
        console.log("liHeader -->" + liHeader.length);
        for(var n = 0, len = liHeader.length; n < len; n++) {
            innerHTML += liHeader[n] + '</div></a></li>';
        }

        $("#classroomList").html(innerHTML);
        $("#classroomList").listview('refresh');
        
    });

})();

