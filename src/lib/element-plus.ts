import { CompatVue, Component } from "vue";
import { ElTabs, ElTabPane, ElIcon, ElInput, ElButton } from 'element-plus' // 按需引入 element 组件
import { ArrowLeft, ArrowRight, CircleCloseFilled } from '@element-plus/icons' // 按需引入 element 图标
import "element-plus/dist/index.css";

const elementPlus = [
    ElTabs,
    ElTabPane,
    ElIcon,
    ElInput,
    ElButton
];

const elementIcons = [
    ArrowLeft,
    ArrowRight,
    CircleCloseFilled
];

const install: Component = (app: CompatVue) => {
    elementPlus.map((component) => {
        app.component(component.name, component); // 注册全局组件
    });

    elementIcons.map((component) => {
        app.component(component.name, component); // 注册全局图标
    });
};

export default {
    install,
};