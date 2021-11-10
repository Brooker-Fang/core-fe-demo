import { message } from "antd";
import { call, Loading, Module, register, SagaGenerator } from "core-fe";
import { ProductApi } from "../../api/ProductApi";
import { RootState } from "../../type/state";
import { Product, ProductState } from "./type";
import { LOADING_PRODUCT_LIST } from "./type";
import ProductListComponent from './component/ProductList'
const initialState: ProductState = {
  list: [],
  detail: {}
};
class ProductModule extends Module<RootState, "product", {}, {}>{
  override *onEnter(entryComponentProps: {}): SagaGenerator {
    console.log("entry======", entryComponentProps);
    yield* this.list();
}
  @Loading(LOADING_PRODUCT_LIST)
  *list(search?:string, category?:string): SagaGenerator{
    try {
      const res = yield* call(ProductApi.list, {search, category})
      this.setState({
        list: res.list
      })
    } catch (error) {
      console.log(error)
    }
  }
  *create(request: Product): SagaGenerator{
    try {
      yield* call(ProductApi.create, request)
      message.success(`产品添加成功`, 1)
    } catch (error) {} 
  }
  *put(request: Product): SagaGenerator{
    try {
      yield* call(ProductApi.put, request)
      message.success(`产品修改成功`, 1)
    } catch (error) {} 
  }
  *setList(list: Product[]) {
    yield this.setState({
      list
    })
  }
}
const view = register(new ProductModule('product', initialState))
export const productActions = view.getActions()
export const ProductList = view.attachLifecycle(ProductListComponent);
export { ProductModule, initialState}