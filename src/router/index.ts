import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { clearPending } from "@/api/service";
import { store } from "@/store";
import { registerRoutes } from "@/router/dynamic";

const routes: Array<RouteRecordRaw> = [
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
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 防止路由无限循环
let routerFlag = false;

// 路由跳转之前调用
router.beforeEach((to, from, next) => {
    clearPending();
    document.title = (to.meta.title as string ?? "后台管理") + " - vCat Admin";
    const token = store.state.user.loginInfo.token;

    if (token) {
        if (routerFlag) {
            if (to.name === "Login" || to.name === "Register") {
                next("/");
            } else {
                next();
            }
        } else {
            // 注册动态路由
            registerRoutes().then(() => {
                routerFlag = true;
                next({ ...to, replace: true });
            }).catch(() => {
                // 404?
            })
        }
    } else {
        routerFlag = false;
        if (to.name === "Login" || to.name === "Register") {
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
