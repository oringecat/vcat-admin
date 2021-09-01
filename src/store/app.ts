/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-01
 */

import { Module } from "vuex";
import { IGlobalState } from "./interface";

interface IAppState {
    loading: boolean;
}

// Module接受两个参数，第一个为自身state类型，第二个为根state类型
const app: Module<IAppState, IGlobalState> = {
    namespaced: true,
    state: {
        loading: false,
    },
    mutations: {
        SET_LOADING: (state, value) => {
            state.loading = value;
        },
    },
    actions: {
        setLoading: (context, value) => {
            context.commit("SET_LOADING", value);
        },
    },
};

export { IAppState, app };
