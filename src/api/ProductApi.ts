import { ajax } from 'core-fe'
import { Product, ProductCreate, ProductListResponse } from '../type/api';

export class ProductApi {
  static list(): Promise<ProductListResponse> {
    return ajax("GET", "/ajax/product", {}, null);
  }
  static create(): Promise<ProductCreate> {
      return ajax("GET", "/ajax/product/create", {}, null);
  }
  static get(id: string): Promise<Product> {
    return ajax("GET", "/ajax/product/:id", {id}, null);
  }
  static search(name: string): Promise<Product> {
    return ajax("POST", "/ajax/product/search", {name}, null);
  }
}