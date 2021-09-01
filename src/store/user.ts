/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-07-30
 */

import { Module } from "vuex";
import { IGlobalState } from "./interface";

interface ILoginInfo {
  id: number;
  account: string;
  realname: string;
  token: string;
}

interface IUserState {
  loginInfo: ILoginInfo;
}

const getStorage = () => {
  const storage =
    localStorage.getItem("loginInfo") ||
    sessionStorage.getItem("loginInfo") ||
    "{}";
  return JSON.parse(storage) as ILoginInfo;
};

const setStorage = (value: ILoginInfo, autoLogin = false) => {
  if (autoLogin) {
    localStorage.setItem("loginInfo", JSON.stringify(value));
  } else {
    sessionStorage.setItem("loginInfo", JSON.stringify(value));
  }
};

//Module接受两个参数，第一个为自身state类型，第二个为根state类型
const user: Module<IUserState, IGlobalState> = {
  namespaced: true,
  state: {
    loginInfo: getStorage(),
  },
  getters: {
    loginInfo: (state) => state.loginInfo,
  },
  mutations: {
    //保存登陆信息
    SET_LOGIN_INFO: (state, value) => {
      state.loginInfo = value;
      setStorage(value);
    },
    //更新登陆信息
    UPDATE_LOGIN_INFO: (state, value) => {
      state.loginInfo = {
        ...state.loginInfo,
        ...value,
      };
      setStorage(state.loginInfo);
    },
    //退出登录
    LOGOUT: (state, callback: () => void) => {
      state.loginInfo = {
        id: 0,
        account: "guest",
        realname: "访客",
        token: "",
      };
      localStorage.removeItem("loginInfo");
      sessionStorage.removeItem("loginInfo");
      callback && callback();
    },
  },
  actions: {
    setLoginInfo: (context, value) => {
      context.commit("SET_LOGIN_INFO", value);
    },
    updateLoginInfo: (context, value) => {
      context.commit("UPDATE_LOGIN_INFO", value);
    },
    logout: (context, callback: () => void) => {
      context.commit("LOGOUT", callback);
    },
  },
};

export { IUserState, user };
