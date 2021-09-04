/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-07
 */

import { Module } from "vuex";
import { IGlobalState } from "./interface";

interface IHistoryState {
    historyPages: {
        name: string,
        title: string,
        fullPath: string
    }[];
    currentIndex: number,
    excludePages: string[];
}

// Module接受两个参数，第一个为自身state类型，第二个为根state类型
const router: Module<IHistoryState, IGlobalState> = {
    namespaced: true,
    state: {
        historyPages: [], // 已访问的路由历史列表
        currentIndex: 0, // 当前历史索引位置
        excludePages: [], // 不缓存的页面列表，路由和组件的name必须相同
    },
    mutations: {
        ADD_HISTORY: (state, value) => {
            state.excludePages = [];
            const views = state.historyPages;

            // 查找是否已有相同页面打开
            const index = views.findIndex((e) => e.name === value.name);
            if (index > -1) {
                views[index] = value;
                state.currentIndex = index;
            } else {
                views.push(value);
                state.currentIndex = views.length - 1;
            }

            state.historyPages = views;
        },
        REMOVE_HISTORY: (state, value) => {
            state.excludePages.push(value);
            const index = state.historyPages.findIndex((e) => e.name === value);
            if (index > -1) {
                state.historyPages.splice(index, 1);
            }
        },
    },
    actions: {
        // 添加到历史列表
        addHistory: (context, value) => {
            context.commit("ADD_HISTORY", value);
        },
        // 从历史列表中移除
        removeHistory: (context, value) => {
            context.commit("REMOVE_HISTORY", value);
        },
    },
};

export { IHistoryState, router };
