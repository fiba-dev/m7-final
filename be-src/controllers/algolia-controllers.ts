import { index } from "../lib/algolia";
//Buscar Pet en algolia
export async function searchPet(data) {
	const { lat, lng } = data;

	const { hits } = await index.search("", {
		aroundLatLng: [lat, lng].join(","),
		aroundRadius: 20000,
	});
	return hits;
}
//crea la Pet para Algolia
export async function algoliaPet(petData) {
	const pet = {
		objectID: petData.id,
		petName: petData.petName,
		userId: petData.userId,
		_geoloc: {
			lat: petData.loc[0],
			lng: petData.loc[1],
		},
	};
	return pet;
}
