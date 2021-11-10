import { message } from "antd";
import { call, Log, Module, register, SagaGenerator, SilentOnNetworkConnectionError } from "core-fe";
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
    try {
      yield* call(UserApi.login, {name, password})
      message.success(`登录成功`, 1)
      this.pushHistory('/')
    } catch (error) {
      console.log(error)
    }
  }
  *register(name: string, password: string): SagaGenerator{
    try {
      yield* call(UserApi.register, {name, password})
    } catch (error) {
      console.log(error)
    }
  }
  @SilentOnNetworkConnectionError()
  *getCurrent():  SagaGenerator{
    try {
      const res = yield* call(UserApi.currentUser)
      this.setState({
        currentUser: res
      })
    } catch (error) {
      this.pushHistory('/login')
    }
  }
}
const view = register(new UserModule('user', initialState))
export const userActions = view.getActions()
export { UserModule, initialState}