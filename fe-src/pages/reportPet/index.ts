import { initRouter } from "../../router";
import { headerLinks } from "../../components/header/controller";
import { state } from "../../state";

export function reportPet(params) {
	const cs = state.getState();
	const div = document.createElement("div");
	const style = document.createElement("style");
	//html
	div.className = "intro";
	div.id = "start";
	div.innerHTML = ` 
    <custom-header class="header"></custom-header>
      <div class="body-intro">
        <h1 class="titulo">Reportar Mascota perdida</h1>
        <input-text id="name">Nombre</input-text>
        <put-picture id="img"></put-picture>
        <put-location id="loc"></put-location>
        <custom-text  class="texto" variant="body"> Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</custom-text>
        <button-pink class="boton">Reportar como Perdido</button-pink>
        <button class="boton-gris">Cancelar</button>
       
      </div>
         
    `;
	//style

	style.innerHTML = ` 

  * {
  box-sizing: border-box;
}
.boton-gris{
      
  font-family: "Indie Flower";
  
  background: rgba(205, 205, 205, 1);

    border-radius: 5px;
    width: 320px;
    height: 50px;
    font-size: 30px;
    margin-top:30px;
  
}
.boton-gris:hover {
  background-color: rgba(57, 60, 59 );
  color: white;
}
.texto{
  width: 320px;

}
    
body {
  margin: 0px;
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


.titulo {
  height: 200px;
  width: 300px;
    line-height: 60px;
    letter-spacing: -1px;
    font-family: "Indie Flower";
    font-size: 60px;
    text-align: center;
    margin-top:30px;
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
	const header = div.querySelector(".header");
	header.addEventListener("click", () => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		}
	});
	let nameEl = div.querySelector("#name");
	let botonEl = div.querySelector(".boton");

	let loc = div.querySelector("#loc");
	loc.addEventListener("change", (res: any) => {
		cs.pet.lat = res.detail.text[1];
		cs.pet.lng = res.detail.text[0];
		cs.pet.search = res.detail.search;
	});

	nameEl.addEventListener("awesome", (res: any) => {
		cs.pet.name = res.detail.text;
	});
	botonEl.addEventListener("click", (res: any) => {
		console.log("agregado");
		cs.pet.imagen = cs.fileshadow;
		cs.pet.name;
		cs.pet.estado = "perdido";
		state.reportPet((res) => {
			state.getReportedPet((res) => {
				params.goTo("/reported-pet");
			});
		});
	});
	return div;
}
