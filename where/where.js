var stations ={
'ALEWIFE NB' : {'lat': 42.395428,'lon': -71.142483, 'key': 'RALEN'},
'DAVIS NB' : { 'lat':42.39674,'lon': -71.121815, 'key': 'RDAVN'}, 
'DAVIS SB' :{ 'lat':42.39674,'lon': -71.121815, 'key':'RDAVS'},
'PORTER NB':{ 'lat':42.3884,'lon':-71.119149, 'key':'RPORN'},
'PORTER SB':{'lat': 42.3884,'lon':-71.119149, 'key':'RPORS'},
'HARVARD NB':{'lat':42.373362, 'lon':-71.118956, 'key':'RHARN'},
'HARVARD SB':{'lat':42.373362, 'lon':-71.118956, 'key':'RHARS'},
'CENTRAL NB':{'lat':42.365486, 'lon':-71.103802, 'key':'RCENN'},
'CENTRAL SB':{'lat':42.365486, 'lon':-71.103802, 'key':'RCENS'},
'KENDALL NB':{'lat':42.36249079, 'lon':-71.08617653, 'key':'RKENN'},
'KENDALL SB':{'lat':42.36249079, 'lon':-71.08617653, 'key':'RKENS'},
'CHARLES MGH NB':{'lat':42.361166, 'lon':-71.070628, 'key':'RMGHN'},
'CHARLES MGH SB':{'lat':42.361166, 'lon':-71.070628, 'key':'RMGHS'},
'PARK NB':{'lat':42.35639457, 'lon':-71.0624242, 'key':'RPRKN'},
'PARK SB':{'lat':42.35639457, 'lon':-71.0624242, 'key':'RPRKS'},
'DOWNTOWN CROSSING NB':{'lat':42.355518, 'lon':-71.060225, 'key':'RDTCN'},
'DOWNTOWN CROSSING SB':{'lat':42.355518, 'lon':-71.060225, 'key':'RDTCS'},
'SOUTH STATION NB':{'lat':42.352271, 'lon':-71.055242, 'key':'RSOUN'},
'SOUTH STATION SB':{'lat':42.352271, 'lon':-71.055242, 'key':'RSOUS'},
'BROADWAY NB':{'lat':42.342622, 'lon':-71.056967, 'key':'RBRON'},
'BROADWAY SB':{'lat':42.342622, 'lon':-71.056967, 'key':'RBROS'},
'ANDREW NB':{'lat':42.330154, 'lon':-71.057655, 'key':'RANDN'},
'ANDREW SB':{'lat':42.330154, 'lon':-71.057655, 'key':'RANDS'},
'JFK NB':{'lat':42.320685, 'lon':-71.052391, 'key':'RJFKN'},
'JFK SB':{'lat':42.320685, 'lon':-71.052391, 'key':'RJFKS'},
'SAVIN HILL NB':{'lat':42.31129, 'lon':-71.053331, 'key':'RSAVN'},
'SAVIN HILL SB':{'lat':42.31129, 'lon':-71.053331, 'key':'RSAVS'},
'FIELDS CORNER NB':{'lat':42.300093, 'lon':-71.061667, 'key':'RFIEN'},
'FIELDS CORNER SB':{'lat':42.300093, 'lon':-71.061667, 'key':'RFIES'},
'SHAWMUT NB':{'lat':42.29312583,'lon':-71.06573796, 'key':'RSHAN'},
'SHAWMUT SB':{'lat':42.29312583, 'lon':-71.06573796, 'key':'RSHAS'},
'ASHMONT SB':{'lat':42.284652, 'lon':-71.064489, 'key':'RASHN'},
'NORTH QUINCY NB':{'lat': 42.275275, 'lon':-71.029583, 'key':'RNQUIN'},
'NORTH QUINCY SB':{ 'lat':42.275275, 'lon':-71.029583, 'key':'RNQUIS'},
'WOLLASTON NB':{'lat':42.2665139, 'lon':-71.0203369, 'key':'RWOLN'},
'WOLLASTON SB':{'lat':42.2665139, 'lon':-71.0203369, 'key':'RWOLS'},
'QUINCY CENTER NB':{'lat':42.233391, 'lon':-71.007153, 'key':'RQUCN'},
'QUINCY CENTER SB':{'lat':42.233391, 'lon':-71.007153, 'key':'RQUCS'},
'QUINCY ADAMS NB':{'lat':42.233391, 'lon':-71.007153, 'key':'RQUAN'},
'QUINCY ADAMS SB':{'lat':42.233391, 'lon':-71.007153, 'key':'RQUAS'},
'BRAINTREE SB':{'lat':42.2078543,'lon':-71.0011385, 'key':'RBRAS'}};



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
    	var coords = new google.maps.LatLng(stations[i][0], stations[i][1]);
    	var marker = new google.maps.Marker({
    		position: coords,
        	title: stations[i][2]
    	});
    	marker.setMap(map);

		google.maps.event.addListener(marker, 'click', function() {
        	infowindow.close();
        	infowindow.setContent(place.name);
        	infowindow.open(map, this);
    	});
    }
}