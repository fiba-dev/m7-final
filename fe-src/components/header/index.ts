import { reportedPet } from "../../pages/reportedPets";
import { state } from "../../state";
import { initRouter } from "../../router";
import { abrirCerrarVentanas } from "./controller";

const garraURL = require("url:../img/garra.png");
export function init() {
  const cs = state.getState();

  class Headercustom extends HTMLElement {
    constructor() {
      super();

      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("header");
      let login = "";
      let email = "";
      if (cs.email == "") {
        login = "login";
      }
      if (cs.email != "" && cs.userKey != "") {
        console.log("CSDENTRO DEL IF", cs);

        email = cs.email;
        login = "cerrar sesión";
      }
      const style = document.createElement("style");
      div.innerHTML = `
      <div class="ventana"> 
        <button class="boton__cerrar">X</button>
        <div class="ventana__vinculos"> 
            <a  id="mis-datos" class=" mis-datos ventana__label">Mis Datos</a>
            <a id="reported-pet" class="reported-pet ventana__label" >Mis mascotas reportadas</a>
            <a id="report-pet" class="report-pet ventana__label" >Reportar mascota</a>
            <h2 class="ventana__email">${email}</h2>
            <a id="cerrar-sesion" class="cerrar__sesion ventana__label">${login}</a>
            </div>
      
      </div>
 <div class="header" >  
 <div id="inicio" class="inicio">
 <img src=${garraURL} class="header__logo">
<a id="inicio"  class="header__incio">Inicio</a>
</div>
 
   <div class="header__vinculos"> 
     <button class="header__menu-button">Menu</button>
     <a  id="mis-datos"  class=" violeta mis-datos header__label">Mis datos</a>
     <a id="reported-pet" class=" rosa reported-pet header__label">Mis mascotas reportadas</a>
     <a id="report-pet" class=" violeta2 report-pet header__label">Reportar mascotas</a>
     <div class="div__sesion header__label">
     <h4 class="header__email">${email}</h4>
     <a id="cerrar-sesion" class="cerrar__sesion header__label ">${login}</a>
     </div>
    </div>
 

</div>

 
 


        `;
      style.innerHTML = `

      .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-content: center;
        min-height: 100px;
        align-items: center;
       
      }
      .violeta{
        color:rgb(241, 196, 255 );

      }
      .rosa{
        color:rgba(255, 157, 245, 1);
      }
      .violeta2{
       color:rgba(184, 47, 236 );
      }
      .ventana__email{
        font-family: 'Indie Flower';
        font-size: 30px;
      }
     
      .inicio {
        display: flex;
        flex-direction: column;
      }
      .header__incio {
        text-decoration: none;
        margin-left: 17px;
        text-align: center;
      
        font-family: "Indie Flower";
        font-size: 24px;
      }
      
      .header__logo {
        width: 40px;
        height: 40px;
        font-size: 38px;
        font-family: "Indie Flower";
      
        align-items: center;
        margin-top: 18px;
        margin-left: 17px;
      }
      .header__label {
        display: none;
        text-decoration: none;
      }
      
      .titulo {
        width: 200px;
        line-height: 48px;
        align-self: center;
      
        font-family: "Indie Flower";
        font-size: 45px;
      
        text-align: center;
        margin-bottom: 58px;
      }
      
      
      .header__menu-button {
        border: none;
      
        background: none;
        font-family: "Indie Flower";
        height: 100px;
        width: 100px;
        font-size: 40px;
        margin-top: 20px;
        margin-right: 20px;
      }
      .ventana {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: rgb(241, 196, 255 );
      
        display: none;
      }
      .ventana__label {
        color: black;
        text-align: center;
        border: solid;
      
        margin-bottom: 10px;
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
      .ventana__vinculos {
        margin-top: 58px;
        min-height: 475px;
        display: flex;
        flex-direction: column;
        align-items: center;
      
        justify-content: center;
      }
      .ventana__label {
        font-size: 40px;
        font-family: "Indie Flower";
        text-decoration: none;
      }
      .cerrar__sesion{
        color: red;
    text-decoration-line: underline;
    font-family: 'Indie Flower';
    font-size: 20px;
      }
      @media (min-width: 1080px) {
        
        
        .header__incio {
          font-size: 36px;
          
        }
        .header__menu-button {
          display: none;
        }
        .header__logo {
          width: 60px;
          height: 60px;
          align-items: center;
          margin-top: 36px;
        
        }
        .header {
          display: flex;
          justify-content: space-between;
          min-width: 375px;
          align-content: space-around;
          flex-wrap: wrap;
          align-items: center;
        }
        .header__email{

          font-size: 15px;
          font-family: "Indie Flower";
          font-weight: 700;
          color: black;
          margin-right:5px;

        }
        .header__vinculos {
          display: flex;
      
          min-width: 600px;
          height: 150px;
          align-content: stretch;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-around;
          align-items: center;
        }
        .header__label {
          display: flex;
          font-size: 36px;
          font-family: "Indie Flower";
          font-weight: 700;
         
          margin-right:25px;
        }
      
        
        .imagen-perfil {
          height: 435px;
          margin-right: 84px;
        }
        .titulo {
          height: 160px;
          width: 291px;
          line-height: 58px;
          letter-spacing: -1px;
      
          font-family: "Indie Flower";
          font-size: 58px;
      
          text-align: center;
          margin-top: 80px;
        }
        .div__sesion{
          flex-direction: column;
        }
        .cerrar__sesion{
          color: red;
      text-decoration-line: underline;
      font-family: 'Indie Flower';
      font-size: 15px;
        }
      }
      
          
          `;

      shadow.appendChild(div);
      shadow.appendChild(style);
      const inicio = shadow.querySelector("#inicio");
      const reportPet = shadow.querySelectorAll(".report-pet");
      const reportedPet = shadow.querySelectorAll(".reported-pet");
      const misDatos = shadow.querySelectorAll(".mis-datos");
      const sesion = shadow.querySelectorAll("#cerrar-sesion");
      sesion.forEach((element) => {
        element.addEventListener("click", (res) => {
          let result = window.confirm("Seguro que desea Cerrar sesión?");
          if (result == true) {
            cs.userKey = "";
          }
        });
      });

      inicio.addEventListener("click", (res) => {
        const event = new CustomEvent("inicio");
        this.dispatchEvent(event);
      });

      reportedPet.forEach((element) => {
        element.addEventListener("click", (res) => {
          const event = new CustomEvent("reported");
          this.dispatchEvent(event);
        });
      });
      reportPet.forEach((element) => {
        element.addEventListener("click", (res) => {
          const event = new CustomEvent("report");
          this.dispatchEvent(event);
        });
      });
      misDatos.forEach((element) => {
        element.addEventListener("click", (res) => {
          const event = new CustomEvent("misDatos");
          this.dispatchEvent(event);
        });
      });

      abrirCerrarVentanas(shadow);
    }
  }

  customElements.define("custom-header", Headercustom);
}
