import Config from "@/service/Config";

export default class ProductService {
  getProducts() {
    return fetch(`${Config.baseURL}/api/v1/products`)
    .then((response) => response.json());
  }

  deleteProduct(id : number) {
    return fetch(`${Config.baseURL}/api/v1/products/${id}`, {
      method: 'DELETE',
    });
  }

  createProduct(product : Object) {
    return fetch(`${Config.baseURL}/api/v1/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  updateProduct(product: { id: number }) {
    return fetch(`${Config.baseURL}/api/v1/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}