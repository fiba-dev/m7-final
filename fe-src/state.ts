import * as _ from "lodash";

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
		const currentState: any = JSON.parse(localStorage.getItem("state"));

		console.log("soy el localstorage", currentState);
		if (currentState) state.setUser(currentState);
	},
	//Verifica si es un Email existente
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
	//Crea un usuario
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
	//Inicia sesion y devuelve un token para identificar al usuario
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
				state.saveToken(cs);
				if (callback) callback();
			});
	},
	//Edita datos del usuario Nombre Email y Password
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
	//Obtiene la pet a travez de la id y la guarda en un objeto pet del State
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
	//Elimina la publicacion seleccionada
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
	//Modifica la publicacion seleccionada Ubicacion Nombre y foto
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
		} else throw "Pet Not Found";
	},
	// solicita que le reinicien la password
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
	//Reporta Informacion de la Mascota seleccionada
	reportPetInfo(callback) {
		const cs = this.getState();

		fetch("/user/report-info", {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				id: cs.petInfo.id,
				donde: cs.petInfo.donde,
				name: cs.petInfo.name,
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
	//Muestra las mascotas cercanas a la ubicacion del usuario
	petCercanas(callback) {
		const cs = this.getState();

		fetch("/pets-cerca-de" + "?lat=" + cs.userLat + "&lng=" + cs.userLng, {
			headers: {
				"content-type": "application/json",
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
	//publica una mascota perdida
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
	//Obtiene las mascotas reportadas por el usuario
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
	},
	setUser(user) {
		(this.data.fullName = user.fullName),
			(this.data.userKey = user.userKey),
			(this.data.email = user.email);
	},
	saveToken(state) {
		localStorage.setItem("state", JSON.stringify(state));
	},
	cerrarSesion() {
		this.data.userKey = "";
		localStorage.removeItem("state");
	},
};

export { state };
