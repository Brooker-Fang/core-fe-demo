import { ajax } from 'core-fe'
import { OrderListResponse } from '../type/api';

export class OrderApi {
  static list(): Promise<OrderListResponse> {
    return ajax("GET", "/ajax/order", {}, null);
  }
}