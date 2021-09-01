/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-05
 */

import { http, IHttpParams } from "../http";
import { IAdmin } from "./admin";

export class AdminService {
    static login(params: IHttpParams<IAdmin>): void {
        http("/admin/login", "post", params);
    }

    static getList(params: IHttpParams<IAdmin>): void {
        http("/admin/register", "post", params);
    }
}