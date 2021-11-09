import { ajax } from 'core-fe'
import { CategoryListResponse } from '../type/api';
import { Category } from '../view/category/type';

export class CategoryApi {
  static list(): Promise<CategoryListResponse> {
    return ajax("GET", "/ajax/product", {}, null);
  }
  static create(name: string): Promise<Category> {
      return ajax("GET", "/ajax/product/create", {name}, null);
  }
}