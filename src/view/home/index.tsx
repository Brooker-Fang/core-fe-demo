import {Module, register} from "core-fe";
import Routes from "../../routes";
import {RootState} from "../../type/state";
class HomeModule extends Module<RootState, "home"> {
}

const view = register(new HomeModule("home", {}));

export const Home = view.attachLifecycle(Routes);