//This application is by Jeff Choate for Udacity Front End Nanodegree Neighborhood project
(function() {
	"use strict";
}());

//the map variable that will be used throughout application
var map;

//define easy function calls to change marker colors
//initialize them after google api callback executes
var defaultIcon;
var highlightedIcon;
var chosenIcon;

//Function returns a markerImage object used to set a marker's color
//Input: 6 digit color code as a string
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
		'|40|_|%E2%80%A2',
		new google.maps.Size(21, 34),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 34),
		new google.maps.Size(21,34));
	return markerImage;
}

//global infoWindow variable to insure 1 window max is displayed
var infoWindow = {};

//Sets a marker's color
function marker_on_click(clickedMarker, color) {
	clickedMarker.setIcon(color);
}

//this function is called when there is an error with calling the GOogle Maps API
function mapsError() {
	alert("Google Maps Failed to Load");
}

//function used by callback from google maps API to display the map
//Other webpage functionality follow this call because that functionality requires
//goolge to be defined (any marker or infowindow work)
function initMap() {
        
        defaultIcon = makeMarkerIcon('0091ff');
		highlightedIcon = makeMarkerIcon('FFFF24');
		chosenIcon = makeMarkerIcon('FF4500');
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 33.8793808, lng: -118.3200142},  
			zoom: 16,
			styles: styles,
			mapTypeControl: false
        });

		infoWindow = new google.maps.InfoWindow();
		ko.applyBindings(new viewModel());
      }


var displayInfoWindow= function(clickedLocation, url) {
		infoWindow.marker = clickedLocation;
		infoWindow.addListener("closeclick", function() {
			infoWindow.marker=null;
		});
		if(url){
			infoWindow.setContent("<div class='infoWindow'><h3>For " + clickedLocation.title + "</h3>" +
			 	    			"<img alt='Image Location' src='" + url + "'></div>");
		} else {
			infoWindow.setContent("<div class='infoWindow'><h3>For " + clickedLocation.title + "</h3>" +
			 	    			"<h2>No Image found for this location</h2>");
		}
		infoWindow.open(map, clickedLocation);
};


