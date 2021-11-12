import { añadirElementos } from "./controller";
import { state } from "../../state";
const imagenURL = require("url:../img/picture.png");
const lapizURL = require("url:../img/lapiz.png");

export function init() {
	class cardReportedPet extends HTMLElement {
		constructor() {
			super();
			this.render();
		}

		render() {
			const shadow = this.attachShadow({ mode: "open" });
			const div = document.createElement("div");

			const style = document.createElement("style");

			div.innerHTML = `
        <div class="contenedor"></div>
        <h1 class="no__pets"></h1>
         <template id="card-template">
         <div class="card">
        <a><img class="imagen" src=${imagenURL}></a>
        <div class="info-container" >
        <div class="info" >
        <custom-text class="name" variant="title"></custom-text>
        <custom-text  class="search" variant="body"></custom-text>
        </div>
        <a><img class="imagenLapiz" src=${lapizURL}></a>
        </div>
        </div>
        </template>
      
      `;
			style.innerHTML = ` 
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
        margin-left:2px;
    }



        `;
			const cs = state.getState();
			const listaPets = cs.pets;
			shadow.appendChild(div);
			shadow.appendChild(style);
			const noPetsEl = shadow.querySelector(".no__pets");
			if (listaPets.length < 1) {
				noPetsEl.textContent = "NO HAY PETS REPORTADAS";
			} else {
				noPetsEl.textContent = "";
				listaPets.forEach((element) => {
					añadirElementos(div, element);
				});
			}

			const edit = shadow.querySelectorAll(".imagenLapiz");
			edit.forEach((element) => {
				element.addEventListener("click", (res) => {
					const event = new CustomEvent("edit", {
						detail: {
							id: element.id,
						},
					});
					this.dispatchEvent(event);
				});
			});
		}
	}

	customElements.define("reported-pet", cardReportedPet);
}
