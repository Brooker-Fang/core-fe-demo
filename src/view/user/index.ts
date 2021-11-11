import { message } from "antd";
import { call, Log, Module, register, SagaGenerator, SilentOnNetworkConnectionError } from "core-fe";
import { UserApi } from "../../api/UserApi";
import { RootState } from "../../type/state";
import { UserState } from "./type";
const initialState: UserState = {
  currentUser: null
};
class UserModule extends Module<RootState, "user", {}, {}>{
  @Log()
  *login(name: string, password: string): SagaGenerator {
    try {
      yield* call(UserApi.login, {name, password})
      message.success(`登录成功`, 1)
      yield* this.pushHistory("/");
    } catch (error) {
      console.log(error)
      localStorage.setItem('currentUser', JSON.stringify({name, password}))
      const currentUserStr = localStorage.getItem('currentUser')
      if (!currentUserStr) message.warn('请先注册用户')
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
      const { name: registerName, password: registerPwd } = currentUser
      if (registerName === name && registerPwd === password) {
        this.setState({
          currentUser: {name}
        })
        message.success(`登录成功`, 1)
        yield* this.pushHistory("/");
      } else {
        if(registerName !== name) {
          message.warn('用户昵称错误')
        }
        if (registerPwd !== password) {
          message.warn('用户密码错误')
        }
      }
    }
  }
  *register(name: string, password: string): SagaGenerator{
    try {
      yield* call(UserApi.register, {name, password})
      localStorage.setItem('currentUser', JSON.stringify({registerName: name, registerPwd: password}))
    } catch (error) {
      console.log(error)
      message.success(`注册成功`, 1)
      localStorage.setItem('currentUser', JSON.stringify({registerName: name, registerPwd: password}))
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