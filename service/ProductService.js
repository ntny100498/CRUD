import Cofig from "@/service/Config";

export default class ProductService {
  getProducts() {
    return fetch(`${Cofig.baseURL}/api/v1/products`)
    .then((response) => response.json());
  }

  deleteProduct(id) {
    return fetch(`${Cofig.baseURL}/api/v1/products/${id}`, {
      method: 'DELETE',
    });
  }

  createProduct(product) {
    return fetch(`${Cofig.baseURL}/api/v1/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  updateProduct(product) {
    return fetch(`${Cofig.baseURL}/api/v1/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}