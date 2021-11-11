import { CartItem } from "../view/cart/type";
import { Category } from "../view/category/type";
import { Order } from "../view/order/type";
import { Product } from "../view/product/type";

export interface UserResponse{
    name: string
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
export interface OrderCreateResponse{
  orderId: string
}
export interface OrderDetailResponse{
  _id: string,
  list: CartItem[],
  totalPrice: number
}