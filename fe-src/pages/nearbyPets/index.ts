import { initRouter } from "../../router";
import { headerLinks } from "../../components/header/controller";
import { state } from "../../state";
import { reportinfo } from "../../components/cardNearbyPet/controller";

export function nearbyPet(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	//html
	div.className = "intro";
	div.id = "start";
	div.innerHTML = `
    
    

    
    <custom-header class="header"></custom-header>

      <div class="body-intro">
        <h1 class="titulo">Mascotas perdidas cerca tuyo</h1>
        <nearby-pet class="pet"></nearby-pet>
      </div>
     
    
    
    
    
    
    `;

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
.intro {
  min-height: 616px;
  height: 100vh;
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
    margin-top: 80px;
    color: rgba(184, 47, 236 );
  margin-top: 80px;
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
	headerLinks(params, div);
	const cs = state.getState();
	const pet = div.querySelector(".pet");
	reportinfo(pet, params);
	const header = div.querySelector(".header");
	header.addEventListener("click", () => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		}
	});
	return div;
}
