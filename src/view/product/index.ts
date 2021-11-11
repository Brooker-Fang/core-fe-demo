import { message } from "antd";
import { call, Loading, Module, register, SagaGenerator } from "core-fe";
import { ProductApi } from "../../api/ProductApi";
import { RootState } from "../../type/state";
import { Product, ProductState } from "./type";
import { LOADING_PRODUCT_LIST } from "./type";
import ProductListComponent from './component/ProductList'
import  productListData  from "./data";
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
    console.log('search===',search, category)
    try {
      const res = yield* call(ProductApi.list, {search, category})
      this.setState({
        list: res.list
      })
    } catch (error) {
      console.log(error)
      this.setState({
        list: productListData
      })
    }
  }
  *search(search?:string, category?:string): SagaGenerator{
    try {
      let list = [...productListData]
      if(search || category) {
        if(search) {
          list = list.filter(item => (item.name as string).indexOf(search) !== -1)
        }
        if(category && category !== 'All') {
          list = list.filter(item => (item.category?._id as string) === category)
        }
      }
      console.log(list, productListData)
      this.setState({
        list
      })
      yield* call(ProductApi.list, {search, category})
    } catch (error) {}
  }
  *create(request: Product): SagaGenerator{
    try {
      
      yield* call(ProductApi.create, request)
      message.success(`产品添加成功`, 1)
    } catch (error) {
      
      let list = [...productListData]
      request._id = list.length + ''
      list.push(request)
      this.setState({
        list
      })
      message.success(`产品添加成功`, 1)
      yield* this.pushHistory('/admin/product')
    } 
  }
  *put(request: Product): SagaGenerator{
    try {
      yield* call(ProductApi.put, request)
      message.success(`产品修改成功`, 1)
    } catch (error) {
      message.success(`产品修改成功`, 1)
      yield* this.pushHistory('/admin/product')
    } 
  }
  *get(request: Product): SagaGenerator{
    try {
      const res = yield* call(ProductApi.get, request._id as string)
      this.setState({
        detail: res
      })
      yield* this.pushHistory(`/product/${request._id}`)
    } catch (error) {
      this.setState({
        detail: request
      })
      yield* this.pushHistory(`/product/${request._id}`)
    } 
  }
  *setList(list: Product[]) {
    yield this.setState({
      list
    })
  }
}
const view = register(new ProductModule('product', initialState))
export const productActions = view.getActions()
export const ProductListPage = view.attachLifecycle(ProductListComponent);
export { ProductModule, initialState}