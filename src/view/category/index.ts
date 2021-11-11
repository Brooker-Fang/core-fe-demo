import { message } from "antd";
import { call, Module, register, SagaGenerator } from "core-fe";
import { CategoryApi } from "../../api/CategoryApi";
import { RootState } from "../../type/state";
import categoryList from "./data";
import { CategoryState } from "./type";
const initialState: CategoryState = {
  list: []
};
class CategoryModule extends Module<RootState, "category", {}, {}>{
  *list(): SagaGenerator{
    try {
      yield* call(CategoryApi.list)
    } catch (error) {
      console.log(error)
      this.setState({
        list: categoryList
      })
    }
  }
  *created(name: string): SagaGenerator{
    try {
      yield* call(CategoryApi.create, name)
      message.success(`类型添加成功`, 1)
    } catch (error) {
      let list = categoryList
      let category = {
        name, _id : list.length + ''
      }
      list[list.length] = category
      message.success(`类型添加成功`, 1)
      yield* this.pushHistory('/admin')
    }
  }
}
const view = register(new CategoryModule('category', initialState))
export const categoryActions = view.getActions()
export { CategoryModule, initialState}