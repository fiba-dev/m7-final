import { state } from "../../state";
import { headerLinks } from "../../components/header/controller";

export function inputEmail(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	const cs = state.getState();
	div.className = "intro";
	//html
	div.innerHTML = `
  <custom-header class="header"></custom-header>

  <div class="body-intro">
  <h1 class="titulo">INGRESAR</h1>
  <input-text id="input" type="email">Email</input-text>
    <button-pink class="boton">Siguiente</button-pink>
  </div>
 
    
    `;
	//style
	style.innerHTML = `
  body {
    margin: 0px;
  }
  
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
    
  }
  .header-main {
    width: 100%;
    min-height: 100px;
    color: black;
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
	const btn = div.querySelector(".boton");

	const input = div.querySelector("#input");
	input.addEventListener("awesome", (res: any) => {
		cs.email = res.detail.text;
	});

	btn.addEventListener("click", (boton1) => {
		state.validateEmail((res) => {
			if (cs.emailCheck == true) params.goTo("/input-password");
			if (cs.emailCheck == false) params.goTo("/create-user");
		});
	});

	return div;
}
