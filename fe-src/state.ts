type choose = "piedra" | "papel" | "tijera";
const pictureUrl = require("url:./components/img/picture.png");

import * as _ from "lodash";
// import { rtdb } from "./rtdb";

const state = {
	data: {
		fileshadow: "",
		userKey: "",
		fullName: "",
		emailCheck: "",
		email: "",
		password: "",
		PasswordTwo: "",
		userId: "",
		userLat: "",
		userLng: "",
		deleted: false,
		pet: {
			petId: "",
			imagen: "",
			name: "",
			estado: "",

			lat: "",
			lng: "",
			search: "",
		},
		petInfo: {
			id: "",
			name: "",
			telefono: "",
			donde: "",
			email: "",
		},
		pets: [],
	},
	// init para cuando inicia tome los datos del localstorage
	init() {
		const currentGame = this.getState();

		const localData = localStorage.getItem("saved-state");

		if (JSON.parse(localData) != null)
			currentGame.history = JSON.parse(localData);
	},

	validateEmail(callback) {
		const cs = this.getState();

		fetch("/email" + "?email=" + cs.email)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data == false) {
					cs.emailCheck = false;
				} else {
					cs.emailCheck = true;
				}
				if (callback) callback();
			});
	},
	createUser(callback) {
		const cs = this.getState();

		fetch("/auth", {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				fullName: cs.fullName,
				email: cs.email,
				password: cs.password,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (callback) callback();
			});
	},
	signin(callback) {
		const cs = this.getState();
		fetch("/auth/token", {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				email: cs.email,
				password: cs.password,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data == undefined) return false;
				cs.userKey = data.token;
				if (callback) callback();
			});
	},
	editUser(callback) {
		const cs = this.getState();
		const token = "bearer " + cs.userKey;
		fetch("/user/edit", {
			method: "post",
			headers: {
				"content-type": "application/json",
				authorization: token,
			},
			body: JSON.stringify({
				fullName: cs.fullName,
				email: cs.email,
				password: cs.password,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (callback) callback();
			});
	},
	getPet(id, callback) {
		const cs = this.getState();

		cs.pets.forEach((element) => {
			if (element.id == id) {
				(cs.pet.petId = element.id),
					(cs.pet.imagen = element.imagen),
					(cs.pet.name = element.petName),
					(cs.pet.estado = element.estado),
					(cs.pet.lat = element.loc[0]),
					(cs.pet.lng = element.loc[1]);
				cs.pet.search = element.search;
			}
		});

		if (callback) callback();
	},
	deletePet(id, callback) {
		const cs = this.getState();
		cs.deleted = false;

		const token = "bearer " + cs.userKey;
		fetch("/user/pet?id=" + id, {
			method: "delete",
			headers: {
				authorization: token,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((date) => {
				cs.deleted = date;
				if (callback) callback();
			});
	},
	editReportedPet(id, callback) {
		const cs = this.getState();

		let pet: any = {};
		cs.pets.forEach((element) => {
			if (element.id == id) {
				pet = element;
			}
		});

		if ((cs.pet.estado = "")) {
			cs.pet.estado = pet.estado;
		}

		if (pet != {}) {
			const token = "bearer " + cs.userKey;
			fetch("/pet/edit", {
				method: "post",
				headers: {
					"content-type": "application/json",
					authorization: token,
				},
				body: JSON.stringify({
					id: id,

					name: cs.pet.name,
					loc: [cs.pet.lat, cs.pet.lng],
					search: cs.pet.search,
					imagen: cs.pet.imagen,
					email: cs.email,
					estado: cs.pet.estado,
				}),
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					if (callback) {
						callback();
						return data;
					}
				});
		} else console.log("Pet Not Found");
	},
	getPassword(callback) {
		const cs = state.getState();
		fetch("/user/password" + "?email=" + cs.email, {
			headers: {
				"content-type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (callback) {
					callback();
					return data;
				}
			});
	},
	reportPetInfo(callback) {
		const cs = this.getState();
		const token = "bearer " + cs.userKey;
		fetch("/user/report-info", {
			method: "post",
			headers: {
				"content-type": "application/json",
				authorization: token,
			},
			body: JSON.stringify({
				id: cs.petInfo.id,
				donde: cs.petInfo.donde,
				name: cs.petInfo.name,
				email: cs.email,
				estado: cs.petInfo.estado,
				telefono: cs.petInfo.telefono,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);

				if (callback) {
					callback();
					return data;
				}
			});
	},
	petCercanas(callback) {
		const cs = this.getState();
		console.log("csdepetcercanas", cs);

		const token = "bearer " + cs.userKey;
		fetch("/pets-cerca-de?lat=" + cs.userLat + "&lng=" + cs.userLng, {
			headers: {
				authorization: token,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				cs.pets = data;
				if (callback) callback();
			});
	},
	reportPet(callback) {
		const cs = this.getState();
		const token = "bearer " + cs.userKey;
		fetch("/user/report", {
			method: "post",
			headers: {
				"content-type": "application/json",
				authorization: token,
			},
			body: JSON.stringify({
				name: cs.pet.name,
				loc: [cs.pet.lat, cs.pet.lng],
				search: cs.pet.search,
				imagen: cs.pet.imagen,
				email: cs.email,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (callback) callback();
			});
	},
	getReportedPet(callback) {
		const cs = this.getState();
		const token = "bearer " + cs.userKey;
		fetch("/me/reported?email=" + cs.email, {
			headers: {
				authorization: token,
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				cs.pets = data;
				if (callback) callback();
				return data;
			});
	},
	//retorna toda la data
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;

		localStorage.setItem("state", JSON.stringify(newState));
	},
};

export { state };
