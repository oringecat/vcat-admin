/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-09-01
 */

import { Model } from "../model";

interface IAdminRoute {
    id?: number;
    parentId?: number;
    path?: string;
    redirect?: string;
    name?: string;
    component?: string;
    meta?: {
        title?: string;
        auth?: string[];
        hidden?: boolean; // 不在左侧菜单中显示
    };
    children?: IAdminRoute[];
}

class AdminRoute extends Model<IAdminRoute> implements IAdminRoute {
    id = 0;
    parentId = 0;
    path = "";
    redirect = "";
    name = "";
    component = "";
    meta = {};
    children = [];

    constructor(data?: IAdminRoute) {
        super(data);
        Object.assign(this, data);
    }
}

export { IAdminRoute, AdminRoute };