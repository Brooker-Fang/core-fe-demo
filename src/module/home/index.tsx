import {Module, register} from "core-fe";
import MainComponent from "./components/Home";
import {RootState} from "../../type/state";
class HomeModule extends Module<RootState, "home"> {
  *onEnter(){
    console.info(1)
  }
}

const module = register(new HomeModule("home", {
 
}));

export const Home = module.attachLifecycle(MainComponent);