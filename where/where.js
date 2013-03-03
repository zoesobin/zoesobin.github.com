function createmap(){
	var lat;
	var lon;
	var me = new google.maps.LatLng(lat, lon);
	var myOptions = {
		zoom: 13, // The larger the zoom number, the bigger the zoom
		center: me,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map;
	var marker;
	var infowindow = new google.maps.InfoWindow();
	var places;

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation(){
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}
function renderMap(){
	me = new google.maps.LatLng(lat, lon);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
	position: me,
	title: "Here I Am!"
	});
	marker.setMap(map);

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);
	});

	// Calling Google Places API
	var request = {
		location: me,
		radius: '500',
		types: ['food']
		};
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
}