import { ajax } from 'core-fe'
import { ProductCreate, ProductListResponse, ProductListRequest } from '../type/api';
import { Product } from '../view/product/type';

export class ProductApi {
  static list(request: ProductListRequest): Promise<ProductListResponse> {
    return ajax("POST", "/ajax/product", {}, request);
  }
  static create(request: Product): Promise<ProductCreate> {
      return ajax("POST", "/ajax/product/create", {}, request);
  }
  static put(request: Product): Promise<ProductCreate> {
    return ajax("PUT", "/ajax/product/create", {}, request);
}
  static get(id: string): Promise<Product> {
    return ajax("GET", "/ajax/product/:id", {id}, {});
  }
  static search(name: string): Promise<Product> {
    return ajax("POST", "/ajax/product/search", {}, {name});
  }
}