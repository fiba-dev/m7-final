import Dropzone from "dropzone";
import { state } from "../../state";
export function UploadPicture(shadow) {
  const form = shadow.querySelector(".form");
  const buttonEl = shadow.querySelector(".form");
  const img = shadow.querySelector(".profile-picture");
  const pictureContainer = form.querySelector("#dropzone");
  let pictureFile;
  const myDropzone = new Dropzone(pictureContainer, {
    url: "/falsa",
    clickeable: true,
    autoProcessQueue: false,
  });
  const cs = state.getState();
  myDropzone.on("thumbnail", function (file) {
    pictureFile = file.dataURL;
    pictureContainer.src = file.dataURL;

    cs.fileshadow = pictureFile;
  });
}
