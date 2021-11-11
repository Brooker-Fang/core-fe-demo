import { ajax } from 'core-fe'
import { OrderListResponse, OrderCreateResponse, OrderDetailResponse } from '../type/api';
import { CartItem } from '../view/cart/type';

export class OrderApi {
  static list(): Promise<OrderListResponse> {
    return ajax("GET", "/ajax/order", {}, null);
  }
  static create(request: CartItem[]): Promise<OrderCreateResponse> {
    return ajax("POST", "/ajax/order", {}, request);
  }
  static get(orderId: string): Promise<OrderDetailResponse> {
    return ajax("POST", "/ajax/order", {}, {orderId});
  }
}