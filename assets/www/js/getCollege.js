//Get the id from the localStorage
var QueryString = {};

QueryString.id = window.localStorage.getItem("collegeQueryId");

function getSuccess(tx, results) {
    var len = results.rows.length;
    var innerHTML = "";
    var result = results.rows;
    for(var i = 0; i < len; i++) {
        innerHTML += '<li><a href="major.html" id="' + result.item(i).collegeCode + '">' + result.item(i).collegeName + "</a></li>";
    }
    $("#mainContent4course").html(innerHTML);
    $("#mainContent4course").listview('refresh');

    $("li a").each(function(index) {
        $(this).click(function() {
            var queryID = $(this).attr("id");
            window.localStorage.setItem("majorQueryId", queryID);
        });
    });
    ;
}

function getError(e) {
    console.log(e.code);
}

function getCollegeInformation(tx) {
    tx.executeSql('select * from college limit 10', [], getSuccess, getError);
}

(function() {

    var info = window.localStorage.getItem("queryID");
    var databaseExist = window.localStorage.getItem("databaseExist");
    // $("#mainContent4course").html("<li><a href='#'>Hello-->" + info + "-->" + databaseExist + "</a></li>");

    // for(var i = 0; i < collegeItemLength; i++){
    // var tem = "collegeName" + i;
    // var r = window.localStorage.getItem(tem);
    // console.log("get collegeName="+r);
    // }

    if(iBistuDB != undefined) {
        iBistuDB.transaction(getCollegeInformation, errorCB, successCB);
    }

    console.log("change the html!!!!");
})();

// $(document).ready(function() {
    // $("li a").each(function(index) {
        // $(this).click(function() {
            // var queryID = $(this).attr("id");
            // console.log(queryID + " = QueryID");
            // window.localStorage.setItem("majorQueryId", queryID);
        // });
    // });
    // ;
// });
