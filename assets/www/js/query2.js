
//Get the id from the localStorage
var QueryString = {};

QueryString.id = window.localStorage.getItem("queryID");

function getSuccess(tx,results){
    var len = results.rows.length;
    var innerHTML = "";
    var result = results.rows;
    for(var i = 0; i < len; i++){
        console.log("row = "+ i + " ;collegName = " + result.item(i).collegeName + "; collegeCode=" + result.item(i).collegeCode);
        innerHTML += '<li><a href="#">'+ result.item(i).collegeName + "</a></li>";
    }
    $("#mainContent4course").html(innerHTML);
    $("#mainContent4course").listview('refresh');
}

function getError(e){
    console.log(e.code);
}

function getCollegeInformation(tx){
    tx.executeSql('select * from college limit 14',[],getSuccess,getError);
}

(function(){
    
    console.log("This function executed!!!");
    var info = window.localStorage.getItem("queryID");
    var databaseExist = window.localStorage.getItem("databaseExist");
    // $("#mainContent4course").html("<li><a href='#'>Hello-->" + info + "-->" + databaseExist + "</a></li>");
    
    // for(var i = 0; i < collegeItemLength; i++){
        // var tem = "collegeName" + i;
        // var r = window.localStorage.getItem(tem);
        // console.log("get collegeName="+r);
    // }
    
    if(iBistuDB != undefined){
        iBistuDB.transaction(getCollegeInformation,errorCB,successCB);
    }
        
    console.log("change the html!!!!");
})();
































