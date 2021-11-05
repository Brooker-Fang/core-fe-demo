import { Module } from "core-fe";
import { RootState } from "../../type/state";


class UserModule extends Module<RootState, "user", {}, {}>{
  *onEnter(){
    console.log('enter')
  }
}