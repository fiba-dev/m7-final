export function init() {
  class TextComponent extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const variant = this.getAttribute("variant") || "body";
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.textContent = this.textContent;
      const style = document.createElement("style");
      style.innerHTML = `
          .title{
            font-family: "Indie Flower";
            font-size: 40px;
            color: rgba(255, 157, 245, 1);
            font-style: normal;
            font-weight: 700;
            letter-spacing: 0em;
            overflow:hidden;
          }
          .body{
            font-family: "Indie Flower";
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0em;
            overflow:hidden;
          }
        
        
        `;
      div.className = variant;
      shadow.appendChild(div);
      shadow.appendChild(style);
    }
  }
  customElements.define("custom-text", TextComponent);
}
