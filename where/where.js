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

var numstations = 22;
var myLat = 0;
var myLng = 0;
var carLat = 0;
var carLon = 0;
var walLat = 0;
var walLon = 0;
var parsed2;
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
//renders map and marker with the users location
function renderMap()
{
    me = new google.maps.LatLng(myLat, myLng);

    // Update map and go there...
    map.panTo(me);

    parse();
    createStations();
	findClosest();

    var marker = new google.maps.Marker({
    	position: me,
        title: "Found you!"
    });
    marker.setMap(map);

    // Open info window on click of marker
    infowindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker, 'click', function() {
    	infowindow.close();
    	infowindow.setContent(marker.title+'<br>Coordinates: '+myLat+' '+myLng+'<br> Closest Station: '+stations[sta].name + '<br>Distance: ' + closest+' miles');
    	infowindow.open(map, marker);
    });
    
}

//locates closest T station to the user
function findClosest(){

	closest = calculateDistance(myLat, myLng, stations[0].lat, stations[0].lon);
	sta = 0;
	for (var k=1; k<numstations; k++){
		distance = calculateDistance(myLat, myLng, stations[k].lat, stations[k].lon);
		if (distance < closest){
			closest=distance;
			sta = k;
		}
	}


}

//finds Lat and Lon for Carmen S. and Waldo, puts their locations on the map 
//and calculates users distance to them.
function findPeople(){
	if (parsed2[0]!=null){
		if (parsed2[0].name=='Waldo'){
			walLat = parsed2[0].loc.latitude;
			walLon = parsed2[0].loc.longitude;
		}
		else{
			carLat = parsed2[0].loc.latitude;
			carLon = parsed2[0].loc.longitude;
		}
	}
	if (parsed2[1]!=null){
		if (parsed2[1].name=='Waldo'){
			walLat = parsed2[1].loc.latitude;
			walLon = parsed2[1].loc.longitude;
		}
		else{
			carLat = parsed2[1].loc.latitude;
			carLon = parsed2[1].loc.longitude;
		}
	}
	
	
	distanceWaldo = calculateDistance(myLat, myLng, walLat, walLon);
    distanceCarmen = calculateDistance(myLat, myLng, carLat, carLon);
	
	
	var marker1 = new google.maps.Marker({
    	position: new google.maps.LatLng(walLat,walLon),
        title: 'You found me at '+walLat+' '+walLon+'!<br> I am only ' + distanceWaldo+' kilometers away!',
        icon: 'waldo.png'
    });
    marker1.setMap(map);
    
    // Open info window on click of marker
    infowindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker1, 'click', function() {
        infowindow.close();
    	infowindow.setContent(marker1.title);
    	infowindow.open(map, marker1);
    });
    
	var marker2 = new google.maps.Marker({
    	position: new google.maps.LatLng(carLat,carLon),
        title: 'You found me at '+carLat+' '+carLon+'!<br> I am only '+ distanceCarmen+' kilometers away!',
        icon: 'carmen.png'
    });
    
    marker2.setMap(map);
    // Open info window on click of marker
    infowindow = new google.maps.InfoWindow;
    google.maps.event.addListener(marker2, 'click', function() {
    	infowindow.close();
    	infowindow.setContent(marker2.title);
    	infowindow.open(map, marker2);
    });

}

//Haversine Formula -- source: http://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(lat1, lon1, lat2, lon2)
{
	var R = 3963; // miles
	var dLat = toRad(lat2-lat1);
	var dLon = toRad(lon2-lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	d= Math.round(d*1000)/1000 
	return d;
}
function toRad(x) 
{
   return x * Math.PI / 180;
}


//renders stations and red line on map
function createStations()
{
	linecoords1= new Array();
	linecoords2 = new Array();
	var infowindow = new google.maps.InfoWindow(), marker, i;
	var z = 0;
	for (i=0; i<numstations; i++){
		var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(stations[i].lat,stations[i].lon),
      	  	title: stations[i].name,
      	  	icon: 'pin.png'
    	});
    	
    	marker.setMap(map);
    	if (i==12){
    		linecoords1[i]= new google.maps.LatLng(stations[i].lat, stations[i].lon);
    		linecoords2[z]= new google.maps.LatLng(stations[i].lat, stations[i].lon);
    		z++;
    	}
    	else if (i<=16){
    		linecoords1[i]= new google.maps.LatLng(stations[i].lat, stations[i].lon);
    	}
    	else if(i>16){
    		linecoords2[z]= new google.maps.LatLng(stations[i].lat, stations[i].lon);
    		z++;
    	}
    	google.maps.event.addListener(marker, 'click', (function(marker, i) {
        	return function() {
        	 getTimes(i);
        	 infowindow.close();
           	 infowindow.setContent(stations[i].name+stations[i].times);
           	 infowindow.open(map, marker);
       	 	}
   		 })(marker, i));
	}
	
    polyline = new google.maps.Polyline({
    	path: linecoords1,
    	strokeColor: "#ff0000"
    	});
    polyline.setMap(map);

    polyline2 = new google.maps.Polyline({
    	path: linecoords2,
    	strokeColor: "#ff0000"
    	});
    polyline2.setMap(map);
}

function parse() 
{
		info = new XMLHttpRequest();
		info.open('GET', 'http://mbtamap-cedar.herokuapp.com/mapper/redline.json', true);
		info.send(null);
		info.onreadystatechange= callback;
		people = new XMLHttpRequest();
		people.open('GET', 'http://messagehub.herokuapp.com/a3.json', true);
		people.send(null);
		people.onreadystatechange= parsejson;
		
}
function parsejson()
{
  	if(people.readyState == people.DONE) {
    	if(people.status == 200 && people.responseXML != null && people.responseXML.getElementById('test').textContent) {
      		// success!
      		parsed2 = JSON.parse(people.responseText);
			findPeople();
			return;
		}
    	// something went wrong
  	}
  	 alert("cannot parse character JSON");
}

function callback()
{
		if (info.readyState == 4 && info.status == 200){
			parsed = JSON.parse(info.responseText);
		}
}

//search through parsed JSON for the arrival times of the clicked station
function getTimes(i)
{
	stations[i].times = "<br>";
		//find northbound from that station
	if (stations[i].directions[0]!=null){
		stations[i].times = stations[i].times + 'Northbound Trains:' +'<br>';
		for (var j=0;parsed[j]!=null; j++){
			if ((parsed[j].PlatformKey==stations[i].key+stations[i].directions[0])&&parsed[j].InformationType=='Predicted'){
				stations[i].times = stations[i].times + parsed[j].Time+ "<br>" ;
			}
		}
	}
		//find southbound
	if (stations[i].directions[1]!=null){
		stations[i].times = stations[i].times + 'Southbound Trains:' +'<br>';
		for (var j=0;parsed[j]!=null; j++){
			if ((parsed[j].PlatformKey==stations[i].key+stations[i].directions[1])&&parsed[j].InformationType=='Predicted'){
				stations[i].times = stations[i].times + parsed[j].Time + "<br>" ;
			}
		}
	}

}