/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-04
 */

import { AxiosRequestConfig, Method, ResponseType } from "axios";
import { store } from "@/store";
import service from "./service";

//状态码
enum HttpResultCode {
    Success = 100, //成功
    Error = 101, //发生错误
    Fail = 102, //失败
    Warning = 103, //非法请求
    Unauthorized = 201, //授权失败
    ParameterError = 202, //参数错误
    InvalidToken = 203, //令牌无效
    InvalidSign = 204, //签名无效
}

//请求结果
interface IHttpResult {
    code: HttpResultCode;
    message: string;
    total?: number;
    data?: any; // eslint-disable-line
}

//查询参数
interface IQueryParams<T> {
    pageSize?: number;
    pageIndex?: number;
    takeTop?: number;
    sortBy?: { [key in keyof T | "random"]: "desc" | "asc" };
}

//请求参数
interface IHttpParams<T> {
    responseType?: ResponseType;
    data: T;
    success?: (res: IHttpResult) => void;
    fail?: (err: IHttpResult) => void;
    complete?: () => void;
}

function http<T>(url: string, method: Method, params: IHttpParams<T>): void {
    const config: AxiosRequestConfig = {
        method: method,
        responseType: params.responseType,
    };

    if (["post", "POST", "put", "PUT", "patch", "PATCH"].includes(method)) {
        config.data = params.data;
    } else {
        config.params = params.data;
    }

    store.dispatch("app/setLoading", true); //正在加载
    service(url, config)
        .then((res) => {
            const data = res.data;

            if (config.responseType === "blob") {
                params.success && params.success(data);
            } else {
                switch (data.code) {
                    case HttpResultCode.InvalidToken:
                        //退出登录
                        store.dispatch("user/logout", () => {
                            window.location.reload();
                        });
                        break;
                    case HttpResultCode.Success:
                        params.success && params.success(data);
                        break;
                    default:
                        params.fail && params.fail(data);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            store.dispatch("app/setLoading", false); //加载完毕
            params.complete && params.complete();
        });
}

export { http, IHttpParams, IQueryParams };
