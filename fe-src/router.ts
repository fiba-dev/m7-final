import { editUser } from "./pages/editUser";
import { initWelcome } from "./pages/welcome";
import { editPet } from "./pages/editPet";
import { inputEmail } from "./pages/email";
import { reportedPet } from "./pages/reportedPets";
import { inputPassword } from "./pages/password";
import { createUser } from "./pages/createUser";
import { reportPet } from "./pages/reportPet";

export function initRouter(container: Element) {
	function goTo(path) {
		history.pushState({}, "", path);
		handleRoute(path);
	}

	function handleRoute(route) {
		const contenedorEl = document.querySelector(".contenedor");
		const routes = [
			{
				path: /\//,
				component: initWelcome,
			},

			{ path: /\/create-user/, component: createUser },
			{ path: /\/edit-user/, component: editUser },
			{ path: /\/welcome/, component: initWelcome },
			{ path: /\/edit-pet/, component: editPet },
			{ path: /\/input-email/, component: inputEmail },
			{ path: /\/reported-pet/, component: reportedPet },
			{ path: /\/input-password/, component: inputPassword },
			{ path: /\/report-pet/, component: reportPet },
		];
		for (const i of routes) {
			if (i.path.test(route)) {
				const el = i.component({ goTo: goTo });

				if (container.firstChild) {
					container.firstChild.remove();
				}
				container.appendChild(el);
			}
		}
	}
	handleRoute(location.pathname);
	window.onpopstate = function () {
		handleRoute(location.pathname);
	};
}
