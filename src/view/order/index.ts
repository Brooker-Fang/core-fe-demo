import { call, Loading, Module, register, SagaGenerator } from "core-fe";
import { OrderApi } from "../../api/OrderApi";
import { RootState } from "../../type/state";
import OrderPage from "./components/OrderPage";
import { LOADING_ORDER_LIST, OrderState } from "./type";
const initialState: OrderState = {
  list: [],
  detail: {}
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
}

const view = register(new OrderModule("order", initialState))
export const orderActions = view.getActions()
export const OrderPageComponent = view.attachLifecycle(OrderPage)