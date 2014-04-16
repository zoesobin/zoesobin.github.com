function postListings(){

address=document.getElementById("streetaddress").value;
parkingtype=document.getElementById("parkingtype").value;
price=document.getElementById("price").value;
startdate=document.getElementById("startdate").value;
enddate=document.getElementById("enddate").value;
description=document.getElementById("description").value;
city = document.getElementById("city").value;
parkinglength = document.getElementById("parkinglength").value;
contact = $.cookie("user");


console.log(address);
console.log(parkingtype);
console.log(price);
console.log(startdate);
console.log(enddate);
console.log(contact);
console.log(description);

var geocoder = new google.maps.Geocoder();
var totalAddress = address+" "+city+" MA";
geocoder.geocode({'address': totalAddress}, function(results, status){
	if(status == google.maps.GeocoderStatus.OK){
		 latitude = results[0].geometry.location.lat();
		 longitude = results[0].geometry.location.lng();
	}

	var output={"address":address, "parkingtype":parkingtype, "price": price, "startdate":startdate, "enddate":enddate, "email":contact, "parkingtype":parkingtype, "description":description, "lat":latitude, "lon":longitude};
	$.post("http://rocky-reaches-7172.herokuapp.com/listings.json", output);
});


}