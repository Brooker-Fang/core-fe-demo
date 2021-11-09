import { Category } from "../category/type";
export const LOADING_PRODUCT_LIST = 'product/list'
export interface Product{
  _id?: string
  name?: string
  price?: number
  description?: string
  category?: Category
}
export interface ProductState {
  list: Product[],
  detail: Product 
}