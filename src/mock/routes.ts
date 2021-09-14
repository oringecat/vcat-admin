const routes = {
    url: "/admin/routes",
    type: "get",
    response: {
        code: 100,
        message: "success",
        total: 0,
        data: [
            {
                id: 1000,
                parentId: 0,
                path: "/",
                redirect: "/index",
                name: "Home",
                component: "layouts/page/index.vue",
                meta: {
                    icon: "el-icon-s-platform",
                    title: "工作台",
                },
                children: [
                    {
                        id: 1003,
                        parentId: 1000,
                        path: "index",
                        name: "HomeIndex",
                        component: "views/home/home-index.vue",
                        meta: {
                            title: "首页",
                        },
                    },
                ],
            },
            {
                id: 1001,
                parentId: 0,
                path: "/product",
                redirect: "ProductIndex",
                name: "Product",
                component: "layouts/page/index.vue",
                meta: {
                    icon: "el-icon-s-goods",
                    title: "商品管理",
                },
                children: [
                    {
                        id: 1004,
                        parentId: 1001,
                        path: "index",
                        name: "ProductIndex",
                        component: "views/product/product-index.vue",
                        meta: {
                            title: "商品列表",
                            auth: ["delete"]
                        },
                    },
                    {
                        id: 1005,
                        parentId: 1001,
                        path: "detail",
                        name: "ProductDetail",
                        component: "views/product/product-detail.vue",
                        meta: {
                            title: "商品详情",
                            auth: ["upload"]
                        },
                    }
                ],
            },
            {
                id: 1002,
                parentId: 0,
                path: "/admin",
                redirect: "AdminIndex",
                name: "Admin",
                component: "layouts/page/index.vue",
                meta: {
                    icon: "el-icon-user-solid",
                    title: "用户管理",
                },
                children: [
                    {
                        id: 1006,
                        parentId: 1002,
                        path: "index",
                        name: "AdminIndex",
                        component: "views/admin/admin-index.vue",
                        meta: {
                            title: "管理员列表",
                            auth: ["delete", "audit"]
                        },
                    },
                    {
                        id: 1007,
                        parentId: 1002,
                        path: "edit",
                        name: "AdminEdit",
                        component: "views/admin/admin-edit.vue",
                        meta: {
                            hidden: true,
                            title: "管理员编辑",
                            auth: ["add", "edit"]
                        },
                    },
                    {
                        id: 1008,
                        parentId: 1002,
                        path: "role",
                        name: "AdminRole",
                        component: "views/admin/admin-role.vue",
                        meta: {
                            title: "管理员角色",
                        },
                    },
                ],
            },
            {
                id: 1009,
                parentId: 0,
                path: "/system",
                redirect: "MenuIndex",
                name: "System",
                component: "layouts/page/index.vue",
                meta: {
                    icon: "el-icon-s-tools",
                    title: "系统管理",
                },
                children: [
                    {
                        id: 1010,
                        parentId: 1009,
                        path: "menu",
                        name: "MenuIndex",
                        component: "views/system/menu-index.vue",
                        meta: {
                            title: "菜单管理",
                        },
                    }
                ],
            },
        ]
    }
};

export default [
    routes,
]