import { CompatVue, Component } from "vue";
import "element-plus/dist/index.css";

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
    ElTable,
    ElTableColumn,
    ElLoadingDirective,
    ElPagination,
    ElButtonGroup,
    ElTree,
    ElForm,
    ElFormItem,
    ElSwitch,
    ElDialog,
    ElDatePicker,
} from "element-plus"

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
    ElTable,
    ElTableColumn,
    ElPagination,
    ElButtonGroup,
    ElTree,
    ElForm,
    ElFormItem,
    ElSwitch,
    ElDialog,
    ElDatePicker,
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
    app.directive("loading", ElLoadingDirective);

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