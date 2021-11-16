import { initRouter } from "../../router";
import { state } from "../../state";
import { headerLinks } from "../../components/header/controller";
import { getTsBuildInfoEmitOutputFilePath } from "typescript";

export function editPet(params) {
	const cs = state.getState();

	const div = document.createElement("div");
	const style = document.createElement("style");
	//html
	div.className = "intro";
	div.id = "start";
	div.innerHTML = `
     <custom-header class="header"></custom-header>
     <div class="body-intro">
        <h1 class="titulo">Editar mascota perdida</h1>
       <input-text id="name">${cs.pet.name}</input-text>
        <put-picture id="img" src=${cs.pet.imagen}>${cs.pet.imagen}</put-picture>
        <put-location id="loc"></put-location>
        <custom-text  class="texto" variant="body"> Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</custom-text>
        <button-pink class="boton">Guardar</button-pink>
        <button class="boton2">Reportar como encontrado</button>
        <a  id="borrar" class="despublicar">Despublicar</a>
       
      </div>
       
    `;
	//style

	style.innerHTML = ` 
    
 

.texto{
    margin-top:5px;
    width:320px;
}
.despublicar{
    margin-top:20px;
    color:red;
    margin-bottom:20px;
}
.boton2 {
      
    font-family: "Indie Flower";
    
    background: rgb(241, 196, 255 );

      border-radius: 5px;
      width: 320px;
      height: 50px;
      font-size: 20px;
      margin-top:20px;
      
    
  }
  .boton2:hover {
    background-color: rgba(44, 36, 219 );
    color: white;
}
/*intro*/
.body-intro {
  
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0%;
  
  align-content: center;

  align-items: center;
}
.intro {
  min-height: 616px;
  
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0%;
  padding: 0%;
  justify-content: space-between;
  align-content: center;
  align-items: stretch;
}
.header-main {
  width: 100%;
  min-height: 100px;
  color: black;
}

.map {
  margin-bottom: 15px;
  height: 400px;
  width: 80vh;
  align-self: center;
}

.titulo {
  height: 200px;
  width: 300px;
    line-height: 60px;
    letter-spacing: -1px;
    font-family: "Indie Flower";
    font-size: 60px;
    text-align: center;
    
    color: rgba(184, 47, 236 );
}
@media (min-width: 1080px) {
  .intro {
    margin-bottom: 0%;

    min-height: 616px;

    align-content: space-between;

    align-items: stretch;
  }
  
  .body-intro {
    display: flex;
    justify-content: space-between;
    justify-content: center;
    flex-direction: column;
   
    align-self: inherit;
    align-items: center;

    align-content: center;
    flex-wrap: nowrap;
  }
}
 `;

	div.appendChild(style);
	headerLinks(params, div);
	const actualizado = pet(cs, div);

	let nameEl = div.querySelector("#name");
	let botonEl = div.querySelector(".boton");
	const header = div.querySelector(".header");
	const del = div.querySelector("#borrar");
	header.addEventListener("click", () => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		}
	});
	let loc = div.querySelector("#loc");
	loc.addEventListener("change", (res: any) => {
		cs.pet.lat = res.detail.text[0];
		cs.pet.lng = res.detail.text[1];
		cs.pet.search = res.detail.search;
	});
	botonEl.addEventListener("click", (res: any) => {
		cs.pet.imagen = cs.fileshadow;

		state.editReportedPet(cs.pet.id, (res) => {});
	});
	nameEl.addEventListener("awesome", (res: any) => {
		cs.pet.name = res.detail.text;
	});

	del.addEventListener("click", (res) => {
		let result = window.confirm("Seguro que quiere borrar la publicacion?");
		if (result == true) {
			state.deletePet(cs.pet.id, (ress) => {
				if (cs.deleted == true) {
					window.alert("Borrado Con Exito");
					state.getReportedPet((res) => {
						params.goTo("/reported-pet");
					});
				}
			});
		} else {
			window.alert("No se borro");
		}
	});

	return div;
}
function pet(currentPet, div) {
	let nameEl = div.querySelector("#name");
	nameEl.textcontent = currentPet.pet.name;
	return true;
}
