/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-07-29
 */

import { CompatVue, Component } from "vue";
import sidebar from "./sidebar/index.vue";
import navbar from "./navbar/index.vue";
import submenu from "./submenu/index.vue";
import tabbar from "./tabbar/index.vue";
import scrollbar from "./scrollbar/index.vue";
import chart from "./chart/index.vue";
import pagination from "./pagination/index.vue";

const components = [
    sidebar,
    navbar,
    submenu,
    tabbar,
    scrollbar,
    chart,
    pagination,
];

const install: Component = (app: CompatVue) => {
    components.map((component) => {
        app.component(component.name, component); //注册全局组件
    });
};

export default {
    install,
};
