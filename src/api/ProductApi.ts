import { ajax } from 'core-fe'
import { ProductCreate, ProductListResponse, ProductListRequest } from '../type/api';
import { Product } from '../view/product/type';

export class ProductApi {
  static list(request: ProductListRequest): Promise<ProductListResponse> {
    return ajax("GET", "/ajax/product", {}, null);
  }
  static create(request: Product): Promise<ProductCreate> {
      return ajax("POST", "/ajax/product/create", request, null);
  }
  static put(request: Product): Promise<ProductCreate> {
    return ajax("PUT", "/ajax/product/create", request, null);
}
  static get(id: string): Promise<Product> {
    return ajax("GET", "/ajax/product/:id", {id}, null);
  }
  static search(name: string): Promise<Product> {
    return ajax("POST", "/ajax/product/search", {name}, null);
  }
}