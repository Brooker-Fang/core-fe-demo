
import {ajax} from "core-fe";
import { UserRequest, UserResponse } from "../type/api";

export class UserApi {
    static currentUser(): Promise<UserResponse> {
        return ajax("GET", "/ajax/currentUser", {}, null);
    }
    static login(request: UserRequest): Promise<UserResponse> {
        return ajax("PUT", "/ajax/login", {}, request);
    }
    static register(request: UserRequest): Promise<UserResponse> {
        return ajax("PUT", "/ajax/register", {}, request);
    }
}
