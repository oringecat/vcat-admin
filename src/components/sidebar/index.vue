<template>
    <div class="cat-sidebar">
        <div class="logo">
            <span>后台管理系统</span>
        </div>
        <div class="nav">
            <router-link :to="{ name: 'HomeIndex' }" style="color: #fff; display: block" replace>首页</router-link>
            <router-link :to="{ name: 'ProductIndex' }" style="color: #fff; display: block" replace>产品</router-link>
            <router-link :to="{ name: 'ProductDetail', query: { a: '333', b: 1 } }" style="color: #fff; display: block" replace>详情</router-link>
            <router-link :to="{ name: 'AdminIndex' }" style="color: #fff; display: block" replace>管理员</router-link>
            <router-link :to="{ name: 'AdminEdit' }" style="color: #fff; display: block" replace>编辑</router-link>
            <router-link :to="{ name: 'AdminRole' }" style="color: #fff; display: block" replace>角色</router-link>
        </div>
        <div class="copyright">
            <span>@2021 teamwei.com</span>
            <a href="https://github.com/oringecat/vcat-admin" target="_blank">GitHub</a>
        </div>
    </div>
</template>

<script lang="ts">
    /*!
     * ©teamwei.com
     * author: teamwei
     * date: 2021-08-29
     */

    import { defineComponent } from "vue";
    import { getAuthMenu } from "@/router/dynamic";

    export default defineComponent({
        name: "CatSidebar",
        setup() {
            const authMenu = getAuthMenu();
            console.log(authMenu)
        }
    });
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
