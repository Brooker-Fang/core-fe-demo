import { message } from "antd";
import { call, Module, register, SagaGenerator } from "core-fe";
import { CategoryApi } from "../../api/CategoryApi";
import { RootState } from "../../type/state";
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
    }
  }
  *created(name: string): SagaGenerator{
    try {
      yield* call(CategoryApi.create, name)
      message.success(`类型添加成功`, 1)
    } catch (error) {}
  }
}
const view = register(new CategoryModule('category', initialState))
export const categoryActions = view.getActions()
export { CategoryModule, initialState}