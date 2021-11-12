import { abrirCerrarVentanas, añadirElementos } from "./controller";
import { reportedPet } from "../../pages/reportedPets";
import { state } from "../../state";
const imagenURL = require("url:../img/picture.png");
const lapizURL = require("url:../img/lapiz.png");

export function init() {
	class cardNearbyPet extends HTMLElement {
		constructor() {
			super();
			this.render();
		}

		render() {
			const shadow = this.attachShadow({ mode: "open" });
			const div = document.createElement("div");

			const cs = state.getState();

			const style = document.createElement("style");

			div.innerHTML = `
      <div class="ventana"> 
      <button class="boton__cerrar">X</button>
      <form class="ventana__info"> 
      <custom-text class="ventana__name" variant="title">Reportar Informacion</custom-text>
      <input-text id="name">Nombre</input-text>
      <input-text id="telefono">Telefono</input-text>
      <input-text id="donde">Donde Lo viste</input-text>
      <button-pink class="boton">Enviar</button-pink>
          
          </form>
    
    </div>
        <div class="contenedor"></div>
        <h2 class="no__pets"><h2>
         <template id="card-template">
         <div class="card">
        <a><img class="imagen" src=${imagenURL}></a>
        <div class="info-container" >
        <div class="info" >
        <custom-text class="name" variant="title">Boby</custom-text>
        <custom-text  class="search" variant="body">Nuñes</custom-text>
        </div>
        <a class="send" >Reportar Informacion</a>
        </div>
        </div>
        </template>
      
      `;
			style.innerHTML = ` 
      .name{
        height: 60px;
        overflow: hidden;
      }
      .no__pets{
        font-family: "Indie Flower";
        font-size: 60px;
        color:rgb(241, 196, 255 );
        text-align: center;
      }
        .card{
            width:335px;
            height:234px;
            display:flex;
            flex-direction:column;
            margin-bottom:15px;
            border:solid 2px;

        }
        .ventana__info{
          display: flex;
          flex-direction: column;
          align-items: center;
          height:100vh;
          justify-content: center;
        }
        .boton__cerrar {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 60px;
          width: 50px;
          height: 50px;
          background-color: rgb(241, 196, 255 );
          color: black;
          border: none;
          font-family: "Indie Flower";
        }
        .ventana {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0px;
          bottom:0px;
          left:0px;
          right:0px;
          background-color: rgb(241, 196, 255 );
        
          display: none;
        }
     .imagen{
         width:331px;
         height:147px;

     }
     .info-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .info{
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        height:60px;
        overflow: hidden;
    }



        `;

			const listaPets = cs.pets;

			shadow.appendChild(div);
			shadow.appendChild(style);
			const noPetsEl = shadow.querySelector(".no__pets");
			if (listaPets.length < 1) {
				noPetsEl.textContent = "NO HAY PET CERCANAS";
			} else {
				noPetsEl.textContent = "";
				listaPets.forEach((element) => {
					añadirElementos(div, element);
				});
			}

			const info = shadow.querySelectorAll(".send");

			const nameEl = div.querySelector("#name");
			nameEl.addEventListener("awesome", (res: any) => {
				cs.petInfo.name = res.detail.text;
			});
			const telefonoEl = div.querySelector("#telefono");
			telefonoEl.addEventListener("awesome", (res: any) => {
				cs.petInfo.telefono = res.detail.text;
			});
			const dondeEl = div.querySelector("#donde");
			dondeEl.addEventListener("awesome", (res: any) => {
				cs.petInfo.donde = res.detail.text;
			});
			abrirCerrarVentanas(shadow);
			info.forEach((element) => {
				element.addEventListener("click", (res) => {
					cs.petInfo.id = element.id;
				});
			});
			const botonEl = shadow.querySelector(".boton");
			botonEl.addEventListener("click", (res) => {
				const event = new CustomEvent("info");
				this.dispatchEvent(event);
			});
		}
	}
	customElements.define("nearby-pet", cardNearbyPet);
}
