
import {ajax} from "core-fe";
import { UserResponse } from "../type/api";

export class UserApi {
    static currentUser(): Promise<UserResponse> {
        return ajax("GET", "/ajax/currentUser", {}, null);
    }
    static login(request: LoginAJAXRequest): Promise<LoginAJAXResponse> {
        return ajax("PUT", "/ajax/login", {}, request);
    }
}
