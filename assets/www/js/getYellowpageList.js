

(function(){
	
	var depart = window.localStorage.getItem("yellowpageToDetail"),list = "";
	console.log(depart);
	
	function getListFromDB(){
		
		if(iBistuDB != undefined || iBistuDB != null){
			iBistuDB.transaction(function(tx){
				tx.executeSql("select * from yellowpagelist where depart = '" + depart + "'",[],function(tx,results){
					var row = results.rows,len = row.length;
					console.log("length is " + len);
					
					for(var i = 0; i < len; i++){
						list += "<li class='clearfix'><a href='#'>" + row.item(i).name + "<p style='float:right; margin-right:5%;margin-top:2%;'>"+ row.item(i).telnum +"</p></a></li>";
					}
					
					$("#yellowPageDetailList").html(list);
					$("#yellowPageDetailList").listview('refresh');
					
					
				},errorCB);
				
			},function(){
				console.log("select error");
			},function(){
				console.log("select success");
			});
			
			
		}
		
		
	}
	
	getListFromDB();
	
})();





















