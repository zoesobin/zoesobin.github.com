var myLat;
var myLng;
var map;
var parkImg = "images/parkinglot.png";
//var shadowImg = "images/parkinglot.shadow.png";
var infowindow = new google.maps.InfoWindow;

function init(){
	if (!($.cookie("user"))){
		alert("You must login or create an account before using Jumbo Park");
		window.location = "index.html";
	}

	myLocation();
	var landmark = new google.maps.LatLng(42.4086406, -71.1181093);

	var myOptions = {
		zoom: 15, 
		center: landmark,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel:false
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	myLocation();
	get_data();
}

function myLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
				mylat=position.coords.latitude;
				mylng=position.coords.longitude;
				
				mylat = position.coords.latitude;
				mylng = position.coords.longitude;

			var my_location=new google.maps.LatLng(mylat, mylng);
				map.setCenter(my_location);
			var marker=new google.maps.Marker({
				position: my_location,
				map: map,
				title: "Your Location"
			});
		});
		
	}
}
//listings = new Object;
//listings = [{'address':'5 Teale Ave.', 'price':'$500', 'startdate':'10/21/13', 'enddate':'11/21/13', 'parkingtype':'garage', 'contact':'jason.schneiderman@tufts.edu', 'description':'THIS IS MY DESCRIPTION TEST 1'},{'address':'5 Teale Ave.', 'price':'$500', 'startdate':'10/21/13', 'enddate':'11/21/13', 'parkingtype':'garage2', 'contact':'jason.schneiderman@tufts.edu', 'description':'THIS IS MY DESCRIPTION TEST 2'}];
request = new XMLHttpRequest();

    
function get_data() {
	 request.open("GET", "http://rocky-reaches-7172.herokuapp.com/alllistings.json", true);
	 request.send(null);
     request.onreadystatechange = callback;
}

function callback() {
	if (request.readyState == 4 && request.status == 200) {
         parse();
     }
    if (request.status == 0) {
     	document.getElementById("list").innerHTML = "Error! Please refresh the page until jobs appear...";
     }
        
}

