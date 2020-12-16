// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"


// d3.json(queryUrl, function(data) {
//     // Once we get a response, send the data.features object to the createFeatures function
//     createFeatures(data.features);
//   });
  

//   function createFeatures(earthquakeData) {

//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of the earthquake
//     function onEachFeature(feature, layer) {
//       layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//     }
  
//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature
//     });
  
  

var myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 5
    // minZoom: 1,
    // maxZoom: 1
 });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  var geojson;

  d3.json(url , function(response) {
    console.log(response);
    
    var features = response.features;

    console.log(features);

    // var markers = L.markerClusterGroup();

    // function chooseColor()

    for (var i = 0; i < features.length; i++) {
      var location = features[i].geometry;

      var properties = features[i].properties;
  
      if (location) {
        L.circle([location.coordinates[1], location.coordinates[0]], {
          stroke: true,
          weight: 0.5,
          color: "black",
          // fillColor: "#f03",
          // fillOpacity: 0.5,
          radius: properties.mag * 15000
      }).addTo(myMap);

      }
    }
  

    // myMap.addLayer(markers);
    
  }); 