/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-01
 */

import { Module } from "vuex";
import { IGlobalState } from "./interface";

interface IAppState {
    loading: boolean;
    isMobile: boolean;
}

// Module接受两个参数，第一个为自身state类型，第二个为根state类型
const app: Module<IAppState, IGlobalState> = {
    namespaced: true,
    state: {
        loading: false,
        isMobile: false,
    },
    mutations: {
        SET_LOADING: (state, value) => {
            state.loading = value;
        },
        IS_MOBILE: (state) => {
            const classList = document.body.classList,
                clientWidth = document.documentElement.clientWidth;

            if (clientWidth > 768) {
                classList.remove("mobile");
                state.isMobile = false;
            } else {
                classList.add("mobile");
                state.isMobile = true;
            }
        },
    },
    actions: {
        setLoading: (context, value) => {
            context.commit("SET_LOADING", value);
        },
        isMobile: (context) => {
            context.commit("IS_MOBILE");
        },
    },
};

export { IAppState, app };
