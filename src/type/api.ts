import { Category } from "../view/category/type";
import { Order } from "../view/order/type";
import { Product } from "../view/product/type";

export interface UserResponse{
    name: string
    mail: string
  }
export interface UserRequest {
  name: string
  password: string
}
export interface ProductListRequest{
  search?: string
  category?: string
}
export interface ProductListResponse{
  list: Array<Product>
}
export interface ProductCreate {
  name: string
  price: number
}
export interface CategoryListResponse{
  list: Array<Category>
}
export interface OrderListResponse{
  list: Array<Order>
}