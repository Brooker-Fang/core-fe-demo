import { CartItem } from "../cart/type";
export const LOADING_ORDER_LIST = 'order/list'
export const LOADING_ORDER_CREATE = 'order/create'
export interface Order {
  _id: string,
  list: CartItem[]
  totalPrice: number
}
export interface OrderState {
  list: Order[],
  detail: Order
}