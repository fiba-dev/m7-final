import { sgMail } from "../lib/sengrid";
//Envia un Email
export async function sendEmailPetInfo(email, data) {
	const { name, telefono, donde } = data;

	const msg = {
		to: email, // Change to your recipient
		from: "fibarrola06@gmail.com", // Change to your verified sender
		subject: name + " tiene informacion de tu mascota",
		text: "and easy to do anywhere, even with Node.js",
		html: `<strong>${name} tiene informacion de tu mascota ->${donde} y su telefono es ->${telefono}</strong>`,
	};

	if (msg) {
		sgMail
			.send(msg)
			.then(() => {
				throw "Email send";
			})
			.catch((error) => {
				console.error(error);
			});
		return true;
	}
}
export async function contacto(data) {
	console.log("soy data antes de salir", data);

	const { name, telefono, donde } = data;

	const msg = {
		to: "fibarrola06@gmail.com", // Change to your recipient
		from: telefono, // Change to your verified sender
		subject: name + "se quiere contactar contigo",
		text: "and easy to do anywhere, even with Node.js",
		html: `<strong>${name} se contacta con vos  ->${donde} y su email es ->${telefono}</strong>`,
	};

	if (msg) {
		sgMail
			.send(msg)
			.then(() => {
				throw "Email send";
			})
			.catch((error) => {
				console.error("este es el error", error);
			});
		return true;
	}
}
export async function sendEmailNewPassword(email, data) {
	const msg = {
		to: email, // Change to your recipient
		from: "fibarrola06@gmail.com", // Change to your verified sender
		subject: " Password Actualizado",
		text: "PASSWORD ACTUALIZADO",
		html: `<strong> Su nueva contraseña es -->${data}</strong>`,
	};

	if (msg) {
		sgMail
			.send(msg)
			.then(() => {
				console.log("Email sent");
			})
			.catch((error) => {
				console.error(error);
			});
		return true;
	}
}
