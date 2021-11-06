import { initRouter } from "../../router";
import { headerLinks } from "../../components/header/controller";
import { state } from "../../state";

export function inputPassword(params) {
	const div = document.createElement("div");
	const style = document.createElement("style");
	const cs = state.getState();
	//html
	div.innerHTML = `
  <custom-header class="header"></custom-header>

  <div class="body-intro">
  <h1 class="titulo">INGRESAR</h1>
  <input-text id="input">Contraseña</input-text>
  <a class="link">Olvide Mi contraseña</a>
    <button-pink class="boton">Ingresar</button-pink>
    
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
    color: red;
    text-decoration-line: underline;
    font-family: 'Indie Flower';
    
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
	let form = div.querySelector("#input");
	let btn = div.querySelector(".boton");
	let lostPassword = div.querySelector(".link");
	lostPassword.addEventListener("click", (res) => {
		let result = window.confirm(
			`Desea Recibir una nueva contraseña en su Email:${cs.email}?`
		);
		if (result == true) {
			state.getPassword((res) => {
				window.alert("Se envio un correo con su contraseña");
				params.goTo("/welcome");
			});
		} else {
		}
	});
	form.addEventListener("awesome", (res: any) => {
		cs.password = res.detail.text;
	});
	const header = div.querySelector(".header");
	header.addEventListener("click", () => {
		if (cs.userKey == "") {
			params.goTo("/input-email");
		}
	});
	btn.addEventListener("click", (boton1) => {
		state.signin((res) => {
			if (cs.userKey == undefined || cs.userKey == "") {
				window.alert("contraseña Incorrecta");
				params.goTo("/input-password");
			} else {
				params.goTo("/welcome");
				window.alert("Acceso Correcto");
			}
		});
	});
	return div;
}
