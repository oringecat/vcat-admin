import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { clearPending } from "@/api/service";
import { store } from "@/store";
import Page from "@/layouts/page/index.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/:catchAll(.*)",
        redirect: { name: "HomeIndex" },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/admin/admin-login.vue"),
        meta: {
            title: "登陆",
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/admin/admin-register.vue"),
        meta: {
            title: "注册",
        },
    },
    {
        path: "/",
        redirect: "/home",
        component: Page,
        children: [
            {
                path: "",
                name: "HomeIndex",
                component: () => import("@/views/home/home-index.vue"),
                meta: {
                    title: "首页",
                },
            },
        ],
    },
    {
        path: "/product",
        component: Page,
        children: [
            {
                path: "",
                name: "ProductIndex",
                component: () => import("@/views/product/product-index.vue"),
                meta: {
                    title: "商品管理",
                },
            },
            {
                path: "detail",
                name: "ProductDetail",
                component: () => import("@/views/product/product-detail.vue"),
                meta: {
                    title: "商品详情",
                },
            }
        ],
    },
    {
        path: "/admin",
        component: Page,
        children: [
            {
                path: "",
                name: "AdminIndex",
                component: () => import("@/views/admin/admin-index.vue"),
                meta: {
                    title: "管理员列表",
                },
            },
            {
                path: "edit",
                name: "AdminEdit",
                component: () => import("@/views/admin/admin-edit.vue"),
                meta: {
                    title: "管理员编辑",
                },
            },
            {
                path: "role",
                name: "AdminRole",
                component: () => import("@/views/admin/admin-role.vue"),
                meta: {
                    title: "管理员角色",
                },
            }
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

//路由跳转之前调用
router.beforeEach((to, from, next) => {
    clearPending();
    const loginInfo = store.state.user.loginInfo;

    if (to.name === "Login" || to.name === "Register") {
        if (loginInfo.token) {
            next("/");
        } else {
            next();
        }
    } else {
        if (loginInfo.token) {
            next();
        } else {
            next({
                name: "Login",
                query: { redirect: to.fullPath },
            });
        }
    }
});

export default router;
