import { Model, DataTypes, where, STRING } from "sequelize";
import * as dotenv from "dotenv";
import { sequelize } from "./models/conn";
import * as express from "express";
import * as path from "path";
import { index } from "./lib/algolia";
import * as jwt from "jsonwebtoken";
import {
	findUser,
	findEmailUserById,
	reportPet,
	updateProfile,
	AllPetsFromUser,
	createUser,
	checkEmail,
	findUserforEmail,
} from "./controllers/users-controllers";
import {
	createAuth,
	getPassword,
	signin,
	updateAuth,
	updatePassword,
} from "./controllers/auth-controllers";
import {
	updatePet,
	MascotasCercanas,
	findPet,
	deletePet,
} from "./controllers/pets-controllers";
import { User, Pet, Auth } from "./models";

import { searchPet, algoliaPet } from "./controllers/algolia-controllers";
import {
	sendEmailNewPassword,
	sendEmailPetInfo,
} from "./controllers/sengrid-controllers";
let cors= require("cors")
const app = express();
app.use(express.static("dist"));
app.use(cors())
const port = process.env.PORT || 3003;
const secret = "hola a todos";
app.use(express.json({ limit: "50mb" }));

const result = dotenv.config();

//email check---------

app.get("/email",async (req, res) => {
	const email = req.query.email;

	const validate = await checkEmail(email);
	res.json(validate);
});

//signup---------
app.post("/auth", async (req, res) => {
	const user = await createUser(req.body);
	const auth = await createAuth(user, req.body.password);

	res.json(auth);
});

//signin---------
app.post("/auth/token", async (req, res) => {
	const token = await signin(req.body).catch((e) => {
		res.json(false);
	});
	res.json({ token });
});
//GetPassword-----
app.get("/user/password", async (req, res) => {
	if (req.query.email) {
		const user: any = await findUserforEmail(req.query.email);

		const update = await updatePassword(user);
		const email = await sendEmailNewPassword(user.email, update);

		res.json(update);
	} else throw "EMAIL ERROR";
});
//middleware---------
function authMiddleware(req, res, next) {
	const token = req.headers.authorization.split(" ")[1];

	try {
		const data = jwt.verify(token, secret);

		req._user = data;
		next();
	} catch (e) {
		res.status(401).json({ error: true });
	}
}

//Pets Cercanas---------
app.get("/pets-cerca-de", async (req, res) => {
	let hits = await searchPet(req.query);

	let pets = await MascotasCercanas(hits);

	res.json(pets);
});
//report info de pet---------
app.post("/user/report-info", async (req, res) => {
	const { id } = req.body;

	const pet: any = await findPet(id);

	const userEmail: any = await findEmailUserById(pet.userId);

	if (userEmail) {
		const email = sendEmailPetInfo(userEmail, req.body);
		res.json(email);
	} else {
		res.json("EMAIL NOT FOUND");
	}
});
//Mascotas Reportadas por mi---------
app.get("/me/reported", authMiddleware, async (req, res) => {
	const userId = await findUser(req.query.email);

	const pets = await AllPetsFromUser(userId);

	res.json(pets);
});

//reportar mascota---------
app.post("/user/report", authMiddleware, async (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "faltan datos en el body",
		});
	}
	const userId = await findUser(req.body.email);
	const petReported = await reportPet(userId, req.body);
	const pet = await algoliaPet(petReported);

	await index.saveObject(pet).catch((error) => {});

	res.json(true);
});
//editar mascota Reportada
app.post("/pet/edit", authMiddleware, async (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "Faltan datos de la Pet",
		});
	}
	const userId = await findUser(req.body.email);
	const newPet = await updatePet(userId, req.body);

	res.json(newPet);
});
//borrar pet---------
app.delete("/user/pet", authMiddleware, async (req, res) => {
	const pets = await Pet.findOne({
		where: { id: req.query.id },
	});
	deletePet(pets, req.query.id);

	res.json(true);
});
//Editar usuario---------
app.post("/user/edit", authMiddleware, async (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "faltan datos en el body",
		});
	}
	const userId = await findUser(req.body.email);
	const updatedData = await updateProfile(userId, req.body);
	const updatePass = await updateAuth(userId, req.body);

	res.json(updatedData);
});
const staticDirPath = path.resolve(__dirname, "../");
app.use(express.static(staticDirPath));
app.get("*", function (req, res) {
	res.sendfile(staticDirPath + "/index.html");
});

app.listen(port, () => {
	console.log("Todo OK");
});
