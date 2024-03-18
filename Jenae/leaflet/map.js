// Initialize the map on the "map" div with a given center and zoom level
var myMap = L.map('map').setView([36.778259, -119.417931], 5);

// Add a Tile Layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(myMap);

// Define marker colors for ten largest and smallest hospitals
var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

// Define your locations as an array of objects
var locations = [
    {lat: 37.43403, lon: -122.18074, name: "STANFORD HEALTH CARE"},
    {lat: 34.07682, lon: -118.3803, name: "CEDARS-SINAI MEDICAL CENTER"},
    {lat: 37.76312, lon: -122.45782, name: "UCSF MEDICAL CENTER"},
    {lat: 33.12183, lon: -117.12149, name: "PALOMAR MEDICAL CENTER"},
    {lat: 34.06447, lon: -118.44352, name: "RONALD REAGAN UCLA MEDICAL CENTER"},
    {lat: 38.55523, lon: -121.456, name: "UNIVERSITY OF CALIFORNIA DAVIS MEDICAL CENTER"},
    {lat: 34.04917, lon: -117.26278, name: "LOMA LINDA UNIVERSITY MEDICAL CENTER"},
    {lat: 33.62459, lon: -117.93012, name: "HOAG MEMORIAL HOSPITAL PRESBYTERIAN"},
    {lat: 32.75488, lon: -117.16602, name: "UNIVERSITY OF CALIFORNIA SAN DIEGO MEDICAL CENTER"},
    {lat: 32.79953, lon: -117.15462, name: "SHARP MEMORIAL HOSPITAL"},
    {lat: 34.83339, lon: -114.61753, name: "COLORADO RIVER MEDICAL CENTER"},
    {lat: 33.81282, lon: -117.22266, name: "KINDRED HOSPITAL - RIVERSIDE"},
    {lat: 34.10399, lon: -117.56655, name: "KINDRED HOSPITAL - RANCHO"},
    {lat: 35.41181, lon: -119.03964, name: "GOOD SAMARITAN HOSPITAL - BAKERSFIELD"},
    {lat: 33.33923, lon: -118.33072, name: "CATALINA ISLAND MEDICAL CENTER"},
    {lat: 36.60925, lon: -118.05785, name: "SOUTHERN INYO HOSPITAL"},
    {lat: 34.07159, lon: -117.94495, name: "WEST COVINA MEDICAL CENTER"},
    {lat: 41.53164, lon: -120.17143, name: "SURPRISE VALLEY COMMUNITY HOSPITAL"},
    {lat: 33.78886, lon: -118.14482, name: "COMMUNITY HOSPITAL LONG BEACH"},
    {lat: 40.58592, lon: -122.41687, name: "PATIENTS' HOSPITAL OF REDDING"},
];

// Loop through the locations and add a marker for each
locations.forEach(function(location, index) {
    var markerOptions = {};

    if (index < 10) {
        // First 10 markers green
        markerOptions.icon = greenIcon;
    } else {
        // Next 10 markers red
        markerOptions.icon = redIcon;
    }

    L.marker([location.lat, location.lon], markerOptions).addTo(myMap)
        .bindPopup(location.name);
});
