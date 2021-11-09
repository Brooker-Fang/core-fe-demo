import { Module, register } from "core-fe";
import { getCart } from "../../api/CartApi";
import { RootState } from "../../type/state";
import { CartState } from "./type";
const initialState: CartState = {
  cartList: []
}
class CartModule extends Module<RootState, "cart", {}, {}> {
  *onEnter() {
    const list = getCart()
    this.setState({
      cartList: list
    })
  }
}

const view = register(new CartModule("cart", initialState))
export const cartActions = view.getActions()