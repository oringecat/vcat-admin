/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-04
 */

import { AxiosRequestConfig, Method, ResponseType } from "axios";
import { store } from "@/store";
import { ResponseCode } from "@/lib/models";
import service from "./service";

// 响应结果
interface IResponse {
    code: ResponseCode;
    message: string;
    total?: number;
    data?: any; // eslint-disable-line
}

// 查询参数
interface IQuery<T> {
    pageSize?: number;
    pageIndex?: number;
    takeTop?: number;
    sortBy?: { [key in keyof T | "random"]: "desc" | "asc" };
}

// 请求参数
interface IRequest<T = undefined> {
    responseType?: ResponseType;
    data?: T | IQuery<T>;
    success?: (res: IResponse) => void;
    fail?: (err: IResponse) => void;
    complete?: () => void;
}

/**
 * HTTP接口请求
 */
function http<T>(url: string, method: Method, request: IRequest<T> = {}): void {
    const config: AxiosRequestConfig = {
        method: method,
        responseType: request.responseType,
    };

    if (["post", "POST", "put", "PUT", "patch", "PATCH"].includes(method)) {
        config.data = request.data ?? {};
    } else {
        config.params = request.data ?? {};
    }

    store.dispatch("app/setLoading", true); //正在加载
    service(url, config)
        .then((res) => {
            const data = res.data;

            if (config.responseType === "blob") {
                request.success && request.success(data);
            } else {
                switch (data.code) {
                    case ResponseCode.InvalidToken:
                        //退出登录
                        store.dispatch("user/logout", () => {
                            window.location.reload();
                        });
                        break;
                    case ResponseCode.Success:
                        request.success && request.success(data);
                        break;
                    default:
                        request.fail && request.fail(data);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            store.dispatch("app/setLoading", false); //加载完毕
            request.complete && request.complete();
        });
}

export { http, IRequest };