function parse() {
	str = request.responseText;
    listings = JSON.parse(str);
    graph();
    markers = new Array();
    s = new Array();

 	for(i=0; i<listings.length; i++) { 
 		s[i] = "myModal" + i;
 		$('.table-hover').append('<tr class="tableRow"><td class="listingTable"<a href="#'+s[i]+'" data-toggle="modal">' 
 									+ listings[i]['address'] + '</a></br></td></tr>');
 		$('.listingTable:last').append('<div class="info"><ul class="unstyled"><li>' + listings[i]['price'] + '</li><li>' 
 										+ listings[i]['startdate'] + ' to ' + listings[i]['enddate'] + '</li><li>' + listings[i]['parkingtype'] 
 										+ '</li></ul></div>');
 		$('.tableRow:last').after('<div id="'+s[i]+'" class="modal hide fade tableModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
 		$('.tableModal:last').append('<div class="modal-header tableHeader"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button><h3 id="myModalLabel">'
 										+listings[i]['address']+'</h3></div>');
 		$('.tableHeader:last').after('<div class="modal-body tableBody"> Price: '+listings[i]['price']+'</br> Address: '
 										+listings[i]['address']+'</br>Dates: '+listings[i]['startdate']+' to ' + listings[i]['enddate'] 
 										+'</br>Seller Contact: '+listings[i]['email']+'</br>Description: '+listings[i]['description']
 										+'</div>');
 		$('.tableBody:last').after('<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button></div>');
     	var mylatlng = new google.maps.LatLng(listings[i]['lat'],listings[i]['lon']);
		markers[i] = new google.maps.Marker({
			position: mylatlng,
			map: map,
			title: listings[i]['address'],
			icon: parkImg
		});
		var index = i;
		addInfoWindow(i, markers[i]);

 		
	}
}

function addInfoWindow(index, marker){
		//console.log(index);
		var str = listings[index]['address']+'</br>'+listings[index]['parkingtype']+'</br> Price: $'+ listings[index]['price']+'</br> Contact: '+ listings[index]['email'] ;

		google.maps.event.addListener(marker, 'click', function(){
			infowindow.setContent(str)
			infowindow.open(map,marker);
			//$("#"+s[index]).modal('show');
		});	
}


function graph(){
	parking = new Array();
	data_list = listings;
	G_num = 0;
	S_num = 0;
	L_num = 0;
	for(i=0; data_list[i] != null; i++){
		if(data_list[i]['parkingtype'] == "Garage Parking"){
			G_num += 1;
		}

		else if(data_list[i]['parkingtype'] == "Street Parking"){
			S_num +=1;
		}

		else if(data_list[i]['parkingtype'] == "Lot Parking"){
			L_num +=1;
		}
	}

	var myData = new Array(['Garage', G_num], ['Street', S_num], ['Lot', L_num]);
	var myChart = new JSChart('chartcontainer', 'bar');
	myChart.setDataArray(myData);
	myChart.setBackgroundColor('#F8F3F3');
	myChart.setAxisNameY('Number of Spots');
	myChart.setAxisNameX('Types');
	myChart.setTitle('Types of Parking Spots Available');
	myChart.setTitleColor('#5555AA');
	myChart.setSize(560, 500);
	myChart.setTitleFontSize(15);
	myChart.draw();

}	

function resetListings(){
	createTable(listings);
}

function filter(){
	 var tempListings = new Array();
	 max = Number(document.getElementById("max").value);
	if(max == 0)
		max = 1000000;
	 min = Number(document.getElementById("min").value);
	
	//var parkLength;
	if (document.getElementById("weekend").checked)
		parkLength = "weekend";
	else if (document.getElementById("week").checked)
		parkLength = "week";
	else if (document.getElementById("semester").checked)
		parkLength = "semester";
	else if (document.getElementById("year").checked)
		parkLength == "year";
	else
		parkLength = "none";
		
	//var parkType;
	if (document.getElementById("garage").checked)
		parkType = "Garage Parking";
	else if (street = document.getElementById("street").checked)
		parkType = "Street Parking";
	else if (document.getElementById("lot").checked)
		parkType = "Lot Parking";
	else
		parkType = "none";
		
	var j=0;
	for(i=0; i<listings.length; i++){
		if(Number(listings[i]["price"]) <= max && Number(listings[i]["price"]) >= min && 
		  (listings[i]["length"] == parkLength || parkLength == "none") && (listings[i]["parkingtype"] == parkType || parkType == "none")){
		  	tempListings[j] = listings[i];
		  	j++;
		 }
	}
	$('.tableRow').remove();
	$('.tableModal').remove();
	createTable(tempListings);
}

function createTable(newListings){
	var sArray = new Array();

 	for(i=0; i<newListings.length; i++) { 
 		sArray[i] = "myModal" + i;
 		$('.table-hover').append('<tr class="tableRow"><td class="listingTable"<a href="#'+sArray[i]+'" data-toggle="modal">' 
 									+ newListings[i]['address'] + '</a></br></td></tr>');
 		$('.listingTable:last').append('<div class="info"><ul class="unstyled"><li>' + newListings[i]['price'] + '</li><li>' 
 										+ newListings[i]['startdate'] + ' to ' + newListings[i]['enddate'] + '</li><li>' + newListings[i]['parkingtype'] 
 										+ '</li></ul></div>');
 		$('.tableRow:last').after('<div id="'+sArray[i]+'" class="modal hide fade tableModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
 		$('.tableModal:last').append('<div class="modal-header tableHeader"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button><h3 id="myModalLabel">'
 										+newListings[i]['address']+'</h3></div>');
 		$('.tableHeader:last').after('<div class="modal-body tableBody"> Price: '+newListings[i]['price']+'</br> Address: '
 										+newListings[i]['address']+'</br>Dates: '+newListings[i]['startdate']+' to ' + newListings[i]['enddate'] 
 										+'</br>Seller Contact: '+newListings[i]['email']+'</br>Description: '+newListings[i]['description']
 										+'</div>');
 		$('.tableBody:last').after('<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button></div>');
     	/*var mylatlng = new google.maps.LatLng(listings[i]['lat'],listings[i]['lon']);
		markers[i] = new google.maps.Marker({
			position: mylatlng,
			map: map,
			title: listings[i]['address'],
			icon: parkImg
		});
		var index = i;
		addInfoWindow(i, markers[i]);*/

 		
	}
}

function logout(){
	d = confirm("Are you sure you want to logout?");
	if (d==true){
		$.removeCookie("email");
		$.removeCookie("pass");
		$.removeCookie("user");
		window.location = "index.html"
	}
}

function deleteUser(){
	email = $.cookie("user");
	
	d = confirm("Are you sure you want to delete your account?");
	if (d==true){
		$.removeCookie("email");
		$.removeCookie("pass");
		$.removeCookie("user");
		$.post('http://rocky-reaches-7172.herokuapp.com/deleteuser.json', {'email':email});
		window.location = "index.html"
	}
}
		


