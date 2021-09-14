/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-05
 */

import { http, IRequest } from "../http";
import { IAdmin } from "./admin";
import { IAdminRoute } from "./admin-route";

export class AdminService {
    static login(params: IRequest<IAdmin>): void {
        http("/admin/login", "post", params);
    }

    static register(params: IRequest<IAdmin>): void {
        http("/admin/register", "post", params);
    }

    static getRoutes(params: IRequest<IAdminRoute>): void {
        http("/admin/routes", "get", params);
    }

    static getList(params: IRequest<IAdmin>): void {
        http("/admin", "post", params);
    }
}