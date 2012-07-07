/**
 *
 */

function getMajorList(tx) {

    var majorQuery = Number(window.localStorage.getItem("majorQueryId"));
    var collegeName = window.localStorage.getItem("collegeQueryMajor");
    console.log("MajorID = " + majorQuery);
    tx.executeSql("select * from major where collegeId = " + "'" + majorQuery + "'", [], function(tx, results) {
        var row = results.rows;
        var len = row.length;
        console.log("length = " + len);
        var innerHTML = "";

        for(var i = 0; i < len; i++) {
            innerHTML += '<li data-role="list-divider"><a href="courselist.html" id="' + row.item(i).id + '">' + row.item(i).majorName + '</a></li>';
        }
        $("#collegeNameInMajor").text(collegeName);
        $("#majorList").html(innerHTML);
        $("#majorList").listview('refresh');

        $("#majorList a").each(function(index) {
            $(this).click(function() {
                var queryID = $(this).attr("id");
                console.log("majorid-->" + queryID)
                var majorName = $(this).text();
                window.localStorage.setItem("courseListQueryId", queryID);
                window.localStorage.setItem("majorQueryCourse",majorName);
            });
        });

    }, getError);

}

(function() {

    if(iBistuDB != null) {
        iBistuDB.transaction(getMajorList, errorCB, successCB);
    }

})();

