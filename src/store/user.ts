/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-07-30
 */

import { Module } from "vuex";
import { IGlobalState } from "./interface";
import { appStorage, localData, sessionData } from "@/lib/storage";

interface IUserState {
    loginInfo: typeof appStorage.loginInfo;
}

// Module接受两个参数，第一个为自身state类型，第二个为根state类型
const user: Module<IUserState, IGlobalState> = {
    namespaced: true,
    state: {
        loginInfo: localData.get("autoLogin") ? localData.get("loginInfo") : sessionData.get("loginInfo")
    },
    getters: {
        loginInfo: (state) => state.loginInfo,
    },
    mutations: {
        UPDATE_LOGIN_INFO: (state, value) => {
            state.loginInfo = { ...state.loginInfo, ...value };
            if (localData.get("autoLogin")) {
                localData.set("loginInfo", state.loginInfo);
            } else {
                sessionData.set("loginInfo", state.loginInfo);
            }
        },
        LOGOUT: (state, callback: () => void) => {
            state.loginInfo = appStorage.loginInfo;
            localData.remove("loginInfo");
            sessionData.remove("loginInfo");
            sessionData.remove("routerMap");
            callback && callback();
        },
    },
    actions: {
        // 修改登录信息
        updateLoginInfo: (context, value) => {
            context.commit("UPDATE_LOGIN_INFO", value);
        },
        // 登录
        login: (context, value) => {
            localData.remove("loginInfo");
            context.commit("UPDATE_LOGIN_INFO", value);
        },
        // 自动登录
        autoLogin: (context, value) => {
            localData.set("autoLogin", true);
            context.commit("UPDATE_LOGIN_INFO", value);
        },
        // 退出登录
        logout: (context, callback: () => void) => {
            localData.set("autoLogin", false);
            context.commit("LOGOUT", callback);
        },
    },
};

export { IUserState, user };
