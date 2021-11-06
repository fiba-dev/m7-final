import { state } from "../../state";
import { initRouter } from "../../router";

//funcion que contiene los link de redireccionamiento del header
export function headerLinks(params, div) {
  const cs = state.getState();

  const header = div.querySelector(".header");
  header.addEventListener("inicio", (res) => {
    if (cs.userKey == "") {
      params.goTo("/input-email");
    } else {
      params.goTo("/welcome");
    }
  });
  const report = div.querySelector(".header");
  report.addEventListener("report", (res) => {
    if (cs.userKey == "") {
      params.goTo("/input-email");
    } else {
      params.goTo("/report-pet");
    }
  });
  const reported = div.querySelector(".header");
  reported.addEventListener("reported", (res) => {
    if (cs.userKey == "") {
      params.goTo("/input-email");
    } else {
      state.getReportedPet((res) => {
        params.goTo("/reported-pet");
      });
    }
  });
  const misDatos = div.querySelector(".header");

  misDatos.addEventListener("misDatos", (res) => {
    params.goTo("/create-user");
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
