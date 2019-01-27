//the model, data used to display for various parts of the application
var myLocations = [
	{
		title: 'My Home',
		location: {lat: 33.874082, lng: -118.3225},
		description: '17223 Casimir ave',
		fourSquareVenueID: null
	},	{
		title: 'School',
		location: {lat: 33.883104, lng: -118.329321},
		description: 'El Camino College',
		fourSquareVenueID: '4ad63ba0f964a520e70521e3'
	},	{
		title: 'Tacos',
		location: {lat: 33.881436, lng: -118.326160},
		description: 'Taco Bell',
		fourSquareVenueID: '4ba2efe6f964a520af2338e3'
	},	{
		title: 'Burritos',
		location: {lat: 33.8734215, lng: -118.308800},
		description: 'Chipotle',
		fourSquareVenueID: '515cef2ae4b0d2843148d017'
	},	{
		title: 'Video Games!',
		location: {lat: 33.886523, lng: -118.326127},
		description: 'GameStop',
		fourSquareVenueID: '4c2ff8987cc0c9b67bbeec9a'
	}
];

// Create a styles array to use with the map. Used styles from previous lesson
var styles = [
	{
		featureType: 'water',
		stylers: [
			{ color: '#19a0d8' }
		]
	},{
		featureType: 'administrative',
		elementType: 'labels.text.stroke',
		stylers: [
			{ color: '#ffffff' },
			{ weight: 6 }
		]
	},{
		featureType: 'administrative',
		elementType: 'labels.text.fill',
			stylers: [
			{ color: '#e85113' }
		]
	},{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{ color: '#efe9e4' },
			{ lightness: -40 }
		]
	},{
		featureType: 'transit.station',
		stylers: [
			{ weight: 9 },
			{ hue: '#e85113' }
		]
	},{
		featureType: 'road.highway',
		elementType: 'labels.icon',
		stylers: [
			{ visibility: 'off' }
		]
	},{
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{ lightness: 100 }
		]
	},{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{ lightness: -100 }
		]
	},{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{ visibility: 'on' },
			{ color: '#f0e4d3' }
		]
	},{
		featureType: 'road.highway',
		elementType: 'geometry.fill',
		stylers: [
			{ color: '#efe9e4' },
			{ lightness: -25 }
		]
	}
];