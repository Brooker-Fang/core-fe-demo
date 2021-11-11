import { message } from "antd";
import { call, Loading, Module, register, SagaGenerator } from "core-fe";
import { getCart } from "../../api/CartApi";
import { OrderApi } from "../../api/OrderApi";
import { RootState } from "../../type/state";
import { CartItem } from "../cart/type";
import OrderPage from "./components/OrderPage";
import { LOADING_ORDER_LIST, OrderState, LOADING_ORDER_CREATE } from "./type";
const initialState: OrderState = {
  list: [],
  detail: {
    _id: '',
    list: [],
    totalPrice: 0
  }
};
class OrderModule extends Module<RootState, "order", {}, {}> {
  override *onEnter(entryComponentProps: {}): SagaGenerator {
    console.log("entry======", entryComponentProps);
    yield* this.list();
}
  @Loading(LOADING_ORDER_LIST)
  *list(): SagaGenerator{
    try {
      const res = yield* call(OrderApi.list)
      this.setState({
        list: res.list
      })
    } catch (error) {
      console.log(error)
    }
  }
  @Loading(LOADING_ORDER_CREATE)
  *create(cart: CartItem[]) : SagaGenerator{
    try {
      const res = yield* call(OrderApi.create, cart)
      message.success('订单已提交')
      yield* this.get(res.orderId)
      
    } catch (error) {
      yield* this.get('1')
      console.log(error)
    }
  }
  @Loading(LOADING_ORDER_LIST)
  *get(orderId: string): SagaGenerator{
    debugger
    try {
      const res = yield* call(OrderApi.get, orderId)
      this.setState({
        detail: res
      })
      yield* this.pushHistory(`/order/${orderId}`)
    } catch (error) {
      const cart = getCart()
      this.setState({
        detail: {
          _id: '1',
          list: cart,
          totalPrice: cart.reduce((currentValue, nextValue) => {
            return nextValue.price? (currentValue += nextValue.price * nextValue.count) : currentValue
          }, 0)
        }
      })
      yield* this.pushHistory(`/order/${orderId}`)
      console.log(error)
    }
  }
}

const view = register(new OrderModule("order", initialState))
export const orderActions = view.getActions()
export const OrderPageComponent = view.attachLifecycle(OrderPage)