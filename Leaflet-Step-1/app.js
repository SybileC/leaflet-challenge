var myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 5
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

  d3.json(url , function(response) {
    console.log(response);
    
    var features = response.features;

    console.log(features);

    function chooseColor(earthquakeDepth) {
        if (earthquakeDepth >= -10 && earthquakeDepth < 10) {
          return "#93f542";
        }
        else if (earthquakeDepth >= 10 && earthquakeDepth < 30) {
          return "#bcf542";
        }
        else if (earthquakeDepth >= 30 && earthquakeDepth < 50) {
          return "#e9f542";
        }
        else if (earthquakeDepth >= 50 && earthquakeDepth < 70) {
          return "#f5b042";
        }
        else if (earthquakeDepth >= 70 && earthquakeDepth < 90) {
          return "#f57e42";
        }
        else {
          return "#f54242";
      }
    };

    for (var i = 0; i < features.length; i++) {
      var location = features[i].geometry;

      var properties = features[i].properties;

      if (location) {
        var circle = L.circle([location.coordinates[1], location.coordinates[0]], {
          stroke: true,
          weight: 0.5,
          color: "black",
          fillColor: chooseColor(location.coordinates[2]),
          fillOpacity: 1,
          radius: properties.mag * 15000
      }).addTo(myMap)
      
      circle.bindPopup(properties.place + "<br>" + "Magnitude: " + properties.mag + "<br>" + "Duration: " + properties.dmin + " minutes");

      }
    }
   
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

       var div = L.DomUtil.create('div', 'info legend'),
           depth = [-10, 10, 30, 50, 70, 90],
           labels = [];

       // loop through our density intervals and generate a label with a colored square for each interval
       for (var i = 0; i < depth.length; i++) {
           div.innerHTML +=
               '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
              depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
       }

       return div;
    };

    legend.addTo(myMap);

  }); 

//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     // var limits = geojson.options.limits;
//     var colors = ["#93f542", "#bcf542", "#e9f542", "#f5b042", "#f57e42", "#f54242"];
//     var labels = ["-10 - 10", "10 - 30", "30 - 50", "50 - 70", "70 - 90", "90+"];

//     // var legendInfo = "<div>" + "-10 - 10" + "</div>" +
//     // "<div>" + "10 - 30" + "</div>" + "<div>" + "30 - 50" + "</div>" + 
//     // "<div>" + "50 - 70" + "</div>" + "<div>" + "70 - 90" + "</div>" +
//     // "<div>" + "90+" + "</div>";

//   // div.innerHTML = legendInfo;

//   for (var i = 0; i < colors.length; i++) {
//     labels.push("<li style=\"background-color: " + colors[i] + "\">testing</li>");
//   };

//   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//   return div;
// };

// legend.addTo(map);

// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         depth = [-10, 10, 30, 50, 70, 90],
//         labels = [];
//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < depth.length; i++) {
//         div.innerHTML +=
//             depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
//     }
//     return div;
// };
// legend.addTo(myMap);

// function chooseColor(earthquakeDepth) {
//         if (earthquakeDepth >= -10 && earthquakeDepth < 10) {
//           return "#93f542";
//         }
//         else if (earthquakeDepth >= 10 && earthquakeDepth < 30) {
//           return "#bcf542";
//         }
//         else if (earthquakeDepth >= 30 && earthquakeDepth < 50) {
//           return "#e9f542";
//         }
//         else if (earthquakeDepth >= 50 && earthquakeDepth < 70) {
//           return "#f5b042";
//         }
//         else if (earthquakeDepth >= 70 && earthquakeDepth < 90) {
//           return "#f57e42";
//         }
//         else {
//           return "#f54242";
//       }
//     };

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         depth = [-10, 10, 30, 50, 70, 90],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < depth.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
//            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(myMap);