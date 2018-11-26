// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5
  });
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.json(queryUrl, function(data) {
  console.log(data)

//L.geoJSON(data).addTo(myMap);

function getColor(d) {
    return d > 7 ? '#800026' :
           d > 6 ? '#BD0026' :
           d > 5 ? '#E31A1C' :
           d > 4 ? '#FC4E2A' :
           d > 3 ? '#FD8D3C' :
           d > 2 ? '#FEB24C' :
           d > 1 ? '#FED976' :
                   '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.mag),
        weight: 0.5,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.7,
        radius: 3*feature.properties.mag
    };
}

var dataColor = L.geoJson(data, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, style(feature))
		.bindPopup("<p>Location: " + feature.properties.place + "</p><hr><p> Magnitude: "+feature.properties.mag+"</p>");
	}
});
dataColor.addTo(myMap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


});
