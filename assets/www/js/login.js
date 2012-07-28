
var loginFlag;

(function() {
	
	var KeyUrl = "http://m.bistu.edu.cn/api/api.php?table=member&action=getloginkey";
	var loginURL = "http://m.bistu.edu.cn/api/api.php?table=member&action=login";
	var loginFlag,
		pubkey,
		usercode,
		bt = $("#loginSubmit"),
	    passwd;
	 
	
	//general method for get data from server
	/*
	 * used for get public key and login flag.
	 * */
	/***
	 * Bug record!
	 * I just change the responseText;
	 * like this:
	 * //loginFlag = xhr.responseText;    --->
	 * ---> loginFlag = JSON.parse(xhr.responseText);	
	 * 
	 * Time: 2012/07/08 11:30AM
	 * 
	 * */
	function loginAjax(url, type){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				console.log("ajax status-->" + xhr.status);
				if(xhr.status == 200){
					if(type == "key"){
						pubkey = JSON.parse(xhr.responseText);
					}
					else if(type == "flag"){
						//loginFlag = xhr.responseText;
						loginFlag = JSON.parse(xhr.responseText);
						
						window.localStorage.setItem("loginToken",loginFlag);
					}
					console.log(xhr.responseText);
				}
			}
		}
		xhr.open("GET",url,true);
		xhr.send(null);
	}
	
	function getPubKey(url){
		loginAjax(url,"key");
	}
	
	pubkey = getPubKey(KeyUrl);
	
	function loginEncrypt(msg) {
		var rsa = new RSAKey();
		rsa.setPublic(pubkey,"010001");
		return rsa.encrypt(msg);
	}
	
	function getLoginFlag(){
		var str = usercode+"|"+passwd;
		console.log("user info---->" + str);
		var req = loginEncrypt(str);
		loginURL += "&info="+req;
		loginAjax(loginURL, "flag");
	}
	
	bt.click(function(){
		usercode = $("#loginCode").val();
		passwd = $("#loginPassword").val();
		console.log("password-->" + passwd);
		console.log("username-->" + usercode);
		getLoginFlag();
		// window.location.href = "index.html";
	});
	
	$("#logoutButton").click(function(){
		window.localStorage.removeItem("loginToken");
		window.location.href = "index.html";
	});
	
})();

















