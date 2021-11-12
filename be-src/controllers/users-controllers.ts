import { User, Pet } from "../models";
import { cloudinary } from "../lib/cloudinary";
import { create } from "ts-node";
//Reporta Pet Asociada al user
export async function reportPet(userId, petsData) {
	const user = await User.findByPk(userId);

	if (!userId) {
		throw "userid es necesario";
	}
	if (user) {
		if (petsData.imagen) {
			const imagenURL = await cloudinary.uploader.upload(petsData.imagen, {
				resource_type: "image",
				discard_original_filename: true,
				width: 1000,
			});
			const pet = await Pet.create({
				petName: petsData.name,
				search: petsData.search,
				loc: petsData.loc,
				imagen: imagenURL.secure_url,

				estado: "Missing",
				userId: user.get("id"),
			});

			return pet;
		} else {
			throw "picture not found";
		}
	} else {
		throw "error,user not found";
	}
}
//Encuentra usuario por email y retorna el id
export async function findUser(email: string) {
	const user = await User.findOne({ where: { email: email } });
	if (user) {
		const userId = user.get("id");

		return userId;
	} else {
		return "User NOT FOUND";
	}
}
//encuentra Usuario por mail retorna un usuario
export async function findUserforEmail(email: string) {
	const user = await User.findOne({ where: { email: email } });
	if (user) {
		return user;
	} else {
		return "User NOT FOUND";
	}
}
//Encuentra el email de un usuario segun su ID
export async function findEmailUserById(id: string) {
	const user = await User.findOne({ where: { id: id } });
	if (user) {
		const userEmail = user.get("email");

		return userEmail;
	} else {
		throw "user NOT FOUND";
	}
}
//Actualiza el nombre y password del usuario
export async function updateProfile(userId, updateData) {
	if (updateData.email && updateData.password && updateData.fullName) {
		const updateDataComplete = {
			fullName: updateData.fullName,
			email: updateData.email,
			password: updateData.password,
		};
		await User.update(updateDataComplete, { where: { id: userId } });
		return updateDataComplete;
	} else {
	}
}
//Encuentra todas las mascotas reportadas por un usuario segun su ID
export async function AllPetsFromUser(userId) {
	if (userId) {
		const pets = await Pet.findAll({
			where: { userId: userId },
			include: [User],
		});
		return pets;
	} else {
		throw "USER ID NOT FOUND";
	}
}
//Crea un usuario
export async function createUser(data) {
	const { fullName, email } = data;
	if (data.email) {
		const [user, created] = await User.findOrCreate({
			where: { email: data.email },
			defaults: {
				fullName,
				email,
			},
		});

		if (user) return user;
		if (created) return created;
	}
}
//verifica si el email existe
export async function checkEmail(data) {
	const user = await User.findOne({
		where: { email: data },
	});

	if (user == null) {
		return false;
	} else {
		return true;
	}
}
