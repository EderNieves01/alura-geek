import { servicesProducts } from "../services/product-service.js";

const container = document.querySelector('.content');
const form = document.querySelector("#formulario");
const btn = document.querySelectorAll(".delete-button")

function crearCard(name, price, img, id, description) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card">
      <div class="img-card">
        <img src="${img}" />
      </div>
      <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
          <p>$ ${price}</p>
        </div>
        <div class="card-container--description">
          <p>${description}</p>
        </div>
        <div class="delete-button" data-id="${id}">
          <button>eliminar</button>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    listProducts.forEach((product, index) => {
        crearCard(product.name, product.price, product.image, product.id, product.description)
    });
  } catch (error) {
    console.log(error);
  }
};


form.addEventListener("submit", (e)=>{
  e.preventDefault();

  const name = document.querySelector("#name");
  const price = document.querySelector("#precio");
  const img = document.querySelector("#imagen");
  const description = document.querySelector("#descripcion");
  console.log(price.value, name.value, description.value, img.value);
  servicesProducts.createProducts(name.value, price.value, img.value, description.value)
  .then((res)=> console.log(res))
  .catch((e)=> console.log(e));
  
})

document.addEventListener('click', (event) => {
  if (event.target.closest('.delete-button')) {
    const productId = event.target.closest('.delete-button').dataset.id;
    servicesProducts.deleteProduct(productId).then(() => {
      console.log(`Producto con ID ${productId} eliminado`);
      // Remover la card del DOM
      event.target.closest('.card').remove();
    });
  }
});
render();