/**
 *
 */

function getMajorList(tx) {

    var majorQuery = Number(window.localStorage.getItem("majorQueryId"));
    console.log("MajorID = " + majorQuery);
    tx.executeSql("select * from major where collegeId = " + "'" + majorQuery + "'", [], function(tx, results) {
        var row = results.rows;
        var len = row.length;
        console.log("length = " + len);
        var innerHTML = "";

        for(var i = 0; i < len; i++) {
            innerHTML += '<li data-role="list-divider"><a href="courselist.html" id="' + row.item(i).majorCode + '">' + row.item(i).majorName + '</a></li>';
        }
        $("#majorList").html(innerHTML);
        $("#majorList").listview('refresh');

        $("#majorList a").each(function(index) {
            $(this).click(function() {
                var queryID = $(this).attr("id");
                window.localStorage.setItem("courseListQueryId", queryID);
            });
        });

    }, getError);

}

(function() {

    if(iBistuDB != undefined) {
        iBistuDB.transaction(getMajorList, errorCB, successCB);
    }

})();

