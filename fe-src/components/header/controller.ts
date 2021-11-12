import { state } from "../../state";
import { initRouter } from "../../router";

//funcion que contiene los link de redireccionamiento del header
export function headerLinks(params, div) {
	const cs = state.getState();
	const header = div.querySelector(".header");

	header.addEventListener("sesion", (res) => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		} else {
			let result = window.confirm("Seguro que desea Cerrar sesión?");
			if (result == true) {
				cs.userKey = "";
				params.goTo("/welcome");
			}
		}
	});
	header.addEventListener("inicio", (res) => {
		params.goTo("/welcome");
	});

	header.addEventListener("report", (res) => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		} else {
			params.goTo("/report-pet");
		}
	});

	header.addEventListener("reported", (res) => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		} else {
			state.getReportedPet((res) => {
				params.goTo("/reported-pet");
			});
		}
	});

	header.addEventListener("misDatos", (res) => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		} else {
			state.getReportedPet((res) => {
				params.goTo("/create-user");
			});
		}
	});
}
//abre y cierra el menu del header
export function abrirCerrarVentanas(shadow) {
	const abrirVentanaEl = shadow.querySelector(".header__menu-button");
	const cerrarVentanaEl = shadow.querySelector(".boton__cerrar");
	const ventana: any = shadow.querySelector(".ventana");
	abrirVentanaEl.addEventListener("click", () => {
		ventana.style.display = "inherit";
	});
	cerrarVentanaEl.addEventListener("click", () => {
		ventana.style.display = "none";
	});
}
