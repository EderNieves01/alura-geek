const productList = () => {
  return fetch('http://localhost:3000/products')
    .then((data) => data.json())  // Corregido: data.json() es una función
    .catch((error) => console.log(error));
};

const createProducts = (name, price, image, description) => {
  return fetch('http://localhost:3000/products',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      image,
      description,
    })
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

const deleteProduct = (id) => {
  const API_URL =`http://localhost:3000/products/${id}`
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo eliminar el producto');
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));
};

export const servicesProducts = {
  productList,
  createProducts,
 deleteProduct,
};