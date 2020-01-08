import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import { addBeen } from './been';

const token = process.env.mapbox_token;

// https://github.com/datasets/geo-countries/
const countriesGeoJsonLocation = "./countries.geojson";

let map = L.map('map').setView([51.505, -0.09], 2);
let countryLayers = null;

map.setMaxZoom(5);

const selectedColor = "#ffffff";

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: token,
}).addTo(map);

fetch(countriesGeoJsonLocation).then(resp => {
  resp.json().then(data => {
    console.log("data", data)
    countryLayers = L.geoJSON(data, {
      onEachFeature: (feature, featureLayer) => {
        featureLayer.on('click', () => {
          const reset = featureLayer.options.fillColor === selectedColor

          if (reset) {
            countryLayers.resetStyle(featureLayer);
          } else {
            featureLayer.setStyle({
              ...featureLayer.options,
              fillColor: selectedColor,
            })
            addBeen(feature.properties.ISO_A3)
          }
        })
      },
    }).addTo(map);

    console.log("Added geojson!");
  });
});

function actuallyMarkBeen(layer) {
  layer.setStyle({
    fillColor: selectedColor,
  })
}

export function markBeen(been) {
  countryLayers.eachLayer(layer => {
    if (been.indexOf(layer.feature.properties.ISO_A3) !== -1) {
      actuallyMarkBeen(layer)
    }
  })
}
