import { Product } from "../product/type";

export interface CartItem extends Product {
  count: number
}
export interface CartState {
  cartList: CartItem[]
}