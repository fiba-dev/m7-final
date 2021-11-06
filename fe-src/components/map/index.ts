let pictureURL = require("url:../img/picture.png");

const mapboxgl = require("../../lib/mapbox.js");

import { initMap } from "./controller";

console.log(mapboxgl);
const cs = state.getState();

import { MAPBOX_TOKEN } from "../../lib/mapobox";
import MapboxClient from "mapbox";
import { state } from "../../state";
// import mapboxgl from "mapbox-gl";
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
export function init() {
  class PutLocation extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const map = document.createElement("div");

      const style = document.createElement("style");
      map.className = "map-container";

      map.innerHTML = `
      
      <div id="maps"  class="mapa" ></div>
      <form class="search-form">
      <input name="q" type="search" class="input" />
      <button class="button">Buscar</button>
    </form>
   
    `;
      style.innerHTML = `
      .input{
        font-family: "Indie Flower";
        font-size:30px;
          height:60px;
          width: 320px;
          
          text-align:center;
          
          background: #FFFFFF;
          border: 2px solid ;
          
          box-sizing: border-box;
          border-radius: 5px;
          margin-top:20px;
          margin-bottom:20px
   
      }
      .button {
      
        font-family: "Indie Flower";
        
        background: rgb(241, 196, 255 );

          border-radius: 5px;
          width: 320px;
          height: 50px;
          font-size: 30px;
          margin-top:10px;
          
        
      }
      .button:hover {
        background-color: rgba(44, 36, 219 );
        color: white;
   }
      .search-form{
        display: flex;
        flex-direction: column;
      }
      .map-container{
        display:flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
      }
      .mapa{
        width: 320px; 
        height: 260px;
      }
    //   .mapboxgl-ctrl {
    //     clear: both;
    //     display: none;
    //     pointer-events: auto;
    //     transform: translate(0);
    // }
    .mapboxgl-canvas{
      width: 320px !important;
      height: 260px !important;
    }
    .mapboxgl-map {
      font: 12px/20px Helvetica Neue, Arial, Helvetica, sans-serif;
      overflow: hidden;
      position: relative;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    .mapboxgl-canvas {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    .mapboxgl-map:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
    .mapboxgl-canary {
      background-color: salmon;
    }
    .mapboxgl-marker {
      position: absolute;
      top: 0;
      left: 0;
      will-change: transform;
      opacity: 1;
      transition: opacity 0.2s;
    }
    .mapboxgl-canvas-container.mapboxgl-interactive,
.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass {
  cursor: grab;
  -webkit-user-select: none;
  user-select: none;
}
.mapboxgl-canvas-container.mapboxgl-interactive.mapboxgl-track-pointer {
  cursor: pointer;
}
.mapboxgl-canvas-container.mapboxgl-interactive:active,
.mapboxgl-ctrl-group button.mapboxgl-ctrl-compass:active {
  cursor: grabbing;
}
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate,
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate .mapboxgl-canvas {
  touch-action: pan-x pan-y;
}
.mapboxgl-canvas-container.mapboxgl-touch-drag-pan,
.mapboxgl-canvas-container.mapboxgl-touch-drag-pan .mapboxgl-canvas {
  touch-action: pinch-zoom;
}
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan,
.mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan
  .mapboxgl-canvas {
  touch-action: none;
}
  `;

      shadow.appendChild(map);

      shadow.appendChild(style);
      const mapa = shadow.querySelector("#maps");
      const form = shadow.querySelector(".search-form");

      initMap(mapa).then((res) => {
        this.initSearchForm(shadow, res);
      });
      shadow.addEventListener("awesome", (res: any) => {
        const evento = new CustomEvent(`change`, {
          detail: {
            text: res.detail.text,
            search: res.detail.search,
          },
        });
        this.dispatchEvent(evento);
      });
    }

    initSearchForm(shadow, mapa) {
      let loc = [];
      const form = shadow.querySelector(".search-form");

      form.addEventListener("submit", (e: any) => {
        e.preventDefault();

        mapboxClient.geocodeForward(
          e.target.q.value,
          {
            country: "ar",
            autocomplete: true,
            language: "es",
          },
          function (err, data, res) {
            if (!err) {
              const firstResult = data.features[0];
              let lat = firstResult.geometry.coordinates[0];
              let lng = firstResult.geometry.coordinates[1];

              const marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat(firstResult.geometry.coordinates)

                .addTo(mapa);

              mapa.setCenter(firstResult.geometry.coordinates);
              mapa.setZoom(14);

              cs.pet.lat = lat;
              cs.pet.lng = lng;
              cs.pet.search = data.query.toString();
              function onDragEnd() {
                const lngLat = marker.getLngLat();
                cs.pet.lat = lngLat.lat;
                cs.pet.lng = lngLat.lng;
              }

              marker.on("dragend", onDragEnd);
            }
          }
        );
      });
    }
  }
  customElements.define("put-location", PutLocation);
}
