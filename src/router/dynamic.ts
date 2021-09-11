/*!
* ©teamwei.com
* author: teamwei
* date: 2021-09-03
*/

import { RouteRecordRaw } from "vue-router";
import router from '@/router'
import { sessionData } from "@/lib/storage";
import { IAdminRoute, AdminService } from "@/api/admin";
import { ElLoading } from "element-plus";

/**
 * 添加404页面
 */
const addNotFound = () => {
    router.addRoute({
        path: "/:catchAll(.*)",
        redirect: "/",
        name: "NotFound",
    })
}

/**
 * 动态添加路由
 */
const addRoutes = (routes: IAdminRoute[], parentName = ""): void => {
    routes.forEach((item) => {
        if (item.path && item.component) {
            const componentString = item.component.replace(/^\/+/, ""), // 过滤字符串前面所有 '/' 字符
                componentPath = componentString.replace(/\.\w+$/, ""); // 过滤后缀名，为了让 import 加入 .vue ，不然会有警告提示...

            const route: RouteRecordRaw = {
                path: item.path,
                name: item.name,
                component: () => import("@/" + componentPath + ".vue"),
                meta: item.meta
            }

            if (item.redirect) {
                if (routes.findExist("name", item.redirect)) {
                    route.redirect = { name: item.redirect };
                } else {
                    route.redirect = item.redirect;
                }
            }

            parentName ? router.addRoute(parentName, route) : router.addRoute(route);

            if (item.children && item.children.length) {
                addRoutes(item.children, item.name);
            }
        }
    })
};

/**
 * 注册路由
 * 用户切换账号需移除 sessionStorage 中的 routerMap 数据，一般在 store 中的 "user/logout"
 */
export const registerRoutes = (): Promise<boolean> => {
    const routerMap: IAdminRoute[] = sessionData.get("routerMap");

    return new Promise((resolve, reject) => {
        addNotFound();

        if (routerMap.length) {
            addRoutes(routerMap);
            resolve(true);
        } else {
            const loading = ElLoading.service();
            AdminService.getRoutes({
                success: (res) => {
                    if (res.data.length) {
                        sessionData.set("routerMap", res.data);
                        addRoutes(res.data);
                        resolve(true);
                    } else {
                        reject(false);
                    }
                },
                fail: () => {
                    reject(false);
                },
                complete: () => {
                    loading.close();
                }
            })
        }
    })
}

type AuthMenu = {
    path?: string;
    name?: string;
    label?: string;
    icon?: string;
    children?: AuthMenu[]
}

/**
 * 生成管理菜单
 */
export const getAuthMenu = (): AuthMenu[] => {
    const filterRouter = (routes: IAdminRoute[], parentPath = ""): AuthMenu[] => {
        let result: AuthMenu[] = [];
        routes.forEach(item => {
            if (!item.meta?.hidden) {
                let menuPath = item.path;
                if (parentPath) {
                    menuPath = [parentPath.length > 1 ? parentPath : "", "/", item.path].join("");
                }
                const menu: AuthMenu = {
                    path: menuPath,
                    name: item.name,
                    label: item.meta?.title ?? item.name,
                    icon: item.meta?.icon
                }
                if (item.children && item.children.length) {
                    const children = filterRouter(item.children, menuPath);
                    if (children.length) {
                        menu.children = children;
                    }
                }
                result = [...result, menu];
            }
        })
        return result;
    };
    return filterRouter(sessionData.get("routerMap"));
}

/**
 * 扁平列表树形化
 * 格式 [{ id: 100, parentId: 0, title: "一级菜单" }, { id: 101, parentId: 100, title: "二级菜单" }]
 */
// eslint-disable-next-line
const listToTree = (routes: IAdminRoute[]): IAdminRoute[] => {
    return routes.filter(parent => {
        const children = routes.filter((child) => parent.id == child.parentId); // 找出所有子级项
        if (children.length) {
            parent.children = children; // 递归向父级添加子级
        }
        return parent.parentId === 0; // 非父级的不返回
    });
}

/**
 * 树形列表扁平化
 * 格式 [{ id: 100, parentId: 0, title: "一级菜单", children: [ { id: 101, parentId: 100, title: "二级菜单" } ] }]
 */
// eslint-disable-next-line
const treeToList = (routes: IAdminRoute[]): IAdminRoute[] => {
    let result: IAdminRoute[] = [];
    routes.forEach(parent => {
        const item = { ...parent };
        if (parent.children) delete item.children;
        result.push(item);

        if (parent.children && parent.children.length) {
            // eslint-disable-next-line
            result = [...result, ...treeToList(parent.children)]; // 递归调用
        }
    })
    return result;
}