# 🗺️ Leaflet Earthquake Visualization Challenge

## 📌 Overview

This project visualizes real-time earthquake data provided by the **USGS (United States Geological Survey)** using **Leaflet.js**. The goal is to create an interactive map that displays earthquakes from the past week, based on their **magnitude** and **depth**, with popups and a color-coded legend. In Part 2, tectonic plate boundaries are added to explore the relationship between fault lines and seismic activity.

---

## 📁 Folder Structure
```
leaflet-challenge/
├── Leaflet-Part-1/
│   ├── index.html
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── logic.js
├── Leaflet-Part-2/
│   ├── index.html
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── logic.js
└── README.md
```


---

## 🌍 Part 1: Earthquake Visualization

- Retrieves weekly earthquake data from USGS:  
  `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`
- Each earthquake is plotted using `L.circleMarker()`:
  - Marker **radius** represents **magnitude**
  - Marker **color** represents **depth**
- Interactive popups display:
  - Magnitude
  - Location
  - Depth (in km)
- Color-coded **legend** included in the bottom-right corner

---

## 🌋 Part 2: Tectonic Plates + Map Layers

Additional features include:

- Overlays:
  - **Earthquakes** layer
  - **Tectonic Plates** layer  
    (Data from: [Tectonic Plates GitHub](https://github.com/fraxen/tectonicplates))
- Multiple **base map** options:
  - Satellite
  - Grayscale
  - Outdoors
- Full **layer control panel** to toggle base maps and overlays
- Improved user experience with better context for seismic data

---

## 🛠️ Technologies Used

- [Leaflet.js](https://leafletjs.com/)
- [D3.js](https://d3js.org/)
- HTML5 / CSS3 / JavaScript
- USGS Earthquake GeoJSON API
- OpenStreetMap & Carto Tile Layers

---

