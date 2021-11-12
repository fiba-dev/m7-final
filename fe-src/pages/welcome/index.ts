import {
	obtenerUbicacion,
	initMap,
	Ubicacion,
} from "../../components/map/controller";
import { initRouter } from "../../router";
import { headerLinks } from "../../components/header/controller";
import { state } from "../../state";
import { init } from "../../components/text";
import { reportinfo } from "../../components/cardNearbyPet/controller";

export function initWelcome(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	//html
	div.className = "intro";
	div.id = "start";
	div.innerHTML = `
    <custom-header class="header"></custom-header>

      <div class="body-intro">
        <h1 class="titulo">Mascotas perdidas cerca tuyo</h1>
        <button-pink class="boton">Dar mi ubicacion</button-pink>
        <nearby-pet class="pet"></nearby-pet>
      </div>
     
    `;
	//style

	style.innerHTML = ` 
    
  * {
  box-sizing: border-box;
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
.pet{
  margin-top:20px;
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
    height: 100vh;
    align-self: inherit;
    align-items: center;

    align-content: center;
    flex-wrap: nowrap;
  }
}














    `;

	div.appendChild(style);
	const header = div.querySelector(".header");

	headerLinks(params, div);
	//boton para navegar a la siguiente pagina donde da instrucciones "/play"
	const petEl = div.querySelector(".pet");
	reportinfo(petEl, params);
	const cs = state.getState();
	const btn: any = div.querySelector(".boton");

	if (cs.userLat != "" && cs.userLng != "") {
		btn.style = "display:none";
	} else {
		btn.style = "display:inherit";
	}

	btn.addEventListener("click", (res) => {
		navigator.geolocation.getCurrentPosition((res) => {
			cs.userLat = res.coords.latitude;
			cs.userLng = res.coords.longitude;
			state.petCercanas(() => {
				const listaPets = cs.pets;
				params.goTo("/welcome");
			});
		});
	});

	return div;
}
