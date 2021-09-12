import { CompatVue, Component } from "vue";

// 按需引入 element svg 图标 (暂时弃用)
//import { ArrowLeft, ArrowRight, CircleCloseFilled, Fold, Expand, Bell, } from '@element-plus/icons'

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
    ElDrawer,
    ElScrollbar,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElBadge,
    ElRow,
    ElCol,
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
    ElDrawer,
    ElScrollbar,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElBadge,
    ElRow,
    ElCol,
];

//const elementIcons = [
//    ArrowLeft,
//    ArrowRight,
//    CircleCloseFilled,
//    Fold,
//    Expand,
//    Bell,
//];

const install: Component = (app: CompatVue) => {
    elementPlus.map((component) => {
        app.component(component.name, component); // 注册全局组件
    });

    //elementIcons.map((component) => {
    //    app.component(component.name, component); // 注册全局图标
    //});
};

export default {
    install,
};