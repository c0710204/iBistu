
(function(){
	
	var loginToken = window.localStorage.getItem("loginToken");
	console.log("loginToken is " + loginToken);
	
	if(loginToken != null && loginToken != "undefined"){
		
		$("#loginForm").removeClass("show").addClass("hidden");
		$("#logoutForm").removeClass("hidden").addClass("show");
		
		console.log("login class-->" + $("#loginForm").attr("class"));
		console.log("logout class-->" + $("#logoutForm").attr("class"));
		
	}
	else {
		$("#logoutForm").removeClass("show").addClass("hidden");
		$("#loginForm").removeClass("hidden").addClass("show");
		
		console.log("login 2 class-->" + $("#loginForm").attr("class"));
		console.log("logout 2 class-->" + $("#logoutForm").attr("class"));
	}
	
})();




























