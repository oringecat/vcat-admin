/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-05
 */

import { http, IHttpParams, IQueryParams } from "../http";
import { IProduct } from "./product";

type P = IProduct & IQueryParams<IProduct>;

export class ProductService {
    static getListByPage(params: IHttpParams<P>): void {
        http("/product", "post", params);
    }

    static getById(params: IHttpParams<IProduct>): void {
        http("/product", "get", params);
    }
}