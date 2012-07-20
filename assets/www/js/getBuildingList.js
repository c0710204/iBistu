(function() {

    iBistuDB.transaction(function(tx) {

        tx.executeSql('select * from building', [], function(tx, results) {

            var r = results.rows;
            var len = r.length;
            var innerHTML = "";

            for(var i = 0; i < len; i++) {
                innerHTML += '<li><a href="classroom.html" id="'+r.item(i).id+'">' + r.item(i).buildingName + '</a></li>';
            }

            $("#classroomBuildingList").html(innerHTML);
            $("#classroomBuildingList").listview('refresh');
            
            updateClassroomTable();
            updateClasstimeTable();
            
            $("#classroomBuildingList a").each(function(index) {
                
                $(this).click(function() {
                    var buildingId = $(this).attr("id");
                    window.localStorage.setItem("buildingQueryId", buildingId); 

                });
                
            });

        }, function() {
            console.log("Get from building error!!!");
        });

    }, errorCB, successCB);

})();

