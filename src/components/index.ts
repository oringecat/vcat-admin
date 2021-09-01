﻿/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-07-29
 */

import { CompatVue, Component } from "vue";
import navbar from "./navbar/index.vue";
import tabbar from "./tabbar/index.vue";
import scrollbar from "./scrollbar/index.vue";

const components = [navbar, tabbar, scrollbar];

const install: Component = (app: CompatVue) => {
    components.map((component) => {
        app.component(component.name, component); //注册全局组件
    });
};

export default {
    install,
};
