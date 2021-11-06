import { state } from "../../state";
import { UploadPicture } from "./controller";
let pictureURL = require("url:../img/picture.png");

export function init() {
  class PutPicture extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const uploadImg = document.createElement("form");

      const style = document.createElement("style");
      uploadImg.className = "form";

      uploadImg.innerHTML = `
       <a class="profile-picture-container"> 
       <img  id="dropzone" class="profile-picture " src=${pictureURL}> 
       </a>
      <br />
      <div>
      </div>
    `;
      style.innerHTML = `
      .form{
          display:flex;
          flex-direction: column;
          align-items: center;   
      }
      .profile-picture{
          height:142px;
          width:320px;
      }
        
  `;
      shadow.appendChild(uploadImg);
      shadow.appendChild(style);
      UploadPicture(shadow);
    }
  }
  customElements.define("put-picture", PutPicture);
}
