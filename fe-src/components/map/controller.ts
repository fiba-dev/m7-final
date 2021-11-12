import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "../../lib/mapobox";
import { state } from "../../state";
//inicia el mapa de mapbox
export async function initMap(mapa) {
	mapboxgl.accessToken = MAPBOX_TOKEN;
	return new mapboxgl.Map({
		container: mapa,
		style: "mapbox://styles/mapbox/streets-v11",
		center: [-58.3712, -34.6083],
		zoom: 8,
	});
}
//crea un marcador
export async function MarcarMapa(loc, mapa): Promise<void> {
	const cs = state.getState();
	if (mapa) {
		const marker = new mapboxgl.Marker({ draggable: true })
			.setLngLat(loc)

			.addTo(mapa);

		mapa.setCenter(loc);
		mapa.setZoom(14);
		function onDragEnd() {
			const lngLat = marker.getLngLat();
			cs.userLat = lngLat.lat;
			cs.userLng = lngLat.lng;
		}

		marker.on("dragend", onDragEnd);
	}
}
//marca en el mapa ubicacion del usuario
export function obtenerUbicacion(map) {
	let loc;

	navigator.geolocation.getCurrentPosition((res) => {
		loc = [res.coords.longitude, res.coords.latitude];
		MarcarMapa(loc, map).then((res) => {});
	});
}
//obtiene ubicacion del usuario
export function Ubicacion() {
	const cs = state.getState();
	let loc;
	navigator.geolocation.getCurrentPosition((res) => {
		cs.userLat = res.coords.latitude;
		cs.userLng = res.coords.longitude;
	});

	return cs;
}
