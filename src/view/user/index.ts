import { call, Log, Module, register, SagaGenerator } from "core-fe";
import { UserApi } from "../../api/UserApi";
import { RootState } from "../../type/state";
import { UserState } from "./type";

const initialState: UserState = {
  currentUser: {
      name: '',
  },
};
class UserModule extends Module<RootState, "user", {}, {}>{
  *onEnter(){
    console.log('enter')
  }
  @Log()
  *login(name: string, password: string): SagaGenerator {
    yield* call(UserApi.login, {name, password})
    this.pushHistory('/')
  }
  *register(name: string, password: string): SagaGenerator{
    const res = yield* call(UserApi.register, {name, password})
  }
}
const view = register(new UserModule('user', initialState))
export const userActions = view.getActions()
export { UserModule, initialState}