/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-04
 */

import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import cryptojs from "crypto-js";
import { store } from "@/store";
import { ElMessage } from "element-plus";

// 请求列表
const pending = new Map();

// 添加请求
const addPending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join("&");
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pending.has(url)) {
                //如果列表中不存在当前请求，则添加进去
                pending.set(url, cancel);
            }
        });
};

// 移除请求
const removePending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join("&");
    if (pending.has(url)) {
        //如果在列表中存在当前请求，需要取消当前请求，并且移除
        const cancel = pending.get(url);
        cancel(url);
        pending.delete(url);
    }
};

// 清空等待中的请求（在路由跳转时调用）
export const clearPending = (): void => {
    for (const [url, cancel] of pending) {
        cancel(url);
    }
    pending.clear();
};

const service = axios.create({
    //baseURL: "https://localhost:44314",
    timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        removePending(config); //在请求开始前，对之前的请求做检查取消操作
        addPending(config); //将当前请求添加到列表中

        const loginInfo = store.getters["user/loginInfo"];
        //请求头签名
        const sign = {
            token: loginInfo.token || "",
            signsecret: "qz7qWOMXKTMT5JlDs5w4NTPwWeR3xhF1v6wqbZ9cExmP6cc3spvNAp1wJJ1SqRI5",
            timestamp: new Date().getTime(),
        };
        //设置请求头
        config.headers = {
            authorization: sign.token,
            signid: "eecd3f37625f4501b88e9f0fa14b4b51",
            sign: cryptojs.SHA256(qs.stringify(sign)).toString(),
            timestamp: sign.timestamp,
        };

        return config;
    },
    (error) => {
        //此处异常触发条件不明
        ElMessage({
            type: "error",
            message: "网络异常，请稍后再试",
            showClose: true,
        });
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        removePending(response); //在请求结束后，移除本次请求
        return response;
    },
    (error) => {
        if (!axios.isCancel(error)) {
            ElMessage({
                type: "error",
                message: "服务器异常，请稍后再试",
                showClose: true,
            });
        }
        return Promise.reject(error);
    }
);

export default service;
