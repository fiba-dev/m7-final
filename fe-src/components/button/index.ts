export function init() {
  class BotonBlue extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const button = document.createElement("button");
      button.textContent = this.textContent;
      const style = document.createElement("style");
      button.className = "boton";

      style.innerHTML = ` 
    .boton{
      
      font-family: "Indie Flower";
      
        background: rgba(255, 157, 245, 1);
        border-radius: 5px;
        width: 320px;
        height: 50px;
        font-size: 30px;
        margin-top:30px;
      
    }
    .boton:hover {
      background-color: rgba(184, 47, 236 );
      color: white;
 }
         

    `;

      shadow.appendChild(button);
      shadow.appendChild(style);
    }
  }

  customElements.define("button-pink", BotonBlue);
}
