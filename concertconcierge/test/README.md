#2013 Web Programming Semester Project Team 22:

##Title: Tufts Off-Campus Parking

###Problem:
There is an obvious shortage of parking here at Tufts.  There are many people who own cars and need to find a place to park their car for the school year.  In addition, if a friend from out of town drives up, they will also need to find a spot to park their car for the weekend.  Unfortunately, there is no organized way to find parking spots around Tufts, either for a few days or a few months.

###Solution:
We are proposing to build a web application that would store ads for available parking spaces in off-campus houses.  Accessible by Tufts students, users will be able to create an account and find listings by other students who don’t need their parking spaces.  There will be two options for renting out parking spots, either a 2 semester lease or a specific amount of time (ex. a weekend).  

###Features:
* Account that allows the user to rent or lease.
* Leasers will rent out their spots for either a full school year or for a specified amount of time to renters.
* Using the google maps API to find locations of parking spaces and the Twitter API to post ads to Twitter as well as the website
* Updates listings by receiving data from an AJAX server


###‘Pick 5’ Features:
1. Uses geolocation to find the closest parking spot listing near you.  
2. Client side data-persistence--local storage/cookies will be used with the "remember me" option at login
3. A custom search will be used to filter out locations by various options (price range, distance from you, etc)  
4. Graphs will be used to display important statistics regarding parking spots.
5. We will use bootstrap to design the layout  

###Data:
From Leasers:
* The time that they are offering the spot(s) for 
* The price it will be offered
* The address of the spot
* Type of spot (street, lot, garage).
* A note describing any other information they want the renter to know

From any user:
* Users will create accounts with their full names and contact information

#Comments from Ming
* Damn right, there is a shortage of parking at Tufts (except for the lot across from Halligan)
* Please do not collect DOB. Collecting less information is more.
