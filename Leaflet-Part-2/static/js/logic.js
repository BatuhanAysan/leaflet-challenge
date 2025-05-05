// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
let satellite = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenTopoMap contributors"
});

let grayscale = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "© CartoDB"
});

let outdoors = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: "© OSM Humanitarian"
});


// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

let baseMaps = {
  "Satellite": satellite,
  "Grayscale": grayscale,
  "Outdoors": outdoors
};

let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [37.09, -95.71], 
  zoom: 4,
  layers: [satellite, earthquakes]
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]), // depth
      color: "#000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth > 90) return "#d73027";
    if (depth > 70) return "#fc8d59";
    if (depth > 50) return "#fee08b";
    if (depth > 30) return "#d9ef8b";
    if (depth > 10) return "#91cf60";
    return "#1a9850";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) return 1;
    return magnitude * 4;
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `Magnitude: <strong>${feature.properties.mag}</strong><br>
         Location: ${feature.properties.place}<br>
         Depth: ${feature.geometry.coordinates[2]} km`
      );
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(earthquakes);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#1a9850",
      "#91cf60",
      "#d9ef8b",
      "#fee08b",
      "#fc8d59",
      "#d73027"
    ];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        `<i style="background:${colors[i]}; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.9"></i>` +
        `${depths[i]}&ndash;${depths[i + 1] || "+"} km<br>`;
    }
  
    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    L.geoJson(plate_data, {
      color: "orange",
      weight: 2
    // Then add the tectonic_plates layer to the map.
    }).addTo(tectonicPlates);
  });
});
