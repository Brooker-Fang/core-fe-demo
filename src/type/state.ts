import {State} from "core-fe";
import { CartState } from "../view/cart/type";
import { CategoryState } from "../view/category/type";
import { ProductState } from "../view/product/type";
import { UserState } from "../view/user/type";
export interface RootState extends State {
    app: {
        home: {};
        user: UserState,
        category: CategoryState,
        cart: CartState,
        order: {},
        product: ProductState
    };
}

