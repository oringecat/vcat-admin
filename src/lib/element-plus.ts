import { CompatVue, Component } from "vue";

// 按需引入 element 图标
import {
    ArrowLeft,
    ArrowRight,
    CircleCloseFilled,
    Fold,
    Expand,
} from '@element-plus/icons'

// 按需引入 element 组件
import {
    ElTabs,
    ElTabPane,
    ElIcon,
    ElInput,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElBreadcrumb,
    ElBreadcrumbItem,
} from 'element-plus'
import "element-plus/dist/index.css";

const elementPlus = [
    ElTabs,
    ElTabPane,
    ElIcon,
    ElInput,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElBreadcrumb,
    ElBreadcrumbItem,
];

const elementIcons = [
    ArrowLeft,
    ArrowRight,
    CircleCloseFilled,
    Fold,
    Expand,
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