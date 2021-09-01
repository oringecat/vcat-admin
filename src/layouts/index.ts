/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-07
 */

import { CompatVue, Component } from "vue";
import page from "./page/index.vue";
import view from "./view/index.vue";

const components = [page, view];

const install: Component = (app: CompatVue) => {
    components.map((component) => {
        app.component(component.name, component); //注册全局组件
    });
};

export default {
    install,
};
