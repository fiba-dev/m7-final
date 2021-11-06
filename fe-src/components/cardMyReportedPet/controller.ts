//Añade elementos a los templates de las mascotas Reportadas
export function añadirElementos(list, obj) {
  const template = list.querySelector("#card-template");

  const contenedor = list.querySelector(".contenedor");

  template.content.querySelector(".imagen").src = obj.imagen;
  template.content.querySelector(".search").textContent = obj.search;
  template.content.querySelector(".name").textContent = obj.petName;
  template.content.querySelector(".imagenLapiz").id = obj.id;

  const clone = document.importNode(template.content, true);
  contenedor.appendChild(clone);
}
