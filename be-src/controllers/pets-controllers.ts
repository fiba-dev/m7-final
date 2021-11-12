import { User, Pet } from "../models";
import { cloudinary } from "../lib/cloudinary";
import { index } from "../lib/algolia";
//Actualiza la Mascota reportada
export async function updatePet(userId, updateData) {
	const user = await User.findByPk(userId);
	if (!userId) {
		throw "userid es necesario";
	}
	if (user) {
		if (updateData.imagen) {
			const imagenURL = await cloudinary.uploader.upload(updateData.imagen, {
				resource_type: "image",
				discard_original_filename: true,
				width: 1000,
			});
			const updateDataComplete = {
				petName: updateData.name,
				search: updateData.search,
				loc: updateData.loc,
				imagen: imagenURL.secure_url,
				estado: updateData.estado,
				userId: user.get("id"),
			};
			await Pet.update(updateDataComplete, { where: { id: updateData.id } });
			return updateData;
		} else {
			throw "picture not found";
		}
	} else {
		throw "error,user not found";
	}
}

//Busca Pet por Id
export async function findPet(petId): Promise<Pet> {
	if (petId) {
		const pet = await Pet.findOne({ where: { id: petId } }).catch((e) => {
			return console.log("ERROR", e);
		});
		if (pet) {
			return pet;
		}
	} else {
		throw "NOT PET ID CONTROLLER";
	}
}

//Muestra mascotas cercanas que encuentra algolia
export async function MascotasCercanas(params) {
	let pets = [];
	for (const iterator of params) {
		const pet = await Pet.findOne({ where: { id: iterator.objectID } }).catch(
			(e) => {
				throw e;
			}
		);
		if (pet) pets.push(pet);
	}

	return pets;
}
//Elimina una pet
export async function deletePet(pets, id) {
	if (pets) {
		await pets.destroy().catch((e) => {
			return e;
		});
		await index.deleteObject(id).catch((e) => {
			return "Algolia" + e;
		});
	} else {
		return "Error NOT FOUND";
	}
}
