function initialize(){
	email = $.cookie("email");
	pass = $.cookie("pass");
	
	if ((email != null) && (pass != null)){
		$.cookie("user", email);
		request = new XMLHttpRequest();

		request.open("GET", "http://rocky-reaches-7172.herokuapp.com/allusers.json", true);
	 	request.send(null);
     	request.onreadystatechange = cb;
	}
}

function Login(){
	email=document.getElementById("emaillog").value;
	pass=document.getElementById("passwordlog").value;
		
	request = new XMLHttpRequest();

	request.open("GET", "http://rocky-reaches-7172.herokuapp.com/allusers.json", true);
	 request.send(null);
     request.onreadystatechange = cb;
	
}

function cb() {
	if (request.readyState == 4 && request.status == 200) {
         loginuser();
     }
    if (request.status == 0) {
     	document.getElementById("list").innerHTML = "Error! Please refresh the page until jobs appear...";
     }
        
}

function loginuser() {

	str = request.responseText;
    var users = JSON.parse(str);
	login = false;	
    for (i = 0; i <users.length; i ++){
    	if (users[i].email == email && users[i].password == pass){
    		login = true;
			if (document.getElementById("rememberme").checked){
				$.cookie("email", email, {expires: 30});
				$.cookie("pass", pass, {expires: 30});			
			}
			else{
				$.cookie("user", email);
			}
    		window.location = "mappage.html";
    		break;
    	}
    }
	if (login == false){
		alert("incorrect login, try again please!");
	}
}

