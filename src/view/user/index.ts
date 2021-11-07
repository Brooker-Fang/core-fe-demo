import { call, Module, register, SagaGenerator } from "core-fe";
import { UserApi } from "../../api/UserApi";
import { RootState } from "../../type/state";
import { UserState } from "./type";

const initialState: UserState = {
  currentUser: {
      name: null,
      mail: ''
  },
};
class UserModule extends Module<RootState, "user", {}, {}>{
  *onEnter(){
    console.log('enter')
  }
  *login(name: string, password: string): SagaGenerator {
    const res = yield* call(UserApi.login, {name, password})
  }
  *register(): SagaGenerator{

  }
}
const view = register(new UserModule('user', initialState))
export const userActions = view.getActions()
export { UserModule, initialState}