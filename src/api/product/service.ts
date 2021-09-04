/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-05
 */

import { http, IRequest } from "../http";
import { IProduct } from "./product";

export class ProductService {
    static getListByPage(params: IRequest<IProduct>): void {
        http("/product", "post", params);
    }

    static getById(params: IRequest<IProduct>): void {
        http("/product", "get", params);
    }
}