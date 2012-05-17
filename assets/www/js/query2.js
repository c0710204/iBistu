
//Get the id from the localStorage
var QueryString = {};

QueryString.id = window.localStorage.getItem("queryID");
console.log("id--->" + QueryString.id);
(function(){
    
    console.log("This function executed!!!");
    
    $("#mainContent").html("<div>Hello</div>");
        
    console.log("change the html!!!!");
})();
































