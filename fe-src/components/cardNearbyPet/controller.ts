import { symbolName } from "typescript";
import { state } from "../../state";
//Añade elementos del template de mascotas cercanas
export function añadirElementos(list, obj) {
  const template = list.querySelector("#card-template");

  const contenedor = list.querySelector(".contenedor");

  template.content.querySelector(".imagen").src = obj.imagen;
  template.content.querySelector(".search").textContent = obj.search;
  template.content.querySelector(".name").textContent = obj.petName;
  template.content.querySelector(".send").id = obj.id;

  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}
//Funcion que abre y cierra ventanas al darle al boton Info
export function abrirCerrarVentanas(shadow) {
  const abrirVentanaEl = shadow.querySelectorAll(".send");
  const cs = state.getState();
  const cerrarVentanaEl = shadow.querySelector(".boton__cerrar");
  const ventana: any = shadow.querySelector(".ventana");
  abrirVentanaEl.forEach((element) => {
    element.addEventListener("click", () => {
      state.getPet(element.id, (res) => {
        ventana.style.display = "inherit";
      });
    });
  });
  cerrarVentanaEl.addEventListener("click", () => {
    ventana.style.display = "none";
  });
}
//funcion que reporta la info y envia a otra pagina
export function reportinfo(element, params) {
  const cs = state.getState();

  element.addEventListener("info", (res) => {
    cs.petInfo.email = cs.email;
    state.reportPetInfo((res) => {
      params.goTo("/nearby-pet");
    });
  });
}
