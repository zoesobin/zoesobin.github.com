function checkpass(){
	if(document.getElementById('password').value!==document.getElementById('password2').value) {
		alert("Please enter matching passwords");
	}
	else{
		postUserInfo();
	}
}

function postUserInfo(){

	request = new XMLHttpRequest();
	request.open("GET", "http://rocky-reaches-7172.herokuapp.com/allusers.json", true);
	request.send(null);
    request.onreadystatechange = callb;
}


function callb() {
	if (request.readyState == 4 && request.status == 200) {
         usercheck();
     }
    if (request.status == 0) {
     	document.getElementById("list").innerHTML = "Error! Please refresh the page until jobs appear...";
     }
        
}

function usercheck() {

	firstname=document.getElementById("firstname").value;
	lastname=document.getElementById("lastname").value;
	email=document.getElementById("email").value;
	password=document.getElementById("password").value;

	var output = {"firstname": firstname, "lastname": lastname, "email":email, "password":password};

	str = request.responseText;
    var users = JSON.parse(str);
	check = true;	
    for (i = 0; i <users.length; i ++){
    	if (users[i].email == email){
			alert("sorry bro, you already have an account!");
			check = false;
    	}
    }
    if (check == true){
    	alert("Welcome to JumboPark!");
    	$.post("http://rocky-reaches-7172.herokuapp.com/user.json", output,function(data){
 			$.cookie("user", email);
			window.location = "mappage.html"
		});
	}

}