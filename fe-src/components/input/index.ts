export function init() {
  class Input extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const input = document.createElement("input");
      input.placeholder = this.textContent;

      const style = document.createElement("style");
      input.className = "input";

      style.innerHTML = ` 
      .input{
        font-family: "Indie Flower";
        font-size:30px;
          height:87px;
          width: 320px;
          
          text-align:center;
          
          background: #FFFFFF;
          border: 2px solid ;
          
          box-sizing: border-box;
          border-radius: 5px;
          margin-top:20px;
          margin-bottom:20px
  
      }
           
  
      `;

      shadow.appendChild(input);
      shadow.appendChild(style);
      const ingreso = shadow.querySelector(".input");
      ingreso.addEventListener("input", (res: any) => {
        const event = new CustomEvent(`awesome`, {
          detail: {
            text: res.target.value,
          },
        });

        this.dispatchEvent(event);
      });
    }
  }

  customElements.define("input-text", Input);
}
