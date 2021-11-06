import { initRouter } from "../../router";
import { state } from "../../state";
import { headerLinks } from "../../components/header/controller";

export function editUser(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	const cs = state.getState();
	console.log(cs);

	//html
	div.innerHTML = `
  <custom-header class="header"></custom-header>

  <div class="body-intro">
  <h1 class="titulo">Mis Datos</h1>
  <input-text id="name">Nombre</input-text>
  <input-text id="password">Contraseña</input-text>
  <input-text id="password-two">Repetir Contraseña</input-text>
  
    <button-pink class="boton">Registrar</button-pink>
    
  </div>
 
    
    `;
	//style
	style.innerHTML = ` .body-intro {
  
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0%;
    
    align-content: center;
  
    align-items: center;
  }
  .boton{
    margin-top:30px;
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
  .link{
    font-size:25px;
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
	const header = div.querySelector(".header");
	header.addEventListener("click", () => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		}
	});
	const btn = div.querySelector(".boton");
	const name = div.querySelector("#name");
	name.addEventListener("awesome", (res: any) => {
		cs.fullName = res.detail.text;
	});
	const password = div.querySelector("#password");
	password.addEventListener("awesome", (res: any) => {
		cs.password = res.detail.text;
	});
	const passwordTwo = div.querySelector("#password-two");
	passwordTwo.addEventListener("awesome", (res: any) => {
		cs.passwordTwo = res.detail.text;
	});

	btn.addEventListener("click", (boton1) => {
		if (cs.password == cs.passwordTwo) {
			state.editUser((res) => {
				params.goTo("/welcome");
				window.alert("creado con exito");
			});
		} else {
			window.alert("Las contraseñas no coinciden");
			params.goTo("/create-user");
		}
	});
	return div;
}
