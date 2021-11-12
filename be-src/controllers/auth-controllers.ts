import { Auth } from "../models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { createJSDocAuthorTag } from "typescript";
const secret = "hola a todos";

function getSHA256ofString(text: string) {
	return crypto.createHash("sha256").update(text).digest("hex");
}
//Actualiza el Auth
export async function updateAuth(userId, updateData) {
	if (updateData.email && updateData.password && userId) {
		const passwordHasheado = getSHA256ofString(updateData.password);
		const updateDataComplete = {
			user_id: userId,
			email: updateData.email,
			password: passwordHasheado,
		};
		await Auth.update(updateDataComplete, { where: { user_id: userId } });
		return updateDataComplete;
	} else {
		return "Faltan Datos del auth";
	}
}
//Crea Auth
export async function createAuth(user, password) {
	const email = user.email;
	if (password) {
		const [auth, authCreated] = await Auth.findOrCreate({
			where: { user_id: user.get("id") },
			defaults: {
				email,
				password: getSHA256ofString(password),
				user_id: user.get("id"),
			},
		});
		if (auth) return auth;
		if (authCreated) return authCreated;
	}
}
//Signin
export async function signin(data) {
	const { email, password } = data;
	const passwordHasheado = getSHA256ofString(password);
	const auth = await Auth.findOne({
		where: { email, password: passwordHasheado },
	});
	if (auth) {
		const token = await jwt.sign({ id: auth.get("user_id") }, secret);
		return token;
	} else {
		throw "no se encuentra el email o password incorrecta";
	}
}
//Busca el password
export async function getPassword(id) {
	const auth: any = await Auth.findOne({
		where: { id: id },
	});

	if (auth) {
		const password = getSHA256ofString(auth.password);
		return password;
	} else throw "Auth Not found";
}
//Actualiza la contraseña
export async function updatePassword(user) {
	let newPassword = 10000 + Math.floor(Math.random() * 99999).toString();

	if (user.email && newPassword && user.id) {
		const passwordHasheado = getSHA256ofString(newPassword);
		const updateDataComplete = {
			user_id: user.id,
			email: user.email,
			password: passwordHasheado,
		};
		await Auth.update(updateDataComplete, { where: { user_id: user.id } });
		return newPassword;
	} else {
		throw "Faltan Datos del auth";
	}
}
