var stations =[
{'name': 'ALEWIFE',			  'key': 'RALE', 'directions': ['N', null],'lat': 42.395428, 'lon': -71.142483},
{'name': 'DAVIS' , 			  'key': 'RDAV', 'directions': ['N','S'], 'lat':42.39674,   'lon': -71.121815},
{'name': 'PORTER',  		  'key': 'RPOR', 'directions': ['N','S'], 'lat':42.3884, 	  'lon':-71.119149},
{'name': 'HARVARD', 		  'key': 'RHAR', 'directions': ['N','S'], 'lat':42.373362,  'lon':-71.118956},
{'name': 'CENTRAL',           'key': 'RCEN', 'directions': ['N','S'], 'lat':42.365486,  'lon':-71.103802},
{'name': 'KENDALL', 		  'key': 'RKEN', 'directions': ['N','S'], 'lat':42.36249079,'lon':-71.08617653},
{'name': 'CHARLES MGH',		  'key': 'RMGH', 'directions': ['N','S'], 'lat':42.361166,  'lon':-71.070628},
{'name': 'PARK',			  'key': 'RPRK', 'directions': ['N','S'], 'lat':42.35639457,'lon':-71.0624242},
{'name': 'DOWNTOWN CROSSING', 'key': 'RDTC', 'directions': ['N','S'], 'lat':42.355518,  'lon':-71.060225},
{'name': 'SOUTH STATION',     'key': 'RSOU', 'directions': ['N','S'], 'lat':42.352271,   'lon':-71.055242},
{'name': 'BROADWAY',		  'key': 'RBRO', 'directions': ['N','S'], 'lat':42.342622, 'lon':-71.056967},
{'name': 'ANDREW',		      'key': 'RAND', 'directions': ['N','S'], 'lat':42.330154, 'lon':-71.057655},
{'name': 'JFK',				  'key': 'RJFK', 'directions': ['N','S'], 'lat':42.320685, 'lon':-71.052391}, //line splits at station 12
{'name': 'SAVIN HILL',		  'key': 'RSAV', 'directions': ['N','S'], 'lat':42.31129, 'lon':-71.053331},
{'name': 'FIELDS CORNER',	  'key': 'RFIE', 'directions': ['N','S'], 'lat':42.300093, 'lon':-71.061667},
{'name': 'SHAWMUT', 		  'key': 'RSHA', 'directions': ['N','S'], 'lat':42.29312583,'lon':-71.06573796},
{'name': 'ASHMONT',			  'key': 'RASH', 'directions': [null,'S'],'lat':42.284652, 'lon':-71.064489}, //end of line 1
{'name': 'NORTH QUINCY',	  'key': 'RNQU', 'directions': ['N','S'],'lat': 42.275275, 'lon':-71.029583},
{'name': 'WOLLASTON', 		  'key': 'RWOL', 'directions': ['N','S'], 'lat':42.2665139, 'lon':-71.0203369},
{'name': 'QUINCY CENTER', 	  'key': 'RQUC', 'directions': ['N','S'], 'lat':42.233391, 'lon':-71.007153},
{'name': 'QUINCY ADAMS', 	  'key': 'RQUA', 'directions': ['N','S'], 'lat':42.233391, 'lon':-71.007153},
{'name': 'BRAINTREE', 		  'key': 'RBRA', 'directions': [null,'S'],'lat':42.2078543,'lon':-71.0011385}]; //end of line 2


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
        alert("Geolocation is not supported by your web browser");
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
    var infowindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
    });
    parse();
    createStations();

}

function createStations()
{
	linecoords= new Array();
	var infowindow = new google.maps.InfoWindow(), marker, i;

	for (i=0; i<22; i++){
		var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(stations[i].lat,stations[i].lon),
      	  	title: stations[i].name,
      	  	icon: 'icon.png'
    	});
    	
    	marker.setMap(map);
    	linecoords[i]= new google.maps.LatLng(stations[i].lat, stations[i].lon);
    	
    	google.maps.event.addListener(marker, 'click', (function(marker, i) {
        	return function() {
        	 getTimes(i);
           	 infowindow.setContent(stations[i].name+stations[i].times);
           	 infowindow.open(map, marker);
       	 	}
   		 })(marker, i));
	}
	
    polyline = new google.maps.Polyline({
    	path: linecoords,
    	strokeColor: "#ff0000"
    	});
    polyline.setMap(map);
}

function parse() {
		info = new XMLHttpRequest();
		info.open('GET', 'http://mbtamap-cedar.herokuapp.com/mapper/redline.json', true);
		info.send(null);
		info.onreadystatechange= callback;
		
}
function callback(){
		if (info.readyState == 4 && info.status == 200){
			parsed = JSON.parse(info.responseText);
		}
}
function getTimes(i){
	stations[i].times = "<br>";
		//find northbound from that station
	if (stations[i].directions[0]!=null){
		stations[i].times = stations[i].times + 'Northbound Trains:' +'<br>';
		for (j=0;parsed[j]!=null; j++){
			if ((parsed[j].PlatformKey==stations[i].key+stations[i].directions[0])&&parsed[j].InformationType=='Predicted'){
				stations[i].times = stations[i].times + parsed[j].Time+ "<br>" ;
			}
		}
	}
		//find southbound
	if (stations[i].directions[1]!=null){
		stations[i].times = stations[i].times + 'Southbound Trains:' +'<br>';
		for (j=0;parsed[j]!=null; j++){
			if ((parsed[j].PlatformKey==stations[i].key+stations[i].directions[1])&&parsed[j].InformationType=='Predicted'){
				console.log('hereeee');
				stations[i].times = stations[i].times + parsed[j].Time + "<br>" ;
			}
		}
	}

}