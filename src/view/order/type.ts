import { CartItem } from "../cart/type";
export const LOADING_ORDER_LIST = 'order/list'
export interface Order extends CartItem {}
export interface OrderState {
  list: Order[],
  detail: Order | {}
}