//Default Knockout viewModel Function
//store initialization data here and tie together the View (DOM) and the models (above)
var viewModel = function () {
	var self = this;

	//array of locations or marker objects
	self.locationList = ko.observableArray([]);

	//variable to track the bounds of the map initially
	var bounds = new google.maps.LatLngBounds();

	//initializing array with marker objects
	myLocations.forEach(function(newLocation, index, arr){
		var tempMarker= new google.maps.Marker({
			map: map,
			position: newLocation.location,
			title: newLocation.title,
			animation: google.maps.Animation.DROP,
			icon: defaultIcon,
			id: index,
			description: newLocation.description,
			fourSquareVenueID: newLocation.fourSquareVenueID
		});

		//continually tracking the bounds of the initial map draw
		bounds.extend(tempMarker.position);

		//calls same functionality of list item click to show details of a marker
		tempMarker.addListener('click',function(){
		 	//fourSquareCall(this);
		 	self.showLocationDetails(this);
		 });

		//calls same functionality of list item mouseover to properly color a marker
		tempMarker.addListener('mouseover', function() {
			self.highLightMarker_ON(this);
		});

		//calls same functionality of list item mouseout to properly color a marker
		tempMarker.addListener('mouseout', function(){
			self.highLightMarker_OFF(this);
		});
		self.locationList.push(tempMarker);
	});

	//set the bounds of the map to show all markers
	map.fitBounds(bounds);

	//this is used to apply styling to a list item to indicate it is selected, regardless if it is selected via the list or the marker
	self.currentlySelectedMarker = ko.observable();

	//this function is called when the list item or markers are clicked, the purpose is to ultimately display information over the appropriate marker
	//parameters: 1 param to be the marker which was clicked
	self.showLocationDetails = function(clickedLocation) {
		//Display Unique information about the location selected	
		if (clickedLocation!=self.currentlySelectedMarker()) {//a different location was selecte than before

			//set the last location to defaultIcon color IFF there was a last location
			if(self.currentlySelectedMarker()!=undefined) {
				marker_on_click(self.currentlySelectedMarker(), defaultIcon);
				marker_on_click(clickedLocation, chosenIcon);
				self.currentlySelectedMarker().setAnimation(null);
			}
			//set new location to chosenIcon color
			infoWindow.close();
			fourSquareCall(clickedLocation);
			clickedLocation.setAnimation(google.maps.Animation.BOUNCE);
			self.currentlySelectedMarker(clickedLocation);	
		} else {
			//Called if this location is equal to the last clicked location (unclicks the location)
			clickedLocation.setAnimation(null);
			infoWindow.close();
			marker_on_click(clickedLocation, defaultIcon);
			self.currentlySelectedMarker(null);
		}
	};

	//This function highlights a marker when hovered over the marker or list item
	this.highLightMarker_ON = function(clickedLocation) {
		marker_on_click(clickedLocation, highlightedIcon); 
	};

	//This function unhighlights a marker when hoveredoff the marker or list item
	this.highLightMarker_OFF = function(clickedLocation) {
		//Display Unique information about the location selected	
		if (clickedLocation!=self.currentlySelectedMarker()) {
			marker_on_click(clickedLocation, defaultIcon);			
		} else {
			marker_on_click(clickedLocation, chosenIcon);
		}
	};

	//this is the text from the input text box, it is used to filter the displayed markers
	self.inputText1 = ko.observable();

	//this function updates the list item of locations and update the markers displayed as well
	self.updatedLocationsList = ko.computed(function(){
		if(!self.inputText1()){
			self.locationList().forEach(function(loc) {
				loc.setMap(map);
			});
			return self.locationList();
		}else {
			//update displayed markers
			return self.locationList().filter(function(loc) {
				if (loc.title.toLowerCase().includes(self.inputText1().toLowerCase())) {
					loc.setMap(map);
					return loc;
				} 
				loc.setMap(null);
			});
		}
	});
};

//this button hides and shows the list item content to allow a user to see the map content behind it
var collapseButton = function() {
	var listItems = $('#listDiv');
	if(listItems.css('display')==='none')
	{
		listItems.css('display','block');
		$("#hamburger").text("Hide");
	} else {
		listItems.css('display','none');
		$("#hamburger").text("Show");
	}
};

//this function calls the foursqure API and displays a photo from it to the user
//Input param: a marker object
var fourSquareCall = function(loc){
	if(loc.fourSquareVenueID){
			var fourSquareUrl = "https://api.foursquare.com/v2/venues/"+loc.fourSquareVenueID;
			var foursquareClientID = "OJOUQBMEJRWJFNRB03FJRXRSRUBQ0VB5HB3GKOJXGIPUWLSX";
			var foursquareClientSecret = "ZCWKJR5AR2YGRW1YV01MNSFXN03WOSVUWRAD4OJQMSQZTSV2";
			var foursquareVersion = "20180101";
		    $.ajax({
			url: fourSquareUrl,
			dataType: 'json',
			data: {
		      		client_id: foursquareClientID,
		      		client_secret: foursquareClientSecret,
		      		v: foursquareVersion
			},
			success: function(data) {
				//set the URL for an image
				if(	data.response.venue.bestPhoto.suffix)
				{
					var url = data.response.venue.bestPhoto.prefix + 'width100' + data.response.venue.bestPhoto.suffix;
					displayInfoWindow(loc, url);
				} 
			},
			error: function(data) {
				console.log("Error calling fourSqureAPI " + data.statusText);
				alert("Error: FourSquare API Failed to be called and you will not see an image");
			}
		});
	} else {
		displayInfoWindow(loc, null);
	}
};
