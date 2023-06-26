document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([25.224,-98.021], 7);
    
    // Add the tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
    
    // Define the styling for the GeoJSON layers
    var tamaulipasStyle = {
      color: '#505050',
      weight: 1,
      fillOpacity: 0.2,
    };
    
    var grayStyle = {
      color: '#ffffff',
      weight: 1,
      fillOpacity: 0.7,
    };
    
    // Create layer groups for the GeoJSON layers
    var grayLayer = L.layerGroup().addTo(map);
    var tamaulipasLayer = L.layerGroup().addTo(map);
    
    // Load and add the GeoJSON layer for Tamaulipas state boundaries
    fetch('https://raw.githubusercontent.com/PhantomInsights/mexico-geojson/main/states/Tamaulipas.json')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: tamaulipasStyle,
          onEachFeature: function (feature, layer) {
            layer.setStyle(tamaulipasStyle);
          }
        }).addTo(tamaulipasLayer).bringToFront();
      });
    
    
    // Create a GeoJSON layer for Tamaulipas
    // L.geoJSON(tam_coordenadas, {
    //   style: tamaulipasStyle,
    //   onEachFeature: function (feature, layer) {
    //     layer.setStyle(tamaulipasStyle);
    //   }
    // }).addTo(map).bringToFront();
    
    var restOfWorldCoordinates = [
      [
        [-180, 90],
        [180, 90],
        [180, -90],
        [-180, -90],
        [-180, 90]
      ],
      // Add any additional polygons to exclude specific areas (if needed)
      // ...
    ];
    
    // Create a GeoJSON layer for the rest of the world
    L.geoJSON({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: restOfWorldCoordinates
      }
    }, {
      style: grayStyle,
      onEachFeature: function (feature, layer) {
        layer.setStyle(grayStyle);
      }
    }).addTo(grayLayer).bringToBack();
    
    // Define the custom pin icon
    var customIcon = L.icon({
      iconUrl: '/leaflet/icons/pin.svg', // Specify the path to your custom icon image
      iconSize: [25, 25], // Specify the size of the icon
      iconAnchor: [12, 12], // Specify the anchor point of the icon (tip of the pin)
    });
    
    var marker = L.marker([23.7150, -99.1379]).addTo(map).bindPopup("<b>Ciudad Victoria</b><br />1");
    var marker = L.marker([25.8197,-97.5229]).addTo(map).bindPopup("<b>Matamoros</b><br />10");
    // Create a marker with the custom icon and add it to the map
    // var marker = L.marker([225.8197,-97.5229], { icon: customIcon }).addTo(map);
})