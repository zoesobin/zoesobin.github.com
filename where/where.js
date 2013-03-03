var stations =[
{'name': 'ALEWIFE NB','lat': 42.395428,'lon': -71.142483, 'key': 'RALEN'},
{'name': 'DAVIS NB' , 'lat':42.39674,'lon': -71.121815, 'key': 'RDAVN'}, 
{'name': 'DAVIS SB' ,'lat':42.39674,'lon': -71.121815, 'key':'RDAVS'},
{'name': 'PORTER NB', 'lat':42.3884,	'lon':-71.119149, 'key':'RPORN'},
{'name': 'PORTER SB','lat': 42.3884,	'lon':-71.119149, 'key':'RPORS'},
{'name': 'HARVARD NB','lat':42.373362, 'lon':-71.118956, 'key':'RHARN'},
{'name': 'HARVARD SB','lat':42.373362, 'lon':-71.118956, 'key':'RHARS'},
{'name': 'CENTRAL NB','lat':42.365486, 'lon':-71.103802, 'key':'RCENN'},
{'name': 'CENTRAL SB','lat':42.365486, 'lon':-71.103802, 'key':'RCENS'},
{'name': 'KENDALL NB','lat':42.36249079, 'lon':-71.08617653, 'key':'RKENN'},
{'name': 'KENDALL SB','lat':42.36249079, 'lon':-71.08617653, 'key':'RKENS'},
{'name': 'CHARLES MGH NB','lat':42.361166, 'lon':-71.070628, 'key':'RMGHN'},
{'name': 'CHARLES MGH SB','lat':42.361166, 'lon':-71.070628, 'key':'RMGHS'},
{'name': 'PARK NB','lat':42.35639457, 'lon':-71.0624242, 'key':'RPRKN'},
{'name': 'PARK SB','lat':42.35639457, 'lon':-71.0624242, 'key':'RPRKS'},
{'name': 'DOWNTOWN CROSSING NB','lat':42.355518, 'lon':-71.060225, 'key':'RDTCN'},
{'name': 'DOWNTOWN CROSSING SB','lat':42.355518, 'lon':-71.060225, 'key':'RDTCS'},
{'name': 'SOUTH STATION NB','lat':42.352271, 'lon':-71.055242, 'key':'RSOUN'},
{'name': 'SOUTH STATION SB','lat':42.352271, 'lon':-71.055242, 'key':'RSOUS'},
{'name': 'BROADWAY NB','lat':42.342622, 'lon':-71.056967, 'key':'RBRON'},
{'name': 'BROADWAY SB','lat':42.342622, 'lon':-71.056967, 'key':'RBROS'},
{'name': 'ANDREW NB','lat':42.330154, 'lon':-71.057655, 'key':'RANDN'},
{'name': 'ANDREW SB','lat':42.330154, 'lon':-71.057655, 'key':'RANDS'},
{'name': 'JFK NB','lat':42.320685, 'lon':-71.052391, 'key':'RJFKN'},
{'name': 'JFK SB','lat':42.320685, 'lon':-71.052391, 'key':'RJFKS'},
{'name': 'SAVIN HILL NB','lat':42.31129, 'lon':-71.053331, 'key':'RSAVN'},
{'name': 'SAVIN HILL SB','lat':42.31129, 'lon':-71.053331, 'key':'RSAVS'},
{'name': 'FIELDS CORNER NB','lat':42.300093, 'lon':-71.061667, 'key':'RFIEN'},
{'name': 'FIELDS CORNER SB','lat':42.300093, 'lon':-71.061667, 'key':'RFIES'},
{'name': 'SHAWMUT NB','lat':42.29312583,'lon':-71.06573796, 'key':'RSHAN'},
{'name': 'SHAWMUT SB','lat':42.29312583, 'lon':-71.06573796, 'key':'RSHAS'},
{'name': 'ASHMONT SB','lat':42.284652, 'lon':-71.064489, 'key':'RASHN'},
{'name': 'NORTH QUINCY NB','lat': 42.275275, 'lon':-71.029583, 'key':'RNQUIN'},
{'name': 'NORTH QUINCY SB','lat':42.275275, 'lon':-71.029583, 'key':'RNQUIS'},
{'name': 'WOLLASTON NB','lat':42.2665139, 'lon':-71.0203369, 'key':'RWOLN'},
{'name': 'WOLLASTON SB','lat':42.2665139, 'lon':-71.0203369, 'key':'RWOLS'},
{'name': 'QUINCY CENTER NB','lat':42.233391, 'lon':-71.007153, 'key':'RQUCN'},
{'name': 'QUINCY CENTER SB','lat':42.233391, 'lon':-71.007153, 'key':'RQUCS'},
{'name': 'QUINCY ADAMS NB','lat':42.233391, 'lon':-71.007153, 'key':'RQUAN'},
{'name': 'QUINCY ADAMS SB','lat':42.233391, 'lon':-71.007153, 'key':'RQUAS'},
{'name': 'BRAINTREE SB','lat':42.2078543,'lon':-71.0011385, 'key':'RBRAS'}];



var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
       zoom: 13, // The larger the zoom number, the bigger the zoom
       center: me,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
var map;
var marker;
var infowindow = new google.maps.InfoWindow();


function createmap()
{
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getMyLocation();
}

function getMyLocation()
{
    if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
    	navigator.geolocation.getCurrentPosition(function(position) {
    	myLat = position.coords.latitude;
    	myLng = position.coords.longitude;
    	renderMap();
    });
}
	else {
        alert("Geolocation is not supported by your web browser.  What a shame!");
        }
}

function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);

    // Update map and go there...
    map.panTo(me);

    var marker = new google.maps.Marker({
    	position: me,
        title: "Here I Am!"
    });
    marker.setMap(map);

    // Open info window on click of marker
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
    });

}

function createStations(place)
{
    for (i = 0; i<42;i++){
    	// Create a marker
    	var coords = new google.maps.LatLng(stations[i].lat, stations[i].lon);
    	var marker = new google.maps.Marker({
    		position: coords,
        	title: stations[i].name
    	});
    	marker.setMap(map);

		google.maps.event.addListener(marker, 'click', function() {
        	infowindow.close();
        	infowindow.setContent(stations[1].name);
        	infowindow.open(map, this);
    	});
    }
}