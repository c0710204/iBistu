//Get the id from the localStorage
function getSuccess(tx, results) {
    var innerHTML = "";
    var result = results.rows;
    var len = result.length;
    for(var i = 0; i < len; i++) {
        innerHTML += '<li><a href="major.html" id="' + result.item(i).collegeCode + '">' + result.item(i).collegeName + "</a></li>";
    }
    $("#mainContent4course").html(innerHTML);
    $("#mainContent4course").listview('refresh');

    $("li a").each(function(index) {
        $(this).click(function() {
            var queryID = $(this).attr("id");
            var collegeName = $(this).text();
            window.localStorage.setItem("majorQueryId", queryID);
            window.localStorage.setItem("collegeQueryMajor",collegeName);
        });
    });
}

function getError(e) {
    console.log(e.code);
}

function getCollegeInformation(tx) {
    tx.executeSql('select * from college', [], getSuccess, getError);
}

(function() {

    var info = window.localStorage.getItem("queryID");
    var databaseExist = window.localStorage.getItem("databaseExist");

    if(iBistuDB != undefined) {
        iBistuDB.transaction(getCollegeInformation, errorCB, successCB);
    }

})();


