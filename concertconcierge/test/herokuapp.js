// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');

// Mongo initialization
var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/rocky-reaches-7172';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
	db = databaseConnection;
});




app.post('/user.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
	userdata = {
	'firstname': request.body.firstname,
	'lastname': request.body.lastname,
	'email': request.body.email,
	'password': request.body.password};
 
 	db.collection('users', function(err, collection) {
		collection.insert(userdata);
    });
	response.send();

});


app.get('/login.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
  //this is supposed to check to see if a user's email and password are correct matches
  //but we couldn't get it to work!
  
	db.collection("users", function(err, collection){
 		collection.find({'email': request.body.email, 'password':request.body.password}).toArray(function(err,cursor){
 			 	if (curor.length >0 ){
 			 		response.send("true");
 			 	}
 			 	else{
 			 		response.send("false");
 			 	}
 		});
 	});


});

app.post('/listings.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
	date = new Date();
	listingdata = {
	'address': request.body.address,
	'lat': request.body.lat, 
	'lon' : request.body.lon,
	'parkingtype': request.body.parkingtype,
	'length':request.body.length,
	'price': request.body.price,
 	'startdate': request.body.startdate, 
 	'enddate': request.body.enddate, 
 	'email': request.body.email,
 	'description': request.body.description,
 	'dateposted': date};
	
	db.collection('listings', function(err, collection) {
        collection.insert(listingdata);
    });
	response.set('Content-Type', 'text/html');
	response.send();
});


app.get('/alllistings.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
 	db.collection("listings", function(err, collection){
 		listings = collection.find().toArray(function(err,cursor){
 			 	response.set('Content-Type', 'text/json');
 				response.send(cursor);
 		});
 	});
});
app.get('/allusers.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
 	db.collection("users", function(err, collection){
 		listings = collection.find().toArray(function(err,cursor){
 			 	response.set('Content-Type', 'text/json');
 				response.send(cursor);
 		});
 	});
});

app.post('/deleteuser.json', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
 	db.collection("users", function(err, collection){
 		collection.remove({'email': request.body.email});
 	});
 	response.send();
});

app.get('/', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
	response.send('SUP');
});

app.get('/index', function(req, res) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
  res.sendfile('index.html');

});
app.get('/map', function(req, res) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  
  res.sendfile('mappage.html');

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});