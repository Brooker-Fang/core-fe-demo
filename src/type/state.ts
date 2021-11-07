import {State} from "core-fe";
import { UserState } from "../view/user/type";
export interface RootState extends State {
    app: {
        home: {};
        user: UserState
    };
}